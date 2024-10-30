/**
 * Database Utilities untuk Website Fisika
 * File ini berisi fungsi-fungsi untuk interaksi dengan Firebase/Firestore
 * Termasuk manajemen user profile, progress pembelajaran, dan activity logging
 */

const { admin, db } = require('../config/firebase-admin');

const dbUtils = {
  /**
   * Definisi Collections di Firestore
   * Centralized collection names untuk mencegah typo dan memudahkan maintenance
   */
  collections: {
    USERS: 'users',                // Profil dan data user
    LEARNING_MODULES: 'learningModules', // Data modul pembelajaran
    QUIZZES: 'quizzes',           // Data dan hasil quiz
    USER_PROGRESS: 'userProgress', // Progress pembelajaran user
    LOGIN_LOGS: 'loginLogs',      // Log aktivitas login/logout
    ACTIVITY_LOGS: 'activityLogs' // Log aktivitas umum
  },

  /**
   * Membuat profil user baru di Firestore
   * @param {Object} userData - Data user dari Firebase Auth
   * @returns {Object} Data profil yang tersimpan
   */
  createUserProfile: async (userData) => {
    try {
      const firestore = db();
      const userRef = firestore.collection(dbUtils.collections.USERS).doc(userData.uid);
      
      const profileData = {
        // Info Dasar User
        displayName: userData.displayName || '',
        email: userData.email,
        photoURL: userData.photoURL || '',
        
        // Info Progress Pembelajaran
        level: 1,
        totalXP: 0,
        currentXP: 0,
        xpToNextLevel: 100,
        currentStreak: 0,
        longestStreak: 0,
        
        // Progress Modul
        completedModules: [],
        activeModules: [],
        
        // Pengaturan User
        settings: {
          notifications: true,
          emailUpdates: true,
          darkMode: false,
          language: 'id'
        },
        
        // Status & Metadata
        isProfileComplete: false,
        lastActiveDate: admin.firestore.Timestamp.now(),
        lastLogin: null,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      };

      await userRef.set(profileData, { merge: true });
      await createUserProgressData(userData.uid);
      
      await dbUtils.logActivity(userData.uid, 'ACCOUNT_CREATED', {
        email: userData.email
      });
      
      console.log('Profil user berhasil dibuat:', userData.uid);
      return profileData;
    } catch (error) {
      console.error('Error membuat profil user:', error);
      throw error;
    }
  },

  /**
   * Update profil user
   * @param {string} userId - ID user
   * @param {Object} updateData - Data yang akan diupdate
   * @returns {boolean} Status keberhasilan update
   */
  updateUserProfile: async (userId, updateData) => {
    try {
      const firestore = db();
      const userRef = firestore.collection(dbUtils.collections.USERS).doc(userId);
      
      const dataToUpdate = {
        ...updateData,
        updatedAt: admin.firestore.Timestamp.now()
      };
      
      await userRef.update(dataToUpdate);
      
      if (updateData.displayName || updateData.photoURL) {
        await dbUtils.logActivity(userId, 'PROFILE_UPDATED', {
          updatedFields: Object.keys(updateData)
        });
      }
      
      console.log('Profil user berhasil diupdate:', userId);
      return true;
    } catch (error) {
      console.error('Error mengupdate profil user:', error);
      throw error;
    }
  },

  /**
   * Mengambil data profil user
   * @param {string} userId - UID user
   * @returns {Object} Data profil user
   */
  getUserProfile: async (userId) => {
    try {
      const firestore = db();
      const userRef = firestore.collection(dbUtils.collections.USERS).doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error(`User dengan ID ${userId} tidak ditemukan`);
      }

      return userDoc.data();
    } catch (error) {
      console.error('Error mengambil profil user:', error);
      throw error;
    }
  },

  /**
   * Update streak pembelajaran user
   * @param {string} userId - ID user
   * @returns {Object} Data streak terbaru
   */
  updateLearningStreak: async (userId) => {
    try {
      const firestore = db();
      const userRef = firestore.collection(dbUtils.collections.USERS).doc(userId);
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      const lastActiveDate = userData.lastActiveDate?.toDate() || new Date();
      const today = new Date();
      const diffDays = Math.floor((today - lastActiveDate) / (1000 * 60 * 60 * 24));

      let newStreak = userData.currentStreak || 0;
      let longestStreak = userData.longestStreak || 0;

      if (diffDays <= 1) {
        if (diffDays === 1) {
          newStreak += 1;
          longestStreak = Math.max(newStreak, longestStreak);
        }
      } else {
        newStreak = 1;
      }

      await userRef.update({
        currentStreak: newStreak,
        longestStreak: longestStreak,
        lastActiveDate: admin.firestore.Timestamp.now()
      });

      return { currentStreak: newStreak, longestStreak };
    } catch (error) {
      console.error('Error updating learning streak:', error);
      throw error;
    }
  },

  /**
   * Update progress pembelajaran user
   * @param {string} userId - ID user
   * @param {string} moduleId - ID modul pembelajaran
   * @param {Object} progress - Data progress pembelajaran
   */
  updateLearningProgress: async (userId, moduleId, progress) => {
    try {
      const firestore = db();
      const progressRef = firestore
        .collection(dbUtils.collections.USER_PROGRESS)
        .doc(`${userId}_${moduleId}`);

      const progressData = {
        userId,
        moduleId,
        lastAccessed: admin.firestore.Timestamp.now(),
        status: progress.status || "not_started",
        
        lessons: {
          [progress.lessonId]: {
            status: progress.lessonStatus || "not_started",
            xpEarned: progress.xpEarned || 0,
            completedAt: progress.completedAt || null,
            timeSpent: progress.timeSpent || 0
          }
        },
        
        quiz: {
          score: progress.quizScore || 0,
          completedAt: progress.quizCompletedAt || null,
          attempts: progress.attempts || 0,
          lastAttempt: progress.lastAttempt || null
        }
      };

      await progressRef.set(progressData, { merge: true });
      
      if (progress.xpEarned > 0) {
        await dbUtils.updateUserXP(userId, progress.xpEarned);
      }

      await dbUtils.logActivity(userId, 'LEARNING_PROGRESS', {
        moduleId,
        lessonId: progress.lessonId,
        status: progress.lessonStatus
      });

      return progressData;
    } catch (error) {
      console.error('Error updating learning progress:', error);
      throw error;
    }
  },

  /**
   * Log hasil quiz
   * @param {string} userId - ID user
   * @param {string} moduleId - ID modul
   * @param {Object} quizData - Data hasil quiz
   */
  logQuizResult: async (userId, moduleId, quizData) => {
    try {
      const firestore = db();
      const quizRef = firestore.collection(dbUtils.collections.QUIZZES).doc(userId);
      
      await quizRef.update({
        quizHistory: admin.firestore.FieldValue.arrayUnion({
          moduleId,
          score: quizData.score,
          timeSpent: quizData.timeSpent,
          completedAt: admin.firestore.Timestamp.now(),
          answers: quizData.answers
        }),
        [`moduleScores.${moduleId}`]: {
          bestScore: Math.max(quizData.score, quizData.bestScore || 0),
          attempts: admin.firestore.FieldValue.increment(1),
          lastAttempt: admin.firestore.Timestamp.now()
        },
        totalAttempts: admin.firestore.FieldValue.increment(1),
        updatedAt: admin.firestore.Timestamp.now()
      });

      await dbUtils.logActivity(userId, 'QUIZ_COMPLETED', {
        moduleId,
        score: quizData.score,
        timeSpent: quizData.timeSpent,
        questionsAnswered: quizData.answers.length
      });
    } catch (error) {
      console.error('Error logging quiz result:', error);
      throw error;
    }
  },

  /**
   * Update XP dan level user
   * @param {string} userId - ID user
   * @param {number} earnedXP - Jumlah XP yang didapat
   */
  updateUserXP: async (userId, earnedXP) => {
    try {
      const firestore = db();
      const userRef = firestore.collection(dbUtils.collections.USERS).doc(userId);
      
      const userDoc = await userRef.get();
      const userData = userDoc.data();
      
      let newXP = userData.currentXP + earnedXP;
      let newLevel = userData.level;
      let xpToNext = userData.xpToNextLevel;
      
      while (newXP >= xpToNext) {
        newXP -= xpToNext;
        newLevel++;
        xpToNext = calculateNextLevelXP(newLevel);
        
        await dbUtils.logActivity(userId, 'LEVEL_UP', {
          oldLevel: newLevel - 1,
          newLevel: newLevel,
          totalXP: userData.totalXP + earnedXP
        });
      }
      
      await userRef.update({
        totalXP: admin.firestore.FieldValue.increment(earnedXP),
        currentXP: newXP,
        level: newLevel,
        xpToNextLevel: xpToNext,
        updatedAt: admin.firestore.Timestamp.now()
      });
      
      return { level: newLevel, currentXP: newXP, xpToNextLevel: xpToNext };
    } catch (error) {
      console.error('Error updating user XP:', error);
      throw error;
    }
  },

  /**
   * Update progress pembelajaran dengan struktur baru
   * @param {string} userId 
   * @param {string} moduleId 
   * @param {Object} progressData 
   */
  updateModuleProgress: async (userId, moduleId, progressData) => {
    try {
      const firestore = db();
      const progressRef = firestore
        .collection(dbUtils.collections.USER_PROGRESS)
        .doc(`${userId}_${moduleId}`);

      const timestamp = admin.firestore.Timestamp.now();
      
      const updateData = {
        lastAccessed: timestamp,
        [`lessons.${progressData.lessonId}.status`]: progressData.status,
        [`lessons.${progressData.lessonId}.lastAccessed`]: timestamp
      };

      if (progressData.activityType) {
        const earnedXP = calculateXP(progressData.activityType, progressData);
        updateData[`lessons.${progressData.lessonId}.activities.${progressData.activityType}`] = {
          completed: progressData.completed || false,
          timeSpent: admin.firestore.FieldValue.increment(progressData.timeSpent || 0),
          lastAccessed: timestamp,
          xpEarned: earnedXP
        };

        if (earnedXP > 0) {
          await dbUtils.updateUserXP(userId, earnedXP);
        }
      }

      await progressRef.update(updateData);

      await logUserActivity(userId, 'LEARNING_ACTIVITY', {
        moduleId,
        lessonId: progressData.lessonId,
        activityType: progressData.activityType,
        timeSpent: progressData.timeSpent,
        completed: progressData.completed
      });

    } catch (error) {
      console.error('Error updating module progress:', error);
      throw error;
    }
  },

  /**
   * Mengambil progress pembelajaran user untuk semua modul
   * @param {string} userId 
   * @returns {Object} Progress pembelajaran user
   */
  getLearningProgress: async (userId) => {
    try {
      const firestore = db();
      const progressSnapshot = await firestore
        .collection(dbUtils.collections.USER_PROGRESS)
        .where('userId', '==', userId)
        .get();

      const progress = {};
      progressSnapshot.forEach(doc => {
        const [, moduleId] = doc.id.split('_');
        progress[moduleId] = doc.data();
      });

      return progress;
    } catch (error) {
      console.error('Error getting learning progress:', error);
      throw error;
    }
  },

  /**
   * Update status quiz
   * @param {string} userId 
   * @param {string} moduleId 
   * @param {Object} quizData 
   */
  updateQuizStatus: async (userId, moduleId, quizData) => {
    try {
      const firestore = db();
      const progressRef = firestore
        .collection(dbUtils.collections.USER_PROGRESS)
        .doc(`${userId}_${moduleId}`);

      const quizUpdate = {
        'quiz.lastAttempt': admin.firestore.Timestamp.now(),
        'quiz.attempts': admin.firestore.FieldValue.increment(1)
      };

      if (quizData.score) {
        const doc = await progressRef.get();
        const currentBest = doc.data()?.quiz?.bestScore || 0;
        if (quizData.score > currentBest) {
          quizUpdate['quiz.bestScore'] = quizData.score;
          
          const xpEarned = calculateXP('quiz', { score: quizData.score });
          await dbUtils.updateUserXP(userId, xpEarned);
        }
      }

      await progressRef.update(quizUpdate);

      await logUserActivity(userId, 'QUIZ_ACTIVITY', {
        moduleId,
        score: quizData.score,
        timeSpent: quizData.timeSpent,
        answers: quizData.answers
      });

    } catch (error) {
      console.error('Error updating quiz status:', error);
      throw error;
    }
  }
};

/**
 * Helper Functions
 */

/**
 * Inisialisasi data progress pembelajaran untuk user baru
 * @param {string} userId - ID user
 */
const createUserProgressData = async (userId) => {
  try {
    const firestore = db();
    const modules = ['pengukuran-dasar', 'konversi-satuan', 'analisis-error'];
    
    // Inisialisasi progress untuk setiap modul
    for (const moduleId of modules) {
      await firestore.collection(dbUtils.collections.USER_PROGRESS)
        .doc(`${userId}_${moduleId}`)
        .set({
          userId,
          moduleId,
          status: "not_started",
          lastAccessed: admin.firestore.Timestamp.now(),
          lessons: {
            // Modul Pengukuran Dasar
            ...(moduleId === 'pengukuran-dasar' && {
              "pengantar-pengukuran": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              },
              "alat-ukur-panjang": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              },
              "pengukuran-massa": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              }
            }),
            // Modul Konversi Satuan
            ...(moduleId === 'konversi-satuan' && {
              "dasar-konversi-satuan": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              },
              "konversi-satuan-panjang": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              },
              "konversi-satuan-massa": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              }
            }),
            // Modul Analisis Error
            ...(moduleId === 'analisis-error' && {
              "pengantar-analisis-error": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              },
              "perhitungan-error-relatif": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              },
              "propagasi-error": {
                status: "not_started",
                xpEarned: 0,
                completedAt: null,
                timeSpent: 0,
                lastAccessed: admin.firestore.Timestamp.now(),
                activities: {
                  reading: {
                    completed: false,
                    timeSpent: 0
                  },
                  simulation: {
                    completed: false,
                    timeSpent: 0,
                    attempts: 0
                  },
                  exercises: {
                    completed: false,
                    score: 0,
                    attempts: 0
                  }
                }
              }
            })
          },
          quiz: {
            score: 0,
            bestScore: 0,
            completedAt: null,
            attempts: 0,
            lastAttempt: null,
            questions: [],
            answers: []
          },
          metadata: {
            timeSpent: 0,
            lastVisit: admin.firestore.Timestamp.now(),
            completionPercentage: 0,
            totalActivities: {
              reading: 0,
              simulation: 0,
              exercises: 0
            }
          }
        });
    }

    // Inisialisasi overview quiz
    await firestore.collection(dbUtils.collections.QUIZZES)
      .doc(userId)
      .set({
        completedQuizzes: [],
        totalScore: 0,
        averageScore: 0,
        totalAttempts: 0,
        quizHistory: [],
        updatedAt: admin.firestore.Timestamp.now(),
        moduleScores: {
          'pengukuran-dasar': {
            bestScore: 0,
            attempts: 0,
            lastAttempt: null
          },
          'konversi-satuan': {
            bestScore: 0,
            attempts: 0,
            lastAttempt: null
          },
          'analisis-error': {
            bestScore: 0,
            attempts: 0,
            lastAttempt: null
          }
        }
      });

  } catch (error) {
    console.error('Error creating user progress data:', error);
    throw error;
  }
};

/**
 * Helper function untuk mengelompokkan semua aktivitas logging
 * @param {string} userId - ID user
 * @param {string} activityType - Tipe aktivitas
 * @param {Object} activityData - Data aktivitas
 */
const logUserActivity = async (userId, activityType, activityData = {}) => {
  try {
    const firestore = db();
    const timestamp = admin.firestore.Timestamp.now();

    const baseActivity = {
      userId,
      type: activityType,
      timestamp,
      metadata: {
        userAgent: activityData.userAgent,
        ip: activityData.ip,
        location: activityData.location
      }
    };

    let specificData = {};
    switch (activityType) {
      case 'LEARNING_ACTIVITY':
        specificData = {
          moduleId: activityData.moduleId,
          lessonId: activityData.lessonId,
          status: activityData.status,
          timeSpent: activityData.timeSpent || 0,
          progress: activityData.progress || 0,
          completed: activityData.completed || false
        };
        break;
      case 'QUIZ_ACTIVITY':
        specificData = {
          moduleId: activityData.moduleId,
          score: activityData.score,
          timeSpent: activityData.timeSpent,
          questionsAnswered: activityData.answers?.length || 0
        };
        break;
      case 'LOGIN':
      case 'LOGOUT':
        specificData = {
          success: activityData.success,
          device: activityData.device,
          sessionDuration: activityData.sessionDuration
        };
        break;
      case 'ERROR':
        specificData = {
          code: activityData.code,
          message: activityData.message,
          context: activityData.context
        };
        break;
      default:
        specificData = activityData;
    }

    const activityLog = {
      ...baseActivity,
      data: specificData
    };

    let collectionName = dbUtils.collections.ACTIVITY_LOGS;
    if (['LOGIN', 'LOGOUT'].includes(activityType)) {
      collectionName = dbUtils.collections.LOGIN_LOGS;
    }

    await firestore.collection(collectionName).add(activityLog);

  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error for logging failures
  }
};

/**
 * Helper function untuk mendapatkan XP berdasarkan aktivitas
 * @param {string} activityType - Tipe aktivitas
 * @param {Object} activityData - Data aktivitas
 * @returns {number} XP yang didapat
 */
const calculateXP = (activityType, activityData = {}) => {
  const xpRates = {
    'reading': 10,
    'simulation': 15,
    'exercise': 20,
    'quiz': {
      perfect: 50,
      passing: 30,
      completed: 10
    }
  };

  switch (activityType) {
    case 'quiz':
      if (activityData.score >= 90) return xpRates.quiz.perfect;
      if (activityData.score >= 70) return xpRates.quiz.passing;
      return xpRates.quiz.completed;
    
    case 'reading':
    case 'simulation':
    case 'exercise':
      return xpRates[activityType];
    
    default:
      return 0;
  }
};

/**
 * Menghitung XP yang dibutuhkan untuk level berikutnya
 * @param {number} level - Level saat ini
 * @returns {number} XP yang dibutuhkan untuk level berikutnya
 */
const calculateNextLevelXP = (level) => {
  return 100 + ((level - 1) * 50);
};

module.exports = {
  ...dbUtils,
  logUserActivity,
  calculateXP
};
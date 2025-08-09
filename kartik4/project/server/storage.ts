import { Course, Lesson, User, UserCourseProgress, UserLessonProgress, InsertCourse, InsertLesson, InsertUser, InsertUserCourseProgress, InsertUserLessonProgress } from '@shared/schema';

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  
  // Course operations
  createCourse(course: InsertCourse): Promise<Course>;
  getCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | null>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  
  // Lesson operations
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  getLessonsByCourseId(courseId: number): Promise<Lesson[]>;
  getLessonById(id: number): Promise<Lesson | null>;
  
  // User Course Progress operations
  createUserCourseProgress(progress: InsertUserCourseProgress): Promise<UserCourseProgress>;
  getUserCourseProgress(userId: number, courseId: number): Promise<UserCourseProgress | null>;
  updateUserCourseProgress(userId: number, courseId: number, progress: number): Promise<UserCourseProgress>;
  getUserEnrolledCourses(userId: number): Promise<Course[]>;
  
  // User Lesson Progress operations
  createUserLessonProgress(progress: InsertUserLessonProgress): Promise<UserLessonProgress>;
  getUserLessonProgress(userId: number, lessonId: number): Promise<UserLessonProgress | null>;
  updateUserLessonProgress(userId: number, lessonId: number, completed: boolean): Promise<UserLessonProgress>;
}

// In-memory storage implementation
class MemStorage implements IStorage {
  private users: User[] = [];
  private courses: Course[] = [];
  private lessons: Lesson[] = [];
  private userCourseProgress: UserCourseProgress[] = [];
  private userLessonProgress: UserLessonProgress[] = [];
  
  private nextUserId = 1;
  private nextCourseId = 1;
  private nextLessonId = 1;
  private nextUserCourseProgressId = 1;
  private nextUserLessonProgressId = 1;

  constructor() {
    // Initialize with sample data
    this.seedData();
  }

  private seedData() {
    // Sample courses
    const sampleCourses: Course[] = [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        description: "Learn the basics of JavaScript programming including variables, functions, and control structures.",
        instructor: "John Smith",
        category: "Programming",
        level: "beginner",
        duration: "8 hours",
        price: 99,
        imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
        createdAt: new Date()
      },
      {
        id: 2,
        title: "React Development",
        description: "Build modern web applications with React including hooks, state management, and component architecture.",
        instructor: "Sarah Johnson",
        category: "Frontend",
        level: "intermediate",
        duration: "12 hours",
        price: 149,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Node.js Backend Development",
        description: "Create robust backend APIs with Node.js, Express, and database integration.",
        instructor: "Mike Wilson",
        category: "Backend",
        level: "intermediate",
        duration: "10 hours",
        price: 129,
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
        createdAt: new Date()
      },
      {
        id: 4,
        title: "Python for Data Science",
        description: "Learn Python programming for data analysis, visualization, and machine learning.",
        instructor: "Dr. Emily Chen",
        category: "Data Science",
        level: "beginner",
        duration: "15 hours",
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
        createdAt: new Date()
      },
      {
        id: 5,
        title: "Advanced CSS & Design",
        description: "Master modern CSS techniques including Grid, Flexbox, animations, and responsive design.",
        instructor: "Alex Rodriguez",
        category: "Design",
        level: "advanced",
        duration: "6 hours",
        price: 89,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        createdAt: new Date()
      }
    ];

    // Sample lessons for JavaScript Fundamentals course
    const sampleLessons: Lesson[] = [
      {
        id: 1,
        courseId: 1,
        title: "Introduction to JavaScript",
        description: "Overview of JavaScript and its role in web development",
        videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
        duration: "30 minutes",
        order: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        courseId: 1,
        title: "Variables and Data Types",
        description: "Learn about JavaScript variables, strings, numbers, and booleans",
        videoUrl: "https://www.youtube.com/embed/9emXNzqCKyg",
        duration: "45 minutes",
        order: 2,
        createdAt: new Date()
      },
      {
        id: 3,
        courseId: 1,
        title: "Functions and Scope",
        description: "Understanding JavaScript functions and variable scope",
        videoUrl: "https://www.youtube.com/embed/N8ap4k_1QEQ",
        duration: "60 minutes",
        order: 3,
        createdAt: new Date()
      },
      // React Development lessons
      {
        id: 4,
        courseId: 2,
        title: "Getting Started with React",
        description: "Introduction to React and JSX",
        videoUrl: "https://www.youtube.com/embed/Tn6-PIqc4UM",
        duration: "40 minutes",
        order: 1,
        createdAt: new Date()
      },
      {
        id: 5,
        courseId: 2,
        title: "React Components",
        description: "Creating and using React components",
        videoUrl: "https://www.youtube.com/embed/Y2hgEGPzTZY",
        duration: "55 minutes",
        order: 2,
        createdAt: new Date()
      }
    ];

    this.courses = sampleCourses;
    this.lessons = sampleLessons;
    this.nextCourseId = 6;
    this.nextLessonId = 6;
  }

  // User operations
  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.nextUserId++,
      ...user,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  // Course operations
  async createCourse(course: InsertCourse): Promise<Course> {
    const newCourse: Course = {
      id: this.nextCourseId++,
      ...course,
      createdAt: new Date()
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  async getCourses(): Promise<Course[]> {
    return this.courses;
  }

  async getCourseById(id: number): Promise<Course | null> {
    return this.courses.find(course => course.id === id) || null;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return this.courses.filter(course => course.category === category);
  }

  // Lesson operations
  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const newLesson: Lesson = {
      id: this.nextLessonId++,
      ...lesson,
      createdAt: new Date()
    };
    this.lessons.push(newLesson);
    return newLesson;
  }

  async getLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return this.lessons.filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  async getLessonById(id: number): Promise<Lesson | null> {
    return this.lessons.find(lesson => lesson.id === id) || null;
  }

  // User Course Progress operations
  async createUserCourseProgress(progress: InsertUserCourseProgress): Promise<UserCourseProgress> {
    const newProgress: UserCourseProgress = {
      id: this.nextUserCourseProgressId++,
      ...progress,
      createdAt: new Date()
    };
    this.userCourseProgress.push(newProgress);
    return newProgress;
  }

  async getUserCourseProgress(userId: number, courseId: number): Promise<UserCourseProgress | null> {
    return this.userCourseProgress.find(
      progress => progress.userId === userId && progress.courseId === courseId
    ) || null;
  }

  async updateUserCourseProgress(userId: number, courseId: number, progressValue: number): Promise<UserCourseProgress> {
    const existingProgress = await this.getUserCourseProgress(userId, courseId);
    if (existingProgress) {
      existingProgress.progress = progressValue;
      existingProgress.completed = progressValue >= 100;
      return existingProgress;
    }
    
    return this.createUserCourseProgress({
      userId,
      courseId,
      progress: progressValue,
      enrolled: true,
      completed: progressValue >= 100
    });
  }

  async getUserEnrolledCourses(userId: number): Promise<Course[]> {
    const enrolledProgress = this.userCourseProgress.filter(
      progress => progress.userId === userId && progress.enrolled
    );
    
    const courseIds = enrolledProgress.map(progress => progress.courseId);
    return this.courses.filter(course => courseIds.includes(course.id));
  }

  // User Lesson Progress operations
  async createUserLessonProgress(progress: InsertUserLessonProgress): Promise<UserLessonProgress> {
    const newProgress: UserLessonProgress = {
      id: this.nextUserLessonProgressId++,
      ...progress,
      watchedAt: progress.completed ? new Date() : null
    };
    this.userLessonProgress.push(newProgress);
    return newProgress;
  }

  async getUserLessonProgress(userId: number, lessonId: number): Promise<UserLessonProgress | null> {
    return this.userLessonProgress.find(
      progress => progress.userId === userId && progress.lessonId === lessonId
    ) || null;
  }

  async updateUserLessonProgress(userId: number, lessonId: number, completed: boolean): Promise<UserLessonProgress> {
    const existingProgress = await this.getUserLessonProgress(userId, lessonId);
    if (existingProgress) {
      existingProgress.completed = completed;
      existingProgress.watchedAt = completed ? new Date() : null;
      return existingProgress;
    }
    
    return this.createUserLessonProgress({
      userId,
      lessonId,
      completed,
      watchedAt: completed ? new Date() : null
    });
  }
}

export const storage = new MemStorage();
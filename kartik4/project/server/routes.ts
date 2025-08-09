import { Router } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { insertCourseSchema, insertLessonSchema, insertUserSchema, insertUserCourseProgressSchema, insertUserLessonProgressSchema } from '@shared/schema';

const router = Router();

// Error handling middleware
const handleError = (error: any, res: any) => {
  console.error('API Error:', error);
  res.status(500).json({ error: 'Internal server error' });
};

// User routes
router.post('/api/users', async (req, res) => {
  try {
    const userData = insertUserSchema.parse(req.body);
    const user = await storage.createUser(userData);
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      handleError(error, res);
    }
  }
});

router.get('/api/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await storage.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    handleError(error, res);
  }
});

// Course routes
router.get('/api/courses', async (req, res) => {
  try {
    const category = req.query.category as string;
    const courses = category 
      ? await storage.getCoursesByCategory(category)
      : await storage.getCourses();
    res.json(courses);
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/api/courses/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const course = await storage.getCourseById(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    handleError(error, res);
  }
});

router.post('/api/courses', async (req, res) => {
  try {
    const courseData = insertCourseSchema.parse(req.body);
    const course = await storage.createCourse(courseData);
    res.json(course);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      handleError(error, res);
    }
  }
});

// Lesson routes
router.get('/api/courses/:courseId/lessons', async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const lessons = await storage.getLessonsByCourseId(courseId);
    res.json(lessons);
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/api/lessons/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const lesson = await storage.getLessonById(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    handleError(error, res);
  }
});

router.post('/api/lessons', async (req, res) => {
  try {
    const lessonData = insertLessonSchema.parse(req.body);
    const lesson = await storage.createLesson(lessonData);
    res.json(lesson);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      handleError(error, res);
    }
  }
});

// User Course Progress routes
router.post('/api/users/:userId/courses/:courseId/enroll', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);
    
    // Check if already enrolled
    const existingProgress = await storage.getUserCourseProgress(userId, courseId);
    if (existingProgress) {
      return res.json(existingProgress);
    }
    
    const progress = await storage.createUserCourseProgress({
      userId,
      courseId,
      progress: 0,
      enrolled: true,
      completed: false
    });
    
    res.json(progress);
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/api/users/:userId/courses', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const courses = await storage.getUserEnrolledCourses(userId);
    res.json(courses);
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/api/users/:userId/courses/:courseId/progress', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);
    const progress = await storage.getUserCourseProgress(userId, courseId);
    res.json(progress);
  } catch (error) {
    handleError(error, res);
  }
});

router.put('/api/users/:userId/courses/:courseId/progress', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const courseId = parseInt(req.params.courseId);
    const { progress } = req.body;
    
    const updatedProgress = await storage.updateUserCourseProgress(userId, courseId, progress);
    res.json(updatedProgress);
  } catch (error) {
    handleError(error, res);
  }
});

// User Lesson Progress routes
router.post('/api/users/:userId/lessons/:lessonId/complete', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const lessonId = parseInt(req.params.lessonId);
    
    const progress = await storage.updateUserLessonProgress(userId, lessonId, true);
    res.json(progress);
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/api/users/:userId/lessons/:lessonId/progress', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const lessonId = parseInt(req.params.lessonId);
    const progress = await storage.getUserLessonProgress(userId, lessonId);
    res.json(progress);
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
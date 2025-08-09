import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Generic API fetch function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Specific API functions
export const api = {
  // Courses
  getCourses: (category?: string) => 
    apiRequest<any[]>(`/api/courses${category ? `?category=${category}` : ''}`),
  
  getCourse: (id: number) => 
    apiRequest<any>(`/api/courses/${id}`),
  
  // Lessons
  getLessons: (courseId: number) => 
    apiRequest<any[]>(`/api/courses/${courseId}/lessons`),
  
  getLesson: (id: number) => 
    apiRequest<any>(`/api/lessons/${id}`),
  
  // User progress
  enrollCourse: (userId: number, courseId: number) => 
    apiRequest<any>(`/api/users/${userId}/courses/${courseId}/enroll`, {
      method: 'POST',
    }),
  
  getUserCourses: (userId: number) => 
    apiRequest<any[]>(`/api/users/${userId}/courses`),
  
  updateProgress: (userId: number, courseId: number, progress: number) => 
    apiRequest<any>(`/api/users/${userId}/courses/${courseId}/progress`, {
      method: 'PUT',
      body: JSON.stringify({ progress }),
    }),
  
  completeLesson: (userId: number, lessonId: number) => 
    apiRequest<any>(`/api/users/${userId}/lessons/${lessonId}/complete`, {
      method: 'POST',
    }),
};
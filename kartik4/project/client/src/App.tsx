import { Route, Router } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import Navigation from '@/components/ui/navigation';
import HomePage from '@/pages/HomePage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import MyCoursesPage from '@/pages/MyCoursesPage';
import './index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main>
          <Router>
            <Route path="/" component={HomePage} />
            <Route path="/courses" component={CoursesPage} />
            <Route path="/courses/:id" component={CourseDetailPage} />
            <Route path="/my-courses" component={MyCoursesPage} />
            <Route path="/search" component={CoursesPage} />
            <Route path="/achievements" component={MyCoursesPage} />
          </Router>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
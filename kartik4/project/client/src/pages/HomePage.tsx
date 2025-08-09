import { Link } from 'wouter';
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/queryClient';
import CourseCard from '@/components/CourseCard';

export default function HomePage() {
  const { data: courses = [] } = useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: () => api.getCourses(),
  });

  const featuredCourses = courses.slice(0, 3);

  const stats = [
    { label: 'Active Students', value: '10,000+', icon: Users },
    { label: 'Expert Instructors', value: '500+', icon: Award },
    { label: 'Course Completion Rate', value: '95%', icon: TrendingUp },
    { label: 'Available Courses', value: '1,000+', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Learn Without
              <span className="text-blue-600 dark:text-blue-400"> Limits</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover thousands of courses from expert instructors and advance your skills
              with our comprehensive online learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span>Explore Courses</span>
              </Link>
              <button className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start your learning journey with our most popular courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/courses"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>View All Courses</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose LearnHub?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Expert-Led Content
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn from industry experts with real-world experience and proven track records.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Progress Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your learning progress and achievements with detailed analytics and insights.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Certificates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Earn verified certificates upon course completion to showcase your skills.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
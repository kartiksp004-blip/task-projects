# Online Learning Platform 🎓

A comprehensive online learning platform built with React, TypeScript, and Node.js featuring course catalogs, video lessons, and progress tracking.

## Features

- 📚 **Course Catalog**: Browse and search through various courses
- 🎥 **Video Lessons**: Watch embedded video content with progress tracking
- 📊 **Progress Tracking**: Monitor your learning journey and achievements
- 👤 **User Management**: User profiles and course enrollment
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🎨 **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS for styling
- Wouter for routing
- React Query for data management
- Lucide React for icons

**Backend:**
- Node.js with Express
- TypeScript
- In-memory storage (easily replaceable with PostgreSQL)
- RESTful API design

**Development:**
- Vite for fast development and building
- ESLint for code quality
- Hot reload for rapid development

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/online-learning-platform.git
cd online-learning-platform
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development environment:**
```bash
./start-dev.sh
```

Or manually:
```bash
# Terminal 1 - Start backend server
npm run server

# Terminal 2 - Start frontend development server
npm run client
```

4. **Open your browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Project Structure

```
online-learning-platform/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions and configurations
│   │   └── assets/        # Static assets
│   └── index.html         # Main HTML template
├── server/                # Backend API server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data storage layer
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas and TypeScript types
├── package.json          # Project dependencies and scripts
└── README.md            # This file
```

## Available Scripts

- `npm run dev` - Start the development environment
- `npm run build` - Build for production
- `npm run server` - Start backend server only
- `npm run client` - Start frontend development server only
- `npm run lint` - Run ESLint

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create new course

### Lessons
- `GET /api/courses/:courseId/lessons` - Get lessons for a course
- `GET /api/lessons/:id` - Get specific lesson

### User Progress
- `POST /api/users/:userId/courses/:courseId/enroll` - Enroll in course
- `GET /api/users/:userId/courses` - Get user's enrolled courses
- `POST /api/users/:userId/lessons/:lessonId/complete` - Mark lesson as complete

## Development

### Adding New Features

1. **Frontend Components**: Add new components in `client/src/components/`
2. **Pages**: Create new pages in `client/src/pages/`
3. **API Routes**: Add new endpoints in `server/routes.ts`
4. **Database Schema**: Update schemas in `shared/schema.ts`

### Code Style

This project uses ESLint and Prettier for code formatting. Run `npm run lint` to check for issues.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
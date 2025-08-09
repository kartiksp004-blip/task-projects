import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Smartphone, Globe, User, Briefcase, MessageCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      description: "Responsive task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts, charts, and personalized weather alerts using third-party APIs.",
      technologies: ["JavaScript", "Chart.js", "OpenWeather API"],
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Python", level: 70 },
    { name: "CSS/Tailwind", level: 88 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-400 mr-2" />
              <span className="font-bold text-xl">DevPortfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 capitalize ${
                      activeSection === item
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-b border-gray-800">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 capitalize w-full text-left ${
                    activeSection === item
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              John Developer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Full-Stack Developer crafting beautiful, functional web experiences with modern technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">About Me</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-1 rounded-full w-64 h-64 mx-auto mb-8">
                <div className="bg-gray-800 rounded-full w-full h-full flex items-center justify-center">
                  <User className="h-32 w-32 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. 
                I love turning complex problems into simple, beautiful designs that provide exceptional user experiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge through technical writing and mentoring.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-blue-400 font-semibold">5+</span>
                  <span className="text-gray-300 ml-2">Years Experience</span>
                </div>
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-teal-400 font-semibold">50+</span>
                  <span className="text-gray-300 ml-2">Projects Completed</span>
                </div>
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <span className="text-blue-400 font-semibold">20+</span>
                  <span className="text-gray-300 ml-2">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills in full-stack development, 
              UI/UX design, and problem-solving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.liveUrl}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                    <a 
                      href={project.githubUrl}
                      className="flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Skills & Technologies</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I work with a variety of technologies and tools to build modern, scalable applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-semibold">{skill.name}</span>
                      <span className="text-blue-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-teal-400 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">What I Do</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Web Development</h4>
                    <p className="text-gray-300">Building responsive, fast, and user-friendly web applications using modern frameworks and technologies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-600 p-3 rounded-lg">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Mobile Development</h4>
                    <p className="text-gray-300">Creating cross-platform mobile applications with React Native and Flutter for iOS and Android.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-white">Backend Development</h4>
                    <p className="text-gray-300">Developing robust APIs and server-side applications with Node.js, Python, and various databases.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. Let's connect and build something amazing together!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white font-semibold">john.developer@email.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400">GitHub</p>
                      <p className="text-white font-semibold">github.com/johndeveloper</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-700 p-3 rounded-lg">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400">LinkedIn</p>
                      <p className="text-white font-semibold">linkedin.com/in/johndeveloper</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Code className="h-6 w-6 text-blue-400 mr-2" />
              <span className="font-semibold text-white">DevPortfolio</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 John Developer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
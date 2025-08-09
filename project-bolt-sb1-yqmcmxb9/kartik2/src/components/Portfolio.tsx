import React, { useState, useEffect } from 'react';
import { ArrowLeft, Github, ExternalLink, Mail, Phone, MapPin, Download, Star, Calendar, Users, Code2 } from 'lucide-react';

interface PortfolioProps {
  onBack: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
      stats: { stars: 42, forks: 15 }
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced filtering.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
      stats: { stars: 28, forks: 8 }
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A comprehensive weather application with location-based forecasts, interactive maps, and weather alerts.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Vue.js", "OpenWeather API", "Chart.js", "PWA"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
      stats: { stars: 35, forks: 12 }
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Analytics dashboard for social media management with data visualization, engagement tracking, and automated reporting.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
      stats: { stars: 56, forks: 22 }
    }
  ];

  const skills = [
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "React", level: 92, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 82, category: "Backend" },
    { name: "MongoDB", level: 78, category: "Database" },
    { name: "PostgreSQL", level: 80, category: "Database" },
    { name: "AWS", level: 75, category: "Cloud" }
  ];

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Lead development of responsive web applications using React and TypeScript. Collaborate with design teams to implement pixel-perfect UIs."
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications from conception to deployment. Worked with React, Node.js, and cloud services."
    },
    {
      title: "Junior Developer",
      company: "WebSolutions Ltd.",
      period: "2019 - 2020",
      description: "Developed and maintained client websites using modern web technologies. Gained experience in full-stack development."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-white/20 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-6xl lg:text-7xl font-bold text-gray-800">
                    Hi, I'm{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Alex Johnson
                    </span>
                  </h1>
                  <p className="text-2xl text-gray-600">Full Stack Developer</p>
                  <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    I create beautiful, responsive web applications using modern technologies. 
                    Passionate about clean code, user experience, and innovative solutions.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View My Work
                  </button>
                  <button className="flex items-center gap-2 bg-white/80 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-white transition-all duration-300 shadow-lg">
                    <Download className="w-5 h-5" />
                    Download CV
                  </button>
                </div>

                <div className="flex gap-6">
                  <a href="#" className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto relative overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl rotate-12 opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-2xl rotate-45 opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">About Me</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  I'm a passionate full-stack developer with over 4 years of experience creating 
                  web applications that solve real-world problems. I love working with modern 
                  technologies and am always eager to learn and adapt to new challenges.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  My expertise spans from frontend frameworks like React and Vue.js to backend 
                  technologies including Node.js and Python. I believe in writing clean, 
                  maintainable code and creating exceptional user experiences.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Code2 className="w-6 h-6 text-blue-500" />
                      <h4 className="font-semibold text-gray-800">Projects</h4>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">50+</p>
                  </div>
                  
                  <div className="bg-white/80 p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-6 h-6 text-green-500" />
                      <h4 className="font-semibold text-gray-800">Experience</h4>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">4+ Years</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Experience</h3>
                {experiences.map((exp, index) => (
                  <div key={index} className="bg-white/80 p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-gray-800">{exp.title}</h4>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">Featured Projects</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <a 
                        href={project.githubUrl} 
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        Code
                      </a>
                      <a 
                        href={project.liveUrl} 
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.stats.forks}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">Skills & Technologies</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white/80 p-6 rounded-2xl shadow-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-800">{skill.name}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {skill.category}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">Get In Touch</h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Let's Work Together</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    I'm always open to discussing new opportunities, interesting projects, 
                    or just having a chat about technology and development.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-gray-600">alex.johnson@email.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Location</p>
                      <p className="text-gray-600">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="bg-white/80 p-8 rounded-3xl shadow-lg">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
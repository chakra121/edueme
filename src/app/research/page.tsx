"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Users, 
  Lightbulb,
  Calendar,
  ExternalLink,
  Filter,
  Search,
  ChevronRight,
  Award,
  TrendingUp,
  Zap,
  Target,
  Globe,
  FileText
} from 'lucide-react';

interface Research {
  title: string;
  description: string;
  type: "ongoing" | "completed" | "publication" | "project";
  icon: React.ReactNode;
  link: string;
  category: "robotics" | "ai" | "stem" | "education";
  date: string;
  image: string;
  tags: string[];
  status: string;
  impact: string;
}

const researches: Research[] = [
  {
    title: "Educational Robotics Impact Study",
    description: "Investigating the impact of robotics education on student learning outcomes and STEM engagement through comprehensive longitudinal studies.",
    type: "ongoing",
    icon: <BookOpen className="w-8 h-8" />,
    link: "/research/robotics-impact",
    category: "robotics",
    date: "2024-Present",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&crop=center",
    tags: ["Student Outcomes", "STEM Engagement", "Learning Analytics"],
    status: "In Progress",
    impact: "500+ Students Studied"
  },
  {
    title: "AI-Enhanced Learning in Robotics",
    description: "Exploring the integration of AI technologies to improve robotics education effectiveness and personalize learning experiences.",
    type: "project",
    icon: <Brain className="w-8 h-8" />,
    link: "/research/ai-robotics",
    category: "ai",
    date: "2023-2024",
    image: "https://images.unsplash.com/photo-1677442136019-1d9a4c5de2a6?w=600&h=400&fit=crop&crop=center",
    tags: ["Machine Learning", "Personalization", "Adaptive Learning"],
    status: "Completed",
    impact: "25% Improvement Rate"
  },
  {
    title: "STEM Education Through Robotics",
    description: "Analysis of robotics as a tool for comprehensive STEM education in secondary schools and its long-term educational benefits.",
    type: "publication",
    icon: <Award className="w-8 h-8" />,
    link: "/research/stem-robotics",
    category: "stem",
    date: "2023",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop&crop=center",
    tags: ["Secondary Education", "STEM Integration", "Curriculum Design"],
    status: "Published",
    impact: "50+ Schools Implemented"
  },
  {
    title: "Innovative Teaching Methods in Robotics",
    description: "Development and evaluation of new pedagogical approaches for robotics education including hands-on learning and collaborative projects.",
    type: "ongoing",
    icon: <Lightbulb className="w-8 h-8" />,
    link: "/research/teaching-methods",
    category: "education",
    date: "2024-Present",
    image: "https://images.unsplash.com/photo-1581091012184-6a1ce4e3d9c4?w=600&h=400&fit=crop&crop=center",
    tags: ["Pedagogy", "Collaborative Learning", "Innovation"],
    status: "Phase 2",
    impact: "12 Methods Developed"
  },
  {
    title: "Robotics Accessibility in Education",
    description: "Research focused on making robotics education accessible to underrepresented communities and students with diverse learning needs.",
    type: "project",
    icon: <Users className="w-8 h-8" />,
    link: "/research/accessibility",
    category: "education",
    date: "2023-2024",
    image: "https://images.unsplash.com/photo-1559291001-693fb9166cbc?w=600&h=400&fit=crop&crop=center",
    tags: ["Accessibility", "Inclusion", "Community Outreach"],
    status: "Completed",
    impact: "200+ Underserved Students"
  },
  {
    title: "Future of Robotics Curriculum",
    description: "Designing next-generation robotics curricula that integrate emerging technologies like IoT, AR/VR, and advanced AI systems.",
    type: "ongoing",
    icon: <Globe className="w-8 h-8" />,
    link: "/research/future-curriculum",
    category: "robotics",
    date: "2024-Present",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center",
    tags: ["Curriculum Development", "Emerging Tech", "Future Skills"],
    status: "Research Phase",
    impact: "Global Implementation"
  }
];

const ResearchPage = () => {
  const heroRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResearch, setFilteredResearch] = useState(researches);

  const categories = [
    { id: "all", label: "All Research", icon: <Target className="w-4 h-4" /> },
    { id: "robotics", label: "Robotics", icon: <BookOpen className="w-4 h-4" /> },
    { id: "ai", label: "AI", icon: <Brain className="w-4 h-4" /> },
    { id: "stem", label: "STEM", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "education", label: "Education", icon: <Users className="w-4 h-4" /> }
  ];

  const typeColors = {
    ongoing: "from-blue-500 to-cyan-500",
    completed: "from-green-500 to-teal-500",
    publication: "from-purple-500 to-pink-500",
    project: "from-orange-500 to-red-500"
  };

  const typeIcons = {
    ongoing: <Zap className="w-4 h-4" />,
    completed: <Award className="w-4 h-4" />,
    publication: <FileText className="w-4 h-4" />,
    project: <Target className="w-4 h-4" />
  };

  useEffect(() => {
    let filtered = researches;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(research => research.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(research => 
        research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        research.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        research.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredResearch(filtered);
  }, [selectedCategory, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50" />
        <div className="absolute inset-0 bg-white/80" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Research at EDUEME
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Exploring innovative approaches in robotics education and their impact on student learning outcomes. 
              Our research focuses on developing effective teaching methodologies and understanding the intersection of robotics and education.
            </p>
            
            {/* Research Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "15+", label: "Active Studies" },
                { number: "1000+", label: "Students Impacted" },
                { number: "25+", label: "Publications" },
                { number: "50+", label: "Partner Schools" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
                >
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search research topics, keywords, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  {category.icon}
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Grid */}
      <section className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredResearch.map((research, index) => (
                <motion.div
                  key={research.title}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-300 hover:shadow-xl transition-all duration-500 shadow-lg"
                >
                  {/* Research Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={research.image} 
                      alt={research.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[research.type]} text-white text-sm font-medium shadow-lg`}>
                        {typeIcons[research.type]}
                        {research.type}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium shadow-lg">
                        {research.status}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                        {research.icon}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {research.date}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">
                      {research.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {research.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {research.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{research.impact}</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                      >
                        Read Research
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredResearch.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-600">No Research Found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-semibold text-white hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 shadow-lg"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 shadow-xl"
          >
            <Lightbulb className="w-16 h-16 mx-auto mb-6 text-orange-600" />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Collaborate With Us
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our research community and help shape the future of robotics education through innovative studies and collaborative projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 146, 60, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full text-lg font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
              >
                <Users className="w-5 h-5" />
                Join Research Team
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-orange-500 rounded-full text-lg font-semibold text-orange-600 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                View Publications
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResearchPage;
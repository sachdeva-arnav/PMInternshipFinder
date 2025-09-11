"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./App.css"

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  // Form data state
  const [formData, setFormData] = useState({
    education: "",
    skill1: "",
    skill2: "",
    skill3: "",
    sector: "",
    location: "",
  })

  const languages = ["English", "Hindi"]
  const educationLevels = ["High School", "Associate", "Bachelor", "Master", "PhD"]
  const sectors = ["Technology", "Healthcare", "Finance", "Education", "Marketing"]
  const locations = ["Remote", "On-site", "Delhi NCR"]

  // Skill options
  const skillOptions = [
    "Remote Sensing",
    "Biostatistics",
    "Power BI",
    "Python",
    "Data Analysis",
    "Machine Learning",
    "JavaScript",
    "React",
    "SQL",
    "GIS",
    "Statistical Analysis",
    "Data Visualization",
  ]

  const testimonials = [
    {
      id: 1,
      name: "Jyoti",
      text: "I found the perfect internship in my city within minutes!",
      avatar: "👩🏽",
    },
    {
      id: 2,
      name: "Aditya",
      text: "The personalized recommendations saved me so much time.",
      avatar: "👨🏼",
    },
    {
      id: 3,
      name: "Akriti",
      text: "Applied to 3 internships and got calls from all of them!",
      avatar: "👩🏾",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Education: formData.education,
          "Skill no. 1": formData.skill1,
          "Skill no. 2": formData.skill2,
          "Skill no. 3": formData.skill3,
          Interest: formData.sector,
          Location: formData.location,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setRecommendations(data.Top_4_Internships || [])
      setShowRecommendations(true)
      setIsExpanded(true)

      // Scroll to recommendations section
      document.getElementById("recommendations").scrollIntoView({ behavior: "smooth" })
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      // Fallback to sample data if API fails
      setRecommendations([
        {
          Internship: "Automation QA Intern",
          Company: "Tech Solutions Inc.",
          Location: "Remote",
          Duration: "3 months",
        },
        { Internship: "Agri Data Intern", Company: "AgriTech Innovations", Location: "Hybrid", Duration: "6 months" },
        { Internship: "Solar PV Intern", Company: "Green Energy Corp", Location: "On-site", Duration: "4 months" },
        { Internship: "Learning Platform Intern", Company: "EdTech Startup", Location: "Remote", Duration: "3 months" },
      ])
      setShowRecommendations(true)
      setIsExpanded(true)
      document.getElementById("recommendations").scrollIntoView({ behavior: "smooth" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">




   {/* Navbar - Enhanced with premium animations and micro-interactions */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg py-4 px-4 sm:px-6 fixed w-full top-0 z-50 border-b border-blue-100/50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side - Logo with enhanced hover effect and floating animation */}
          <motion.div
            className="flex items-center group cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 400, damping: 10 },
            }}
          >
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="https://www.sih.gov.in/img1/SIH2025-logo.png"
                alt="SIH Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-150"></div>
          </motion.div>

          {/* Center - Brand Name with enhanced gradient, glow effect and typing animation */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <motion.div
              className="relative text-xl lg:text-2xl font-bold cursor-pointer group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent relative z-10 transition-all duration-500 group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-purple-400 font-extrabold tracking-wide">
                InternAI
              </span>

              {/* Multiple glow layers for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-700 -z-20"></div>

              <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 group-hover:w-full transition-all duration-700 ease-out rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
              </div>

              <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-100"></div>
              <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-500"></div>
            </motion.div>
          </div>

          {/* Desktop Navigation with enhanced hover effects and stagger animations */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-2">
            {[
              { name: "Home", href: "#", icon: "🏠" },
              { name: "About", href: "#about", icon: "ℹ️" },
              { name: "How It Works", href: "#how-it-works", icon: "⚙️" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                className="relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.a
                  href={item.href}
                  className="relative text-blue-800 hover:text-blue-600 transition-all duration-300 text-sm lg:text-base font-medium px-4 py-3 rounded-xl overflow-hidden flex items-center space-x-2"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-xl transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-indigo-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-all duration-600 rounded-xl transform rotate-180 group-hover:rotate-0"></div>

                  <span className="relative z-10 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    {item.icon}
                  </span>

                  {/* Text with enhanced styling */}
                  <span className="relative z-10 font-semibold">{item.name}</span>

                  <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-400 group-hover:w-[calc(100%-32px)] rounded-full">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></span>
                  </span>

                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 delay-100 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent skew-x-12"></div>

                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce delay-200"></div>
                  <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce delay-400"></div>
                </motion.a>
              </motion.div>
            ))}

            {/* Language selector with enhanced styling and morphing effects */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-3 border-2 border-blue-200 rounded-xl text-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-500 cursor-pointer text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-transparent relative overflow-hidden"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-white">
                    {lang}
                  </option>
                ))}
              </motion.select>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-xl blur-lg opacity-0 group-hover:opacity-15 transition-all duration-700 -z-20"></div>

              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
            </motion.div>
          </div>

          {/* Mobile Menu Button with enhanced animation and morphing */}
          <motion.button
            className="md:hidden relative flex flex-col space-y-1.5 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-500 group overflow-hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-400 ease-in-out origin-center"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
                scaleX: isMenuOpen ? 1.2 : 1,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-400 ease-in-out"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                x: isMenuOpen ? 20 : 0,
                rotate: isMenuOpen ? 180 : 0,
              }}
            />
            <motion.span
              className="w-6 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-400 ease-in-out origin-center"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
                scaleX: isMenuOpen ? 1.2 : 1,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-0 group-hover:opacity-25 transition-all duration-500 -z-10 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-xl blur-lg opacity-0 group-hover:opacity-15 transition-all duration-700 -z-20"></div>

            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-200/50 to-indigo-200/50 transform scale-0 group-active:scale-100 transition-transform duration-200"></div>
          </motion.button>
        </div>

        {/* Mobile Navigation with enhanced animations and stagger effects */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20, rotateX: -90 }}
              animate={{ opacity: 1, height: "auto", y: 0, rotateX: 0 }}
              exit={{ opacity: 0, height: 0, y: -20, rotateX: -90 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="md:hidden mt-4 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-blue-100/50 mx-2 overflow-hidden"
            >
              <div className="flex flex-col space-y-1">
                {[
                  { name: "Home", href: "#", icon: "🏠" },
                  { name: "About", href: "#about", icon: "ℹ️" },
                  { name: "How It Works", href: "#how-it-works", icon: "⚙️" },
                ].map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative text-blue-800 hover:text-blue-600 transition-all duration-400 py-4 px-5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 font-medium group overflow-hidden flex items-center space-x-3"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -30, rotateY: -45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="text-lg"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item.icon}
                    </motion.span>

                    <span className="relative z-10 flex-1">{item.name}</span>

                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-all duration-400 origin-top rounded-r"></div>

                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                    <motion.span
                      className="text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ x: 3 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                ))}

                <motion.div
                  className="relative pt-4"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-5 py-4 border-2 border-blue-200 rounded-xl text-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 font-medium focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-transparent transition-all duration-400 hover:shadow-lg"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className="bg-white">
                        {lang}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      {/* Hero Section - Adjusted padding for mobile */}
      <section className="pt-24 pb-16 px-4 sm:px-6 md:pt-32 md:pb-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4 md:mb-6">
              Find Internships That Match Your Skills
            </h1>
            <p className="text-lg sm:text-xl text-blue-700 mb-6 md:mb-8">
              Get 3–5 best internships tailored to your education, skills, and interests.
            </p>
            <button
              onClick={() => {
                document.getElementById("input-form").scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Recommendations
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-blue-100">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl">🎓</span>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-200 rounded-full flex items-center justify-center -ml-4">
                  <span className="text-2xl sm:text-3xl">💻</span>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 rounded-full flex items-center justify-center -ml-4">
                  <span className="text-2xl sm:text-3xl">🚀</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-center text-blue-800 mb-2">
                Personalized Internship Matches
              </h3>
              <p className="text-blue-600 text-center text-sm sm:text-base">
                Our AI algorithm finds the best opportunities based on your unique profile
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-8 md:mb-12">About InternAI</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-blue-700 text-lg mb-6">
              InternAI is an innovative platform that uses artificial intelligence to match students with the perfect
              internship opportunities based on their skills, education, and interests.
            </p>
            <p className="text-blue-700 text-lg">
              Our mission is to simplify the internship search process and help students find opportunities that will
              kickstart their careers.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-20 px-4 sm:px-6 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-12 md:mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">📝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Fill Your Profile</h3>
              <p className="text-blue-600 text-sm sm:text-base">
                Enter your education, skills, and preferences to create your profile
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🤖</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Get Suggestions</h3>
              <p className="text-blue-600 text-sm sm:text-base">
                Our AI algorithm recommends the best internships for you
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">📨</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Apply Easily</h3>
              <p className="text-blue-600 text-sm sm:text-base">View details and apply directly through our platform</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section id="input-form" className="py-16 md:py-20 px-4 sm:px-6 bg-blue-100">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-blue-200"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-4 sm:mb-6">
              Find Your Perfect Internship
            </h2>
            <p className="text-blue-700 text-center mb-6 sm:mb-8 text-sm sm:text-base">
              Tell us about yourself and we'll recommend the best matches
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
                {/* Education Field */}
                <div>
                  <label className="block text-blue-800 mb-2 text-sm sm:text-base">Education Level</label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Education</option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skills Fields */}
                {[1, 2, 3].map((num) => (
                  <div key={num}>
                    <label className="block text-blue-800 mb-2 text-sm sm:text-base">
                      Skill {num} {num === 1 ? "(required)" : "(optional)"}
                    </label>
                    <select
                      name={`skill${num}`}
                      value={formData[`skill${num}`]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required={num === 1}
                    >
                      <option value="">Select a skill</option>
                      {skillOptions.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                {/* Sector Field */}
                <div>
                  <label className="block text-blue-800 mb-2 text-sm sm:text-base">Sector Interests</label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Sector</option>
                    {sectors.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Field */}
                <div>
                  <label className="block text-blue-800 mb-2 text-sm sm:text-base">Location Preference</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 w-full sm:w-auto"
                >
                  {isLoading ? "Loading..." : "Show My Internships"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Recommended Internships Section */}
      {showRecommendations && (
        <section
          id="recommendations"
          className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl shadow-xl overflow-hidden"
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex justify-between items-center p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Perfect Matches Found</h2>
                    <p className="text-blue-100 text-sm sm:text-base">
                      {recommendations.length} personalized recommendations
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors"
                >
                  <span className="text-white text-xl">▼</span>
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {recommendations.map((internship, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.4,
                            ease: "easeOut",
                          }}
                          className="group relative bg-gradient-to-br from-white to-blue-50/50 border border-blue-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              {85 + index * 2}% Match
                            </div>
                          </div>

                          <div className="flex items-start mb-6">
                            <div className="relative">
                              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-2xl">💼</span>
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs">✓</span>
                              </div>
                            </div>
                            <div className="ml-4 flex-1">
                              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                                {internship.Internship}
                              </h3>
                              <p className="text-blue-600 font-medium text-sm">
                                {internship.Company || "Leading Tech Company"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center text-gray-600">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-sm">📍</span>
                              </div>
                              <span className="text-sm font-medium">{internship.Location || "Flexible Location"}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-sm">⏱</span>
                              </div>
                              <span className="text-sm font-medium">{internship.Duration || "3-6 months"}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-sm">💰</span>
                              </div>
                              <span className="text-sm font-medium">Stipend Available</span>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                              Apply Now
                            </button>
                            <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors group">
                              <span className="text-lg group-hover:scale-110 transition-transform">❤️</span>
                            </button>
                            <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors group">
                              <span className="text-lg group-hover:scale-110 transition-transform">📤</span>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="px-6 sm:px-8 pb-6 border-t border-blue-100">
                      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 space-y-4 sm:space-y-0">
                        <p className="text-gray-600 text-sm">
                          Showing {recommendations.length} of {recommendations.length} matches
                        </p>
                        <div className="flex space-x-3">
                          <button className="px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                            View All Internships
                          </button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Refine Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-blue-100">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-12 md:mb-16">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Personalized Matches</h3>
              <p className="text-blue-600 text-sm sm:text-base">
                We use AI to find internships that truly match your skills and interests
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">📱</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Easy & Mobile-Friendly</h3>
              <p className="text-blue-600 text-sm sm:text-base">Our platform works seamlessly on all your devices</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">🌐</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-800">Regional Language Support</h3>
              <p className="text-blue-600 text-sm sm:text-base">
                Use our platform in your preferred language for better experience
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-12 md:mb-16">What Students Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-100 p-4 sm:p-6 rounded-lg border border-blue-200"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl mr-3">{testimonial.avatar}</span>
                  <h3 className="font-semibold text-blue-800 text-sm sm:text-base">{testimonial.name}</h3>
                </div>
                <p className="text-blue-600 text-sm sm:text-base">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-900 text-white py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex justify-center md:justify-start">
              <div className="flex flex-col items-center md:items-start">
                <img
                  src="https://www.sih.gov.in/img1/SIH2025-logo.png"
                  alt="InternAI Match Logo"
                  className="h-12 sm:h-16 w-auto object-contain mb-4"
                />
                <p className="text-blue-200 text-center md:text-left text-sm sm:text-base">
                  Connecting students with the perfect internship opportunities.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-blue-200 hover:text-white transition text-sm sm:text-base">
                    About
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-blue-200 hover:text-white transition text-sm sm:text-base">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-blue-200 hover:text-white transition text-sm sm:text-base">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 sm:mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 sm:mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  <span className="text-blue-200 text-sm sm:text-base">support@internaimatch.com</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span className="text-blue-200 text-sm sm:text-base">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center mt-4 space-x-4">
                  <a href="#" className="text-blue-200 hover:text-white transition text-lg">
                    📘
                  </a>
                  <a href="#" className="text-blue-200 hover:text-white transition text-lg">
                    📸
                  </a>
                  <a href="#" className="text-blue-200 hover:text-white transition text-lg">
                    🐦
                  </a>
                  <a href="#" className="text-blue-200 hover:text-white transition text-lg">
                    💼
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200 text-sm sm:text-base">
            <p>© {new Date().getFullYear()} InternAI Match. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

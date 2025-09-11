import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    // Form data state
    const [formData, setFormData] = useState({
        education: '',
        skill1: '',
        skill2: '',
        skill3: '',
        sector: '',
        location: ''
    });

    const languages = ['English','Hindi'];
    // Education levels
const educationLevels = [
  "BBA (1st Year)", "BBA (Final Year)", "Diploma", "B.Tech IT", "B.Tech CSE",
  "BCA", "B.Com", "B.Sc", "MBA", "MCA", "M.Tech", "B.Pharm", "M.Sc", "B.Sc Env"
];

// Sector → replaced with Interests
const sectors = [
  "Public Data", "Smart Agriculture", "Smart Education",
  "Healthcare", "Renewable Energy", "Automation & IoT"
];

// Location → replaced with States
const locations = [
  "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh",
  "West Bengal", "Bihar", "Rajasthan", "Madhya Pradesh", "Gujarat",
  "Haryana", "Punjab", "Kerala", "Assam", "Odisha"
];

// Skill options (updated)
const skillOptions = [
  "Excel", "Python", "SQL", "Data Analysis", "Power BI",
  "IoT Basics", "Embedded Systems", "GIS/QGIS", "Remote Sensing",
  "Energy Audit", "React", "UI/UX", "APIs", "Biostatistics", "NaN"
];


    const testimonials = [
        {
            id: 1,
            name: 'Jyoti',
            text: 'I found the perfect internship in my city within minutes!',
            avatar: '👩🏽'
        },
        {
            id: 2,
            name: 'Aditya',
            text: 'The personalized recommendations saved me so much time.',
            avatar: '👨🏼'
        },
        {
            id: 3,
            name: 'Akriti',
            text: 'Applied to 3 internships and got calls from all of them!',
            avatar: '👩🏾'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Education: formData.education,
                    'Skill no. 1': formData.skill1,
                    'Skill no. 2': formData.skill2,
                    'Skill no. 3': formData.skill3,
                    Interest: formData.sector,
                    Location: formData.location
                })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setRecommendations(data.Top_4_Internships || []);
            setShowRecommendations(true);
            setIsExpanded(true);
            
            // Scroll to recommendations section
            setTimeout(() => {
            const section = document.getElementById("recommendations");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
            }, 100);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            // Fallback to sample data if API fails
            setRecommendations([
                { Internship: "Automation QA Intern", Company: "Tech Solutions Inc.", Location: "Remote", Duration: "3 months" },
                { Internship: "Agri Data Intern", Company: "AgriTech Innovations", Location: "Hybrid", Duration: "6 months" },
                { Internship: "Solar PV Intern", Company: "Green Energy Corp", Location: "On-site", Duration: "4 months" },
                { Internship: "Learning Platform Intern", Company: "EdTech Startup", Location: "Remote", Duration: "3 months" }
            ]);
            setShowRecommendations(true);
            setIsExpanded(true);
            // Wait until next paint cycle to scroll
            setTimeout(() => {
            const section = document.getElementById("recommendations");
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
            }, 100);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar - Fixed for mobile */}
            <nav className="bg-white shadow-lg py-4 px-4 sm:px-6 fixed w-full top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left side - Logo */}
                    <div className="flex items-center">
                        <img 
                            src="https://www.sih.gov.in/img1/SIH2025-logo.png" 
                            alt="SIH Logo" 
                            className="h-8 sm:h-10 w-auto object-contain"
                        />
                    </div>
                    
                    {/* Center - Brand Name - Hidden on mobile, visible on medium screens and up */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                        <motion.div 
                            className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            InternAI
                        </motion.div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <motion.a 
                            href="#" 
                            className="text-blue-800 hover:text-blue-600 transition relative group text-sm lg:text-base"
                            whileHover={{ y: -2 }}
                        >
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                        </motion.a>
                        <motion.a 
                            href="#about" 
                            className="text-blue-800 hover:text-blue-600 transition relative group text-sm lg:text-base"
                            whileHover={{ y: -2 }}
                        >
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                        </motion.a>
                        <motion.a 
                            href="#how-it-works" 
                            className="text-blue-800 hover:text-blue-600 transition relative group text-sm lg:text-base"
                            whileHover={{ y: -2 }}
                        >
                            How It Works
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                        </motion.a>
                      
                        <div className="relative">
                            <motion.select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="px-2 py-1.5 border rounded-md text-blue-800 bg-blue-50 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm"
                                whileHover={{ y: -2 }}
                            >
                                {languages.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </motion.select>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden flex flex-col space-y-1.5 p-1 rounded"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-0.5 bg-blue-800 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-blue-800 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-blue-800 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden mt-4 bg-white p-4 rounded-lg shadow-xl border border-blue-100"
                        >
                            <div className="flex flex-col space-y-4">
                                <a href="#" className="text-blue-800 hover:text-blue-600 transition py-2 px-4 rounded hover:bg-blue-50" onClick={() => setIsMenuOpen(false)}>Home</a>
                                <a href="#about" className="text-blue-800 hover:text-blue-600 transition py-2 px-4 rounded hover:bg-blue-50" onClick={() => setIsMenuOpen(false)}>About</a>
                                <a href="#how-it-works" className="text-blue-800 hover:text-blue-600 transition py-2 px-4 rounded hover:bg-blue-50" onClick={() => setIsMenuOpen(false)}>How It Works</a>

                                <div className="relative pt-2">
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md text-blue-800 bg-blue-50"
                                    >
                                        {languages.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                </div>
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
                                document.getElementById('input-form').scrollIntoView({ behavior: 'smooth' });
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
                            InternAI is an innovative platform that uses artificial intelligence to match students with the perfect internship opportunities based on their skills, education, and interests.
                        </p>
                        <p className="text-blue-700 text-lg">
                            Our mission is to simplify the internship search process and help students find opportunities that will kickstart their careers.
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
                            <p className="text-blue-600 text-sm sm:text-base">Enter your education, skills, and preferences to create your profile</p>
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
                            <p className="text-blue-600 text-sm sm:text-base">Our AI algorithm recommends the best internships for you</p>
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
                        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-4 sm:mb-6">Find Your Perfect Internship</h2>
                        <p className="text-blue-700 text-center mb-6 sm:mb-8 text-sm sm:text-base">Tell us about yourself and we'll recommend the best matches</p>

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
                                        {educationLevels.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Skills Fields */}
                                {[1,2,3].map(num => (
                                    <div key={num}>
                                        <label className="block text-blue-800 mb-2 text-sm sm:text-base">Skill {num} {num === 1 ? '(required)' : '(optional)'}</label>
                                        <select
                                            name={`skill${num}`}
                                            value={formData[`skill${num}`]}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                            required={num === 1}
                                        >
                                            <option value="">Select a skill</option>
                                            {skillOptions.map(skill => (
                                                <option key={skill} value={skill}>{skill}</option>
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
                                        {sectors.map(sector => (
                                            <option key={sector} value={sector}>{sector}</option>
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
                                        {locations.map(location => (
                                            <option key={location} value={location}>{location}</option>
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
                                    {isLoading ? 'Loading...' : 'Show My Internships'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Recommended Internships Section */}
            {showRecommendations && (
                <section id="recommendations" className="py-16 md:py-20 px-4 sm:px-6 bg-blue-50">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="w-full flex justify-between items-center p-4 sm:p-6 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                            >
                                <h2 className="text-xl sm:text-2xl font-bold text-blue-800">
                                    Recommended For You ({recommendations.length})
                                </h2>
                                <motion.span
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-blue-600 text-lg sm:text-xl"
                                >
                                    ▼
                                </motion.span>
                            </button>
                            
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                            {recommendations.map((internship, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-white border border-blue-200 rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow duration-200"
                                                >
                                                    <div className="flex items-start mb-3 sm:mb-4">
                                                        <div className="bg-blue-100 text-blue-800 rounded-lg p-2 sm:p-3 mr-3 sm:mr-4">
                                                            <span className="text-lg sm:text-xl">💼</span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base sm:text-lg font-semibold text-blue-800">{internship.Internship}</h3>
                                                            <p className="text-blue-600 text-sm sm:text-base">{internship.Company || "Leading Company"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-blue-700 mb-2 sm:mb-3 text-sm sm:text-base">
                                                        <span className="mr-2">📍</span>
                                                        <span>{internship.Location || "Various Locations"}</span>
                                                    </div>
                                                    <div className="flex items-center text-blue-700 mb-3 sm:mb-4 text-sm sm:text-base">
                                                        <span className="mr-2">⏱</span>
                                                        <span>{internship.Duration || "Flexible Duration"}</span>
                                                    </div>
                                                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base">
                                                        Apply Now
                                                    </button>
                                                </motion.div>
                                            ))}
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
                            <p className="text-blue-600 text-sm sm:text-base">We use AI to find internships that truly match your skills and interests</p>
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
                            <p className="text-blue-600 text-sm sm:text-base">Use our platform in your preferred language for better experience</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-20 px-4 sm:px-6 bg-blue-50">
                <div className="container mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-12 md:mb-16">What Students Say</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {testimonials.map(testimonial => (
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
                                <p className="text-blue-200 text-center md:text-left text-sm sm:text-base">Connecting students with the perfect internship opportunities.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3 sm:mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">Home</a></li>
                                <li><a href="#about" className="text-blue-200 hover:text-white transition text-sm sm:text-base">About</a></li>
                                <li><a href="#how-it-works" className="text-blue-200 hover:text-white transition text-sm sm:text-base">How It Works</a></li>
                                <li><a href="#contact" className="text-blue-200 hover:text-white transition text-sm sm:text-base">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-3 sm:mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">Privacy Policy</a></li>
                                <li><a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">Terms of Service</a></li>
                                <li><a href="#" className="text-blue-200 hover:text-white transition text-sm sm:text-base">FAQ</a></li>
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
                                    <a href="#" className="text-blue-200 hover:text-white transition text-lg">📘</a>
                                    <a href="#" className="text-blue-200 hover:text-white transition text-lg">📸</a>
                                    <a href="#" className="text-blue-200 hover:text-white transition text-lg">🐦</a>
                                    <a href="#" className="text-blue-200 hover:text-white transition text-lg">💼</a>
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
    );
};

export default LandingPage;

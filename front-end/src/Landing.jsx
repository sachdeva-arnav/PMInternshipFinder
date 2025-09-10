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
        skill: '',
        sector: '',
        location: ''
    });

    const languages = ['English','Hindi'];
    const educationLevels = ['High School', 'Associate', 'Bachelor', 'Master', 'PhD'];
    const sectors = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing'];
    const locations = ['Remote', 'On-site', 'Delhi NCR'];
    
    // Skill options
    const skillOptions = [
        'Remote Sensing', 'Biostatistics', 'Power BI', 'Python', 
        'Data Analysis', 'Machine Learning', 'JavaScript', 'React',
        'SQL', 'GIS', 'Statistical Analysis', 'Data Visualization'
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
            document.getElementById('recommendations').scrollIntoView({ behavior: 'smooth' });
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
            document.getElementById('recommendations').scrollIntoView({ behavior: 'smooth' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="bg-blue-50 shadow-md py-4 px-6 fixed w-full top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img 
                            src="https://www.sih.gov.in/img1/SIH2025-logo.png" 
                            alt="InternAI Match Logo" 
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-blue-800 hover:text-blue-600 transition">Home</a>
                        <a href="#about" className="text-blue-800 hover:text-blue-600 transition">About</a>
                        <a href="#how-it-works" className="text-blue-800 hover:text-blue-600 transition">How It Works</a>
                      

                        <div className="relative">
                            <select
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="px-2 py-1 border rounded-md text-blue-800 bg-blue-100"
                            >
                                {languages.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col space-y-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="w-6 h-0.5 bg-blue-800"></span>
                        <span className="w-6 h-0.5 bg-blue-800"></span>
                        <span className="w-6 h-0.5 bg-blue-800"></span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 bg-blue-50 p-4 rounded shadow-lg"
                    >
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="text-blue-800 hover:text-blue-600 transition">Home</a>
                            <a href="#about" className="text-blue-800 hover:text-blue-600 transition">About</a>
                            <a href="#how-it-works" className="text-blue-800 hover:text-blue-600 transition">How It Works</a>
                            <a href="#contact" className="text-blue-800 hover:text-blue-600 transition">Contact</a>

                            <div className="relative">
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md text-blue-800 bg-blue-100"
                                >
                                    {languages.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="md:w-1/2 mb-10 md:mb-0"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                            Find Internships That Match Your Skills
                        </h1>
                        <p className="text-xl text-blue-700 mb-8">
                            Get 3–5 best internships tailored to your education, skills, and interests.
                        </p>
                        <button
                            onClick={() => document.getElementById('input-form').scrollIntoView({ behavior: 'smooth' })}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
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
                        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-3xl">🎓</span>
                                </div>
                                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center -ml-4">
                                    <span className="text-3xl">💻</span>
                                </div>
                                <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center -ml-4">
                                    <span className="text-3xl">🚀</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-center text-blue-800 mb-2">
                                Personalized Internship Matches
                            </h3>
                            <p className="text-blue-600 text-center">
                                Our AI algorithm finds the best opportunities based on your unique profile
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 px-6 bg-blue-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-16">How It Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">📝</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-800">Fill Your Profile</h3>
                            <p className="text-blue-600">Enter your education, skills, and preferences to create your profile</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🤖</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-800">Get Suggestions</h3>
                            <p className="text-blue-600">Our AI algorithm recommends the best internships for you</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">📨</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-800">Apply Easily</h3>
                            <p className="text-blue-600">View details and apply directly through our platform</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Input Section */}
            <section id="input-form" className="py-20 px-6 bg-blue-100">
                <div className="container mx-auto max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-xl shadow-md border border-blue-200"
                    >
                        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Find Your Perfect Internship</h2>
                        <p className="text-blue-700 text-center mb-8">Tell us about yourself and we'll recommend the best matches</p>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 mb-6">
                                {/* Education Field */}
                                <div>
                                    <label className="block text-blue-800 mb-2">Education Level</label>
                                    <select
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Education</option>
                                        {educationLevels.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Skills Fields */}
                                {[1].map(num => (
                                    <div key={num}>
                                        <label className="block text-blue-800 mb-2">Skills</label>
                                        <select
                                            name={`skill${num}`}
                                            value={formData[`skill${num}`]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <label className="block text-blue-800 mb-2">Sector Interests</label>
                                    <select
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <label className="block text-blue-800 mb-2">Location Preference</label>
                                    <select
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
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
                <section id="recommendations" className="py-20 px-6 bg-blue-50">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="w-full flex justify-between items-center p-6 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                            >
                                <h2 className="text-2xl font-bold text-blue-800">
                                    Recommended For You ({recommendations.length})
                                </h2>
                                <motion.span
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-blue-600 text-xl"
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
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {recommendations.map((internship, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-white border border-blue-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-200"
                                                >
                                                    <div className="flex items-start mb-4">
                                                        <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mr-4">
                                                            <span className="text-xl">💼</span>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-blue-800">{internship.Internship}</h3>
                                                            <p className="text-blue-600">{internship.Company || "Leading Company"}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-blue-700 mb-3">
                                                        <span className="mr-2">📍</span>
                                                        <span>{internship.Location || "Various Locations"}</span>
                                                    </div>
                                                    <div className="flex items-center text-blue-700 mb-4">
                                                        <span className="mr-2">⏱</span>
                                                        <span>{internship.Duration || "Flexible Duration"}</span>
                                                    </div>
                                                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
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
            <section className="py-20 px-6 bg-blue-100">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-16">Why Choose Us</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-800">Personalized Matches</h3>
                            <p className="text-blue-600">We use AI to find internships that truly match your skills and interests</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">📱</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-800">Easy & Mobile-Friendly</h3>
                            <p className="text-blue-600">Our platform works seamlessly on all your devices</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🌐</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-800">Regional Language Support</h3>
                            <p className="text-blue-600">Use our platform in your preferred language for better experience</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-6 bg-blue-50">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-16">What Students Say</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map(testimonial => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-blue-100 p-6 rounded-lg border border-blue-200"
                            >
                                <div className="flex items-center mb-4">
                                    <span className="text-3xl mr-3">{testimonial.avatar}</span>
                                    <h3 className="font-semibold text-blue-800">{testimonial.name}</h3>
                                </div>
                                <p className="text-blue-600">"{testimonial.text}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-blue-900 text-white py-12 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="flex justify-center md:justify-start">
                            <div className="flex flex-col items-center md:items-start">
                                <img 
                                    src="https://www.sih.gov.in/img1/SIH2025-logo.png" 
                                    alt="InternAI Match Logo" 
                                    className="h-16 w-auto object-contain mb-4"
                                />
                                <p className="text-blue-200 text-center md:text-left">Connecting students with the perfect internship opportunities.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-blue-200 hover:text-white transition">Home</a></li>
                                <li><a href="#about" className="text-blue-200 hover:text-white transition">About</a></li>
                                <li><a href="#how-it-works" className="text-blue-200 hover:text-white transition">How It Works</a></li>
                                <li><a href="#contact" className="text-blue-200 hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-blue-200 hover:text-white transition">Privacy Policy</a></li>
                                <li><a href="#" className="text-blue-200 hover:text-white transition">Terms of Service</a></li>
                                <li><a href="#" className="text-blue-200 hover:text-white transition">FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <span className="mr-2">📧</span>
                                    <span className="text-blue-200">support@internaimatch.com</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">📞</span>
                                    <span className="text-blue-200">+1 (555) 123-4567</span>
                                </li>
                                <li className="flex items-center mt-4 space-x-4">
                                    <a href="#" className="text-blue-200 hover:text-white transition">📘</a>
                                    <a href="#" className="text-blue-200 hover:text-white transition">📸</a>
                                    <a href="#" className="text-blue-200 hover:text-white transition">🐦</a>
                                    <a href="#" className="text-blue-200 hover:text-white transition">💼</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
                        <p>© {new Date().getFullYear()} InternAI Match. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
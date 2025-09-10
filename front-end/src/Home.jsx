// Home.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const shadowX = ((x - centerX) / centerX) * 20;
    const shadowY = ((y - centerY) / centerY) * 20;
    
    setMousePosition({ x: shadowX, y: shadowY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-3xl border-2 border-purple-300 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * -0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
          boxShadow: `${mousePosition.x}px ${mousePosition.y}px 40px rgba(0, 0, 0, 0.25)`,
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-100 opacity-60 -z-10"></div>
        
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-black mb-2"
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </motion.h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to continue' : 'Get started with us today'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <LoginForm 
              key="login"
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
            />
          ) : (
            <SignupForm 
              key="signup"
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const LoginForm = ({ formData, handleChange, handleSubmit, toggleForm }) => {
  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-md transition-all duration-200"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-md transition-all duration-200"
          placeholder="Enter your password"
          required
        />
      </div>

      <motion.button
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 12px 30px -3px rgba(59, 130, 246, 0.5)" 
        }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium shadow-lg transition-all duration-200"
      >
        Sign In
      </motion.button>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 font-medium hover:underline focus:outline-none transition-all duration-200"
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.form>
  );
};

const SignupForm = ({ formData, handleChange, handleSubmit, toggleForm }) => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-md transition-all duration-200"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="email"
          id="signup-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-md transition-all duration-200"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="password"
          id="signup-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-md transition-all duration-200"
          placeholder="Create a password"
          required
        />
      </div>

      <motion.button
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 12px 30px -3px rgba(59, 130, 246, 0.5)" 
        }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium shadow-lg transition-all duration-200"
      >
        Sign Up
      </motion.button>

      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 font-medium hover:underline focus:outline-none transition-all duration-200"
          >
            Login
          </button>
        </p>
      </div>
    </motion.form>
  );
};

export default Home;
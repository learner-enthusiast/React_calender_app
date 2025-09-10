import {
  FaQuestionCircle,
  FaUtensils,
  FaHiking,
  FaFilm,
  FaBookOpen,
  FaBriefcase,
  FaDumbbell,
  FaUsers,
  FaPlane,
  FaHeartbeat,
  FaShoppingCart,
  FaGamepad,
  FaChild,
  FaCode,
  FaLaptopCode,
  FaCoffee,
  FaChalkboardTeacher,
  FaBrain,
  FaMusic,
  FaCamera,
  FaBiking,
  FaRunning,
  FaServer,
  FaBug,
  FaLaptop,
  FaNetworkWired
} from 'react-icons/fa';
import React from 'react';
export const CATEGORY_OPTIONS = [
  // --- General / Default ---
  { value: '', label: 'No Category', color: '#9E9E9E', icon: <FaQuestionCircle /> },

  // --- Developer / Work Life ---
  { value: 'work', label: 'Work', color: '#2196F3', icon: <FaBriefcase /> },
  { value: 'coding', label: 'Coding', color: '#1565C0', icon: <FaCode /> },
  { value: 'projects', label: 'Projects', color: '#283593', icon: <FaLaptopCode /> },
  { value: 'deployments', label: 'Deployments', color: '#00897B', icon: <FaServer /> },
  { value: 'debugging', label: 'Debugging', color: '#E53935', icon: <FaBug /> },
  { value: 'meetings', label: 'Meetings', color: '#6A1B9A', icon: <FaLaptop /> },
  { value: 'networking', label: 'Networking', color: '#546E7A', icon: <FaNetworkWired /> },
  { value: 'learning', label: 'Learning', color: '#1E88E5', icon: <FaChalkboardTeacher /> },
  { value: 'coffee-break', label: 'Coffee Break', color: '#6D4C41', icon: <FaCoffee /> },
  { value: 'mindfulness', label: 'Mindfulness', color: '#00ACC1', icon: <FaBrain /> },

  // --- Lifestyle & Hobbies ---
  { value: 'brunch', label: 'Brunch', color: '#FFB74D', icon: <FaUtensils /> },
  { value: 'hiking', label: 'Hiking', color: '#4CAF50', icon: <FaHiking /> },
  { value: 'movie-night', label: 'Movie Night', color: '#3F51B5', icon: <FaFilm /> },
  { value: 'reading', label: 'Reading', color: '#8E24AA', icon: <FaBookOpen /> },
  { value: 'music', label: 'Music', color: '#8E24AA', icon: <FaMusic /> },
  { value: 'photography', label: 'Photography', color: '#5D4037', icon: <FaCamera /> },
  { value: 'gaming', label: 'Gaming', color: '#BA68C8', icon: <FaGamepad /> },

  // --- Health & Fitness ---
  { value: 'exercise', label: 'Exercise', color: '#E53935', icon: <FaDumbbell /> },
  { value: 'cycling', label: 'Cycling', color: '#2E7D32', icon: <FaBiking /> },
  { value: 'running', label: 'Running', color: '#D32F2F', icon: <FaRunning /> },
  { value: 'health', label: 'Health', color: '#43A047', icon: <FaHeartbeat /> },

  // --- Social & Family ---
  { value: 'social', label: 'Social', color: '#FF9800', icon: <FaUsers /> },
  { value: 'family', label: 'Family', color: '#FFD54F', icon: <FaChild /> },
  { value: 'travel', label: 'Travel', color: '#009688', icon: <FaPlane /> },
  { value: 'shopping', label: 'Shopping', color: '#F06292', icon: <FaShoppingCart /> },

  // --- Misc ---
  { value: 'other', label: 'Other', color: '#607D8B', icon: <FaQuestionCircle /> }
];

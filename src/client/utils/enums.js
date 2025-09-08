import {
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
  FaQuestionCircle
} from 'react-icons/fa';
import React from 'react';
export const CATEGORY_OPTIONS = [
  { value: '', label: 'No Category', color: '#9E9E9E', icon: <FaQuestionCircle /> }, // gray
  { value: 'brunch', label: 'Brunch', color: '#FFB74D', icon: <FaUtensils /> }, // orange
  { value: 'hiking', label: 'Hiking', color: '#4CAF50', icon: <FaHiking /> }, // green
  { value: 'movie-night', label: 'Movie Night', color: '#3F51B5', icon: <FaFilm /> }, // indigo
  { value: 'reading', label: 'Reading', color: '#8E24AA', icon: <FaBookOpen /> }, // purple
  { value: 'work', label: 'Work', color: '#2196F3', icon: <FaBriefcase /> }, // blue
  { value: 'exercise', label: 'Exercise', color: '#E53935', icon: <FaDumbbell /> }, // red
  { value: 'social', label: 'Social', color: '#FF9800', icon: <FaUsers /> }, // deep orange
  { value: 'travel', label: 'Travel', color: '#009688', icon: <FaPlane /> }, // teal
  { value: 'health', label: 'Health', color: '#43A047', icon: <FaHeartbeat /> }, // darker green
  { value: 'shopping', label: 'Shopping', color: '#F06292', icon: <FaShoppingCart /> }, // pink
  { value: 'hobby', label: 'Hobby', color: '#BA68C8', icon: <FaGamepad /> }, // light purple
  { value: 'family', label: 'Family', color: '#FFD54F', icon: <FaChild /> }, // yellow
  { value: 'other', label: 'Other', color: '#607D8B', icon: <FaQuestionCircle /> } // blue-gray
];

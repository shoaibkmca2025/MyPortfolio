import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// Register GSAP plugins globally once at the application root to prevent crashes
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
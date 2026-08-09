

import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Footer from './components/common/Footer';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 selection:bg-black selection:text-white">
      {/* 1. Fixed & Blurred Navbar for a high-end feel */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      <main className="pt-20">
        {/* 2. AnimatePresence handles the exit/entry logic during route changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
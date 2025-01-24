import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import TeamDraw from './components/TeamDraw';
import PresenceList from './components/PresenceList';
import Statistics from './components/Statistics';
import Championship from './components/pages/Championship';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/player/new" element={<PlayerForm />} />
          <Route path="/players" element={<PlayerList />} />
          <Route path="/teams/draw" element={<TeamDraw />} />
          <Route path="/presence" element={<PresenceList />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/championship" element={<Championship />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
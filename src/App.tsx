
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Menu from './components/menu/Menu';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import TeamDraw from './components/TeamDraw';
import PresenceList from './components/PresenceList';
import Statistics from './components/Statistics';
import Championship from './components/pages/Championship';
import { PagesTitle } from './components/shared/PagesTitle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { springConfig } from './utils/animations';

//const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu' || location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        {!isMenuPage && <PagesTitle />}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springConfig}
          >
            <Routes location={location}>
              <Route path="/" element={<Navigate to="/menu" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/player/new" element={<PlayerForm />} />
              <Route path="/players" element={<PlayerList />} />
              <Route path="/teams/draw" element={<TeamDraw />} />
              <Route path="/presence" element={<PresenceList />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/championship" element={<Championship />} />
              <Route path="*" element={<Navigate to="/menu" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const App = () => {
  return <AppContent />; 
};

export default App;

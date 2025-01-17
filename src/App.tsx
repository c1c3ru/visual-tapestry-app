import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/pages/Login'; 
import Dashboard from './components/pages/Dashboard';
import PlayerForm from './components/PlayerForm';
import { PlayerList } from './components/PlayerList';
import TeamDraw from './components/TeamDraw';
import PresenceList from './components/PresenceList';
import Statistics  from './components/Statistics';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/player/new" element={<PlayerForm />} />
      <Route path="/players" element={<PlayerList />} />
      <Route path="/teams/draw" element={<TeamDraw />} />
      <Route path="/presence" element={<PresenceList />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
  );
};

export default App;

import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/player/new" className="text-green-500 hover:underline">
            Cadastrar Jogador
          </Link>
        </li>
        <li>
          <Link to="/players" className="text-green-500 hover:underline">
            Lista de Jogadores
          </Link>
        </li>
        <li>
          <Link to="/teams/draw" className="text-green-500 hover:underline">
            Sorteio de Times
          </Link>
        </li>
        <li>
          <Link to="/presence" className="text-green-500 hover:underline">
            Lista de Presença
          </Link>
        </li>
        <li>
          <Link to="/statistics" className="text-green-500 hover:underline">
            Estatísticas
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;

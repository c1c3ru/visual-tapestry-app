import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Lógica de autenticação com o Google
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo!</h1>
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
      >
        Login com Google
      </button>
    </div>
  );
};

export default Login;

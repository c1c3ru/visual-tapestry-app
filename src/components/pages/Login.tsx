import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

const BUTTON_CLASSES = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
const BUTTON_LOADING_CLASSES = "bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed";

const Login = () => {
  const { isLoading, error, setLoading, setError } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulação de login com Google
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Sucesso no login
      setLoading(false);
      navigate('/dashboard'); // Redirecionar para a página de dashboard
    } catch (error) {
      setError("Erro ao fazer login com Google");
      setLoading(false);

    }
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo!</h1>
      <button
        onClick={handleGoogleLogin}
        className={isLoading ? BUTTON_LOADING_CLASSES : BUTTON_CLASSES}
        disabled={isLoading}
        aria-label="Login com Google"
      >
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          "Login com Google"
        )}
      </button>
      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
    </div>
  );
};

export default Login;
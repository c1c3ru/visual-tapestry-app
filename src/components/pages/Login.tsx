import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BUTTON_CLASSES = "px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition";
const BUTTON_LOADING_CLASSES = "px-6 py-3 bg-gray-300 text-white rounded-lg shadow-md cursor-not-allowed transition";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Lógica de autenticação com o Google
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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
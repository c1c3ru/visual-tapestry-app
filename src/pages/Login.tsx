import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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
      navigate('/dashboard');
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Bem-vindo!</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleGoogleLogin}
              className="w-full"
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </>
              ) : (
                "Login com Google"
              )}
            </Button>
            {error && (
              <p className="mt-4 text-sm text-destructive text-center">{error}</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
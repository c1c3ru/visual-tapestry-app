import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BackToDashboard from "../BackToDashboard";
import { User } from 'lucide-react';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

export const PlayerHeader = () => {
  return (
    <div className="mb-6 space-y-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={springConfig}
        >
          <BackToDashboard />
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-teal-50 border-b-4 border-teal-500">
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="p-3 bg-teal-100 rounded-full">
              <User className="h-6 w-6 text-teal-600" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Cadastrar Novo Jogador
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
};
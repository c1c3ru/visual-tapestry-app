import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from 'lucide-react';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface PlayerFormHeaderProps {
  title: string;
}

export const PlayerFormHeader: React.FC<PlayerFormHeaderProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
    >
      <Card className="mb-6 hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-50 to-teal-50">
        <CardHeader className="flex flex-row items-center space-x-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
};
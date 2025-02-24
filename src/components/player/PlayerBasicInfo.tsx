import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from 'lucide-react';
import { ErrorState } from '@/utils/types';

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

interface PlayerBasicInfoProps {
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: (checked: boolean) => void;
  errors: {
    name: ErrorState;
    isGuest: ErrorState;
  };
}

export const PlayerBasicInfo = ({
  name,
  nickname,
  birthDate,
  isGuest,
  onChange,
  onGuestChange,
  errors
}: PlayerBasicInfoProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="space-y-6"
    >
      {/* Name Field */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nome Completo *
        </Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Ex: João da Silva"
          className={`mt-1 ${errors.name ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"}`}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1 mt-1"
              id="name-error"
              role="alert"
            >
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-600">Nome é obrigatório</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Nickname Field */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.2 }}
      >
        <Label htmlFor="nickname" className="text-sm font-medium text-gray-700">
          Apelido
        </Label>
        <Input
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={onChange}
          placeholder="Ex: Jão"
          className="mt-1 focus:ring-blue-200"
        />
      </motion.div>

      {/* Birth Date Field */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.3 }}
      >
        <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
          Data de Nascimento
        </Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={birthDate}
          onChange={onChange}
          className="mt-1 focus:ring-blue-200"
          max={new Date().toISOString().split('T')[0]}
        />
      </motion.div>

      {/* Guest Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springConfig, delay: 0.4 }}
        className="space-y-2"
      >
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">
            É convidado? *
          </legend>
          <div className="flex gap-6">
            {[true, false].map((value) => (
              <label 
                key={String(value)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={isGuest === value}
                  onCheckedChange={() => onGuestChange(value)}
                  className={`h-5 w-5 ${errors.isGuest ? "border-red-500" : "border-gray-300"}`}
                  aria-invalid={errors.isGuest ? "true" : "false"}
                />
                <span className="text-sm text-gray-700">
                  {value ? 'Sim' : 'Não'}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <AnimatePresence>
          {errors.isGuest && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1"
              role="alert"
            >
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-600">Selecione o status de convidado</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

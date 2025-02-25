
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle } from "lucide-react";

interface PlayerBasicInfoProps {
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: (checked: boolean) => void;
  errors: Record<string, { hasError: boolean; message: string }>;
}

export const PlayerBasicInfo: React.FC<PlayerBasicInfoProps> = ({
  name,
  nickname,
  birthDate,
  isGuest,
  onChange,
  onGuestChange,
  errors,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          className={errors.name?.hasError ? "border-red-500" : ""}
          aria-invalid={errors.name?.hasError}
          aria-describedby={errors.name?.hasError ? "name-error" : undefined}
        />
        {errors.name?.hasError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id="name-error"
            className="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertTriangle className="h-4 w-4" />
            {errors.name.message}
          </motion.p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nickname">Apelido</Label>
        <Input
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">Data de Nascimento</Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={birthDate}
          onChange={onChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="isGuest">Selecionar se é convidado ou não</Label>
        <Switch
          id="isGuest"
          name="isGuest"
          checked={isGuest}
          onCheckedChange={onGuestChange}
        />
      </div>
    </motion.div>
  );
};

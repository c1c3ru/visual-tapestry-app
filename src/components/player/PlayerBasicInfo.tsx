
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PlayerBasicInfoProps {
  name: string;
  nickname: string;
  birthDate: string;
  isGuest: boolean | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: (checked: boolean) => void;
  errors: {
    name: boolean;
    isGuest: boolean;
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
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Nome do jogador"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500">Nome é obrigatório.</p>}
      </div>

      <div>
        <Label htmlFor="nickname">Apelido</Label>
        <Input
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={onChange}
          placeholder="Apelido do jogador"
        />
      </div>

      <div>
        <Label htmlFor="birthDate">Data de Nascimento</Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={birthDate}
          onChange={onChange}
        />
      </div>

      <div>
        <Label>É convidado?</Label>
        <div className="flex gap-4">
          <div className="flex items-center">
            <Checkbox
              id="isGuestYes"
              name="isGuest"
              checked={isGuest === true}
              onCheckedChange={(checked) => onGuestChange(checked as boolean)}
              className={errors.isGuest ? "border-red-500" : ""}
            />
            <Label htmlFor="isGuestYes" className="ml-2">Sim</Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="isGuestNo"
              name="isGuest"
              checked={isGuest === false}
              onCheckedChange={(checked) => onGuestChange(!checked as boolean)}
              className={errors.isGuest ? "border-red-500" : ""}
            />
            <Label htmlFor="isGuestNo" className="ml-2">Não</Label>
          </div>
        </div>
        {errors.isGuest && <p className="text-red-500">Marcar como convidado é obrigatório.</p>}
      </div>
    </div>
  );
};

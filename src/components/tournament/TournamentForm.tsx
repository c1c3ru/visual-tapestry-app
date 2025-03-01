
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface TournamentFormProps {
  teamName: string;
  responsible: string;
  ranking: number;
  onTeamNameChange: (name: string) => void;
  onResponsibleChange: (responsible: string) => void;
  onRankingChange: (ranking: number) => void;
  onSubmit: () => void;
}

export const TournamentForm = ({
  teamName,
  responsible,
  ranking,
  onTeamNameChange,
  onResponsibleChange,
  onRankingChange,
  onSubmit,
}: TournamentFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="teamName" className="block text-sm font-medium mb-1">
          Nome do Time
        </label>
        <Input
          id="teamName"
          value={teamName}
          onChange={(e) => onTeamNameChange(e.target.value)}
          placeholder="Digite o nome do time"
          required
        />
      </div>

      <div>
        <label htmlFor="responsible" className="block text-sm font-medium mb-1">
          Responsável
        </label>
        <Input
          id="responsible"
          value={responsible}
          onChange={(e) => onResponsibleChange(e.target.value)}
          placeholder="Digite o nome do responsável"
        />
      </div>

      <div>
        <label htmlFor="ranking" className="block text-sm font-medium mb-1">
          Ranking
        </label>
        <Input
          id="ranking"
          type="number"
          value={ranking}
          onChange={(e) => onRankingChange(Number(e.target.value))}
          placeholder="Digite o ranking do time"
          min="0"
          max="100"
        />
      </div>

      <Button type="submit" className="w-full">
        Adicionar Time
      </Button>
    </form>
  );
};

export default TournamentForm;

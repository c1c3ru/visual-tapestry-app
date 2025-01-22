import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, StarHalf, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BackToDashboard } from "./BackToDashboard";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Player, Rating } from "@/utils/types";

type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol" | "rugby" | "hockey" | "cricket" | "baseball";

type Position = {
  [key in Sport]: string[];
};

const positions: Position = {
  futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
  futebol: ["Goleiro", "Defensor", "Meio-campo", "Atacante"],
  volei: ["Levantador", "Líbero", "Central", "Ponteiro", "Oposto"],
  basquete: ["Armador", "Ala", "Ala-pivô", "Pivô"],
  handbol: ["Goleiro", "Ponta", "Central", "Pivô"],
  rugby: ["Pilar", "Hooker", "Segunda linha", "Asa", "Número 8", "Scrum-half", "Abertura", "Centro", "Ponta", "Fullback"],
  hockey: ["Goleiro", "Defensor", "Atacante"],
  cricket: ["Batedor", "Arremessador", "Wicket-keeper", "All-rounder"],
  baseball: ["Arremessador", "Receptor", "Primeira base", "Segunda base", "Terceira base", "Interbases", "Campista esquerdo", "Campista central", "Campista direito"],
};

const PlayerForm = () => {
  const { addPlayer } = usePlayerStore();
  const [newPlayer, setNewPlayer] = useState<Omit<Player, 'id' | 'createdAt'>>({
    name: "",
    nickname: "",
    birthDate: "",
    isGuest: false,
    sport: "futebol",
    selectedPositions: [],
    rating: 0 as Rating,
    includeInDraw: false,
    present: false,
    paid: false,
    registered: true,
    selected: false,
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPlayer((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewPlayer((prev) => ({
      ...prev,
      sport: value as Sport,
      selectedPositions: [],
    }));
  };

  const handlePositionChange = (position: string) => {
    setNewPlayer((prev) => ({
      ...prev,
      selectedPositions: prev.selectedPositions.includes(position)
        ? prev.selectedPositions.filter((pos) => pos !== position)
        : [...prev.selectedPositions, position],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const player: Player = {
      ...newPlayer,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    addPlayer(player);
    toast({
      title: "Jogador Adicionado",
      description: "Novo jogador foi adicionado com sucesso.",
    });
    setNewPlayer({
      name: "",
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: "futebol",
      selectedPositions: [],
      rating: 0 as Rating,
      includeInDraw: false,
      present: false,
      paid: false,
      registered: true,
      selected: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToDashboard />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={newPlayer.name}
                onChange={handleChange}
                placeholder="Nome do jogador"
              />
            </div>
            <div>
              <Label htmlFor="nickname">Apelido</Label>
              <Input
                id="nickname"
                name="nickname"
                value={newPlayer.nickname}
                onChange={handleChange}
                placeholder="Apelido do jogador"
              />
            </div>
            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={newPlayer.birthDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="isGuest">É convidado?</Label>
              <Checkbox
                id="isGuest"
                name="isGuest"
                checked={newPlayer.isGuest}
                onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              />
            </div>
            <div>
              <Label htmlFor="sport">Esporte</Label>
              <Select
                value={newPlayer.sport}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um esporte" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(positions).map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Posições</Label>
              <div className="flex flex-wrap gap-2">
                {positions[newPlayer.sport].map((position) => (
                  <Checkbox
                    key={position}
                    id={position}
                    name="selectedPositions"
                    checked={newPlayer.selectedPositions.includes(position)}
                    onChange={() => handlePositionChange(position)}
                  >
                    {position}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="rating">Avaliação</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    type="button"
                    variant={newPlayer.rating === rating ? "default" : "outline"}
                    onClick={() => setNewPlayer((prev) => ({ ...prev, rating: rating as Rating }))}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            </div>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PlayerForm;

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
import { saveToLocalStorage, getFromLocalStorage } from "@/utils/localStorage";

type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol";

type Position = {
  [key in Sport]: string[];
};

const positions: Position = {
  futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
  futebol: ["Goleiro", "Defensor", "Meio-campo", "Atacante"],
  volei: ["Levantador", "Líbero", "Central", "Ponteiro", "Oposto"],
  basquete: ["Armador", "Ala", "Ala-pivô", "Pivô"],
  handbol: ["Goleiro", "Ponta", "Central", "Pivô"],
};

const PlayerForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    birthDate: "",
    isGuest: false,
    sport: "futsal" as Sport,
    selectedPositions: [] as string[],
    rating: 0,
    includeInDraw: false,
  });

  const [ratingSystem, setRatingSystem] = useState<string>(
    localStorage.getItem("ratingSystem") || "stars"
  );
  const [guestHighlight, setGuestHighlight] = useState<string>(
    localStorage.getItem("guestHighlight") || "orange"
  );

  const handleSave = () => {
    const { name, selectedPositions, isGuest } = formData;

    if (!name || selectedPositions.length === 0) {
      toast({
        title: "Erro",
        description: "Nome e pelo menos uma posição são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const players = getFromLocalStorage("players") || [];
    const newPlayer = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    players.push(newPlayer);
    saveToLocalStorage("players", players);

    toast({
      title: "Sucesso",
      description: "Jogador salvo com sucesso!",
    });

    setFormData({
      name: "",
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: "futsal",
      selectedPositions: [],
      rating: 0,
      includeInDraw: false,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (position: string, checked: boolean) => {
    const updatedPositions = checked
      ? [...formData.selectedPositions, position]
      : formData.selectedPositions.filter((p) => p !== position);
    setFormData({ ...formData, selectedPositions: updatedPositions });
  };

  const handleStarClick = (star: number, isHalf: boolean = false) => {
    const currentRating = formData.rating;
    let newRating = star;

    if (ratingSystem === "halfStars") {
      if (isHalf) {
        newRating = star - 0.5;
      } else if (currentRating === star) {
        newRating = star - 0.5;
      }
    }

    setFormData({ ...formData, rating: newRating });
  };

  const renderRatingInput = () => {
    switch (ratingSystem) {
      case "halfStars":
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="relative">
                <button
                  onClick={() => handleStarClick(star, true)}
                  className="absolute left-0 w-1/2 h-full focus:outline-none transition-transform hover:scale-110"
                />
                <button
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  {formData.rating >= star ? (
                    <Star className="fill-primary text-primary" size={32} />
                  ) : formData.rating >= star - 0.5 ? (
                    <StarHalf className="fill-primary text-primary" size={32} />
                  ) : (
                    <Star className="fill-muted text-muted" size={32} />
                  )}
                </button>
              </div>
            ))}
          </div>
        );
      case "stars":
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setFormData({ ...formData, rating: star })}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    formData.rating >= star
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        );
      case "numeric 10":
        return (
          <div className="flex gap-2">
            {[...Array(10)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setFormData({ ...formData, rating: i + 1 })}
                className={`w-8 h-8 rounded-full ${
                  formData.rating >= i + 1
                    ? i + 1 <= 3
                      ? "bg-red-500"
                      : i + 1 <= 7
                      ? "bg-green-500"
                      : "bg-blue-500"
                    : "bg-gray-200"
                } text-white transition-colors`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        );
      case "numeric 5":
        return (
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setFormData({ ...formData, rating: i + 1 })}
                className={`w-8 h-8 rounded-full ${
                  formData.rating >= i + 1
                    ? i + 1 <= 2
                      ? "bg-red-500"
                      : i + 1 <= 4
                      ? "bg-green-500"
                      : "bg-blue-500"
                    : "bg-gray-200"
                } text-white transition-colors`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen p-4 transition-colors duration-300 ${
        formData.isGuest ? `bg-${guestHighlight}-50` : "bg-background"
      }`}
    >
      <BackToDashboard />
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-xl font-semibold text-center">
          {formData.isGuest
            ? "Cadastrar Jogador Convidado"
            : "Cadastrar Jogador"}
        </h1>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <Label htmlFor="name" className="text-muted-foreground mb-2 block">
              Nome *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border-b border-primary/20 rounded-none px-0 focus-visible:ring-0"
              placeholder="Digite o nome do jogador"
              required
            />
          </div>

          <div>
            <Label
              htmlFor="nickname"
              className="text-muted-foreground mb-2 block"
            >
              Apelido
            </Label>
            <Input
              id="nickname"
              value={formData.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              className="border-b border-primary/20 rounded-none px-0 focus-visible:ring-0"
              placeholder="Digite o apelido do jogador"
            />
          </div>

          <div>
            <Label
              htmlFor="birthDate"
              className="text-muted-foreground mb-2 block"
            >
              Data de Nascimento
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              className="border-b border-primary/20 rounded-none px-0 focus-visible:ring-0"
            />
          </div>

          <div>
            <Label className="text-muted-foreground mb-4 block">Nível</Label>
            {renderRatingInput()}
          </div>

          <div>
            <Label className="text-muted-foreground mb-2 block">
              Modalidade
            </Label>
            <Select
              value={formData.sport}
              onValueChange={(value) =>
                setFormData({ ...formData, sport: value as Sport })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="futsal">Futsal</SelectItem>
                <SelectItem value="futebol">Futebol</SelectItem>
                <SelectItem value="volei">Vôlei</SelectItem>
                <SelectItem value="basquete">Basquete</SelectItem>
                <SelectItem value="handbol">Handbol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-muted-foreground mb-2 block">
              Posições *
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {positions[formData.sport].map((position) => (
                <div key={position} className="flex items-center space-x-2">
                  <Checkbox
                    id={position}
                    checked={formData.selectedPositions.includes(position)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(position, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={position}
                    className="text-sm font-medium leading-none"
                  >
                    {position}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="guest"
              checked={formData.isGuest}
              onCheckedChange={(checked) => {
                setFormData({ ...formData, isGuest: checked as boolean });
                if (checked && formData.includeInDraw) {
                  toast({
                    title: "Sucesso",
                    description: "Jogador convidado incluído no sorteio!",
                  });
                } else if (!formData.includeInDraw) {
                  toast({
                    title: "Aviso",
                    description: "Jogador não incluído no sorteio.",
                  });
                }
              }}
            />
            <label htmlFor="guest" className="text-sm font-medium leading-none">
              Jogador Convidado *
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeInDraw"
              checked={formData.includeInDraw}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, includeInDraw: checked as boolean })
              }
            />
            <label
              htmlFor="includeInDraw"
              className="text-sm font-medium leading-none"
            >
              Incluir no Sorteio de Times
            </label>
          </div>

          <div className="flex justify-end pt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerForm;

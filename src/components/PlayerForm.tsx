import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, StarHalf, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BackToDashboard } from "./BackToDashboard";
import { motion } from "framer-motion";

type Sport = "futsal" | "futebol" | "volei" | "basquete" | "handbol";

type Position = {
  [key in Sport]: string[];
};

const positions: Position = {
  futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
  futebol: ["Goleiro", "Defensor", "Meio-campo", "Atacante"],
  volei: ["Levantador", "Líbero", "Central", "Ponteiro", "Oposto"],
  basquete: ["Armador", "Ala", "Ala-pivô", "Pivô"],
  handbol: ["Goleiro", "Ponta", "Central", "Pivô"]
};

const PlayerForm = () => {
  const { toast } = useToast();
  const [rating, setRating] = React.useState(0);
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [isGuest, setIsGuest] = React.useState(false);
  const [sport, setSport] = React.useState<Sport>("futsal");
  const [selectedPositions, setSelectedPositions] = React.useState<string[]>([]);
  const ratingSystem = localStorage.getItem('ratingSystem') || 'stars';
  const guestHighlight = localStorage.getItem('guestHighlight') || 'orange';

  const handleSave = () => {
    if (!name) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Sucesso",
      description: "Jogador salvo com sucesso!",
    });
  };

  const handlePositionChange = (position: string, checked: boolean) => {
    if (checked) {
      setSelectedPositions([...selectedPositions, position]);
    } else {
      setSelectedPositions(selectedPositions.filter(p => p !== position));
    }
  };

  const renderRatingInput = () => {
    switch (ratingSystem) {
      case 'stars':
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={`${
                    rating >= star
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        );
      case 'halfStars':
        return (
          <div className="flex gap-2">
            {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                {Number.isInteger(star) ? (
                  <Star
                    size={32}
                    className={`${
                      rating >= star
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    } transition-colors`}
                  />
                ) : (
                  <StarHalf
                    size={32}
                    className={`${
                      rating >= star
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    } transition-colors`}
                  />
                )}
              </button>
            ))}
          </div>
        );
      case 'numeric10':
        return (
          <div className="flex gap-2">
            {[...Array(10)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setRating(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  rating >= i + 1
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
      case 'numeric5':
        return (
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setRating(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  rating >= i + 1
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
        isGuest ? `bg-${guestHighlight}-50` : 'bg-background'
      }`}
    >
      <BackToDashboard />
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-xl font-semibold text-center">
          {isGuest ? 'Cadastrar Jogador Convidado' : 'Cadastrar Jogador'}
        </h1>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <Label htmlFor="name" className="text-muted-foreground mb-2 block">Nome *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b border-primary/20 rounded-none px-0 focus-visible:ring-0"
              placeholder="Digite o nome do jogador"
              required
            />
          </div>

          <div>
            <Label htmlFor="nickname" className="text-muted-foreground mb-2 block">Apelido</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="border-b border-primary/20 rounded-none px-0 focus-visible:ring-0"
              placeholder="Digite o apelido do jogador"
            />
          </div>

          <div>
            <Label htmlFor="birthDate" className="text-muted-foreground mb-2 block">Data de Nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border-b border-primary/20 rounded-none px-0 focus-visible:ring-0"
            />
          </div>

          <div>
            <Label className="text-muted-foreground mb-4 block">Nível</Label>
            {renderRatingInput()}
          </div>

          <div>
            <Label className="text-muted-foreground mb-2 block">Modalidade</Label>
            <Select value={sport} onValueChange={(value) => setSport(value as Sport)}>
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
            <Label className="text-muted-foreground mb-2 block">Posições</Label>
            <div className="grid grid-cols-2 gap-4">
              {positions[sport].map((position) => (
                <div key={position} className="flex items-center space-x-2">
                  <Checkbox
                    id={position}
                    checked={selectedPositions.includes(position)}
                    onCheckedChange={(checked) => 
                      handlePositionChange(position, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={position}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
              checked={isGuest}
              onCheckedChange={(checked) => setIsGuest(checked as boolean)}
            />
            <label
              htmlFor="guest"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Jogador Convidado
            </label>
          </div>

          <div className="flex justify-end pt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
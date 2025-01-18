import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rating, setRating] = React.useState(0);
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [isGuest, setIsGuest] = React.useState(false);
  const [sport, setSport] = React.useState<Sport>("futsal");
  const [selectedPositions, setSelectedPositions] = React.useState<string[]>([]);

  const handleSave = () => {
    if (!name) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }
    // Save logic here
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

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${isGuest ? 'bg-orange-50' : 'bg-background'}`}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="text-foreground hover:text-primary transition-colors"
          >
            ←
          </button>
          <h1 className="text-xl font-semibold text-center flex-1">
            {isGuest ? 'Cadastrar Jogador Convidado' : 'Cadastrar Jogador'}
          </h1>
          <div className="flex gap-4">
            <Button onClick={handleSave} variant="ghost" size="icon">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3Z"/>
              </svg>
            </Button>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
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
            <div className="flex gap-2">
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
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
                        : rating + 0.5 === star
                        ? "fill-primary/50 text-primary"
                        : "fill-muted text-muted"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
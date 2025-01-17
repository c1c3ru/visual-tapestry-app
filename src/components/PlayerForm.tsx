import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlayerForm = () => {
  const navigate = useNavigate();
  const [rating, setRating] = React.useState(0);
  const [name, setName] = React.useState("");
  const [position, setPosition] = React.useState(false);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-foreground"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">
          Cadastrar Jogador
        </h1>
        <div className="flex gap-4">
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3Z"/>
            </svg>
          </button>
          <button>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-muted-foreground mb-2 block">Nome</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b border-primary/20 rounded-none px-0 focus-visible:ring-0"
            placeholder="Digite o nome do jogador"
          />
        </div>

        <div>
          <label className="text-muted-foreground mb-4 block">Nível</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
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
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="position"
            checked={position}
            onCheckedChange={(checked) => setPosition(checked as boolean)}
          />
          <label
            htmlFor="position"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Goleiro, Líbero, etc.
          </label>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
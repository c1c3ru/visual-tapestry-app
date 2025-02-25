
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SportEnum } from "@/utils/enums";
import { getSportIcon } from "@/utils/sportsIcons";

interface PlayerSportSelectionProps {
  sport: SportEnum;
  onSportChange: (value: SportEnum) => void;
}

export const PlayerSportSelection: React.FC<PlayerSportSelectionProps> = ({
  sport,
  onSportChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="sport">Esporte</Label>
      <Select value={sport} onValueChange={onSportChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o esporte" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(SportEnum).map((sportValue) => {
            const Icon = getSportIcon(sportValue);
            return (
              <SelectItem key={sportValue} value={sportValue}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{sportValue}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

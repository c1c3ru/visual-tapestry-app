import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayerPositions } from './PlayerPositions';

interface PlayerSportInfoProps {
  form: any;
}

export const PlayerSportInfo: React.FC<PlayerSportInfoProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="sport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Esporte</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um esporte" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="futsal">Futsal</SelectItem>
                <SelectItem value="futebol">Futebol</SelectItem>
                <SelectItem value="volei">Vôlei</SelectItem>
                <SelectItem value="basquete">Basquete</SelectItem>
                <SelectItem value="handbol">Handbol</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="selectedPositions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Posições</FormLabel>
            <FormControl>
              <PlayerPositions
                sport={form.watch("sport")}
                selectedPositions={field.value}
                onPositionChange={(position, checked) => {
                  const currentPositions = field.value || [];
                  if (checked) {
                    field.onChange([...currentPositions, position]);
                  } else {
                    field.onChange(currentPositions.filter((p: string) => p !== position));
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
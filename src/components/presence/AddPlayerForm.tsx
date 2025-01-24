import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Player, Rating } from "@/utils/types";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddPlayerFormProps {
  onAddPlayer: (player: Player) => void;
  players: Player[];
}

const formSchema = z.object({
  playerName: z.string().min(1, "O nome do jogador é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

export const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onAddPlayer, players }) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const newPlayerName = values.playerName.trim();
    
    if (!newPlayerName) {
      toast({
        title: "Erro",
        description: "O nome do jogador não pode estar vazio.",
        variant: "destructive",
      });
      return;
    }

    const playerExists = players.find(
      (player) => player.name.toLowerCase() === newPlayerName.toLowerCase()
    );

    if (playerExists) {
      toast({
        title: "Erro",
        description: "Jogador já está cadastrado.",
        variant: "destructive",
      });
      return;
    }

    const newPlayer: Player = {
      id: Date.now(),
      name: newPlayerName,
      nickname: "",
      birthDate: "",
      isGuest: false,
      sport: "",
      selectedPositions: [],
      rating: 1 as Rating,
      includeInDraw: false,
      createdAt: new Date().toISOString(),
      present: false,
      paid: false,
      registered: true,
      selected: false,
    };

    onAddPlayer(newPlayer);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="playerName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite o nome do novo jogador..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Adicionar Jogador</Button>
        </div>
      </form>
    </Form>
  );
};
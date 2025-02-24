import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Player, RatingEnum, SportEnum } from "@/utils/types";

interface AddPlayerFormProps {
  onAddPlayer: (player: Player) => Promise<void>;
  players: Player[];
}

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Loader2 } from 'lucide-react';

const formSchema = z.object({
  playerName: z.string().min(1, "O nome do jogador é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

export const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onAddPlayer, players }) => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormValues) => {
    try {
      const newPlayerName = values.playerName.trim();
      
      const playerExists = players.find(
        (player) => player.name.toLowerCase() === newPlayerName.toLowerCase()
      );

      if (playerExists) {
        toast({
          title: "Jogador Existente",
          description: "Este jogador já está cadastrado no sistema",
          variant: "destructive",
        });
        return;
      }

      const newPlayer: Player = {
        id: Date.now().toString(),
        name: values.playerName,
        nickname: "",
        birthDate: new Date().toISOString(),
        isGuest: false,
        sport: SportEnum.FOOTBALL,
        selectedPositions: [],
        rating: RatingEnum.ONE,
        includeInDraw: false,
        createdAt: new Date().toISOString(),
        present: false,
        paid: false,
        registered: true,
        selected: false,
      };

      await onAddPlayer(newPlayer);
      form.reset();
      
      toast({
        title: "Jogador Adicionado",
        description: `${newPlayerName} foi cadastrado com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao adicionar o jogador",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="playerName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <Input
                      {...field}
                      placeholder="Nome completo do jogador..."
                      className="pl-10 focus:ring-2 focus:ring-blue-200"
                      aria-invalid={!!form.formState.errors.playerName}
                      aria-describedby="playerName-error"
                    />
                    <UserPlus className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  </motion.div>
                </FormControl>

                <AnimatePresence>
                  {form.formState.errors.playerName && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      id="playerName-error"
                      className="flex items-center gap-2 mt-1 text-red-600 text-sm"
                      role="alert"
                    >
                      <span>⚠️</span>
                      {form.formState.errors.playerName.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormItem>
            )}
          />

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springConfig}
          >
            <Button 
              type="submit" 
              className="w-full gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {isLoading ? "Adicionando..." : "Cadastrar Jogador"}
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </Form>
  );
};

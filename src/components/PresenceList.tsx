
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Check, X, Plus, Download, Users, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { AddPlayerForm } from "./presence/AddPlayerForm";
import { PresenceListItem } from "./presence/PresenceListItem";
import { Player } from "@/utils/types";
import clsx from "clsx";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { generatePresencePDF } from "../utils/pdf";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { springConfig } from '../utils/animations';
import { PositionEnum, SportEnum, RatingEnum } from "@/utils/enums"; // Adjust the import path as necessary

const PresenceList = () => {
  const { players, updatePlayer, addPlayer } = usePlayerStore();
  const { guestHighlight } = useSettingsStore();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "present" | "absent">("all");
  const [isAdmin, setIsAdmin] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: pt,
  });

  const handleTogglePresence = (id: string) => {
    const player = players.find((p) => p.id === id);
    if (player) {
      updatePlayer(id, { present: !player.present });
      toast({
        title: player.present ? "Presença removida" : "Presença registrada",
        description: `${player.name} marcado como ${player.present ? "ausente" : "presente"
          }`,
      });
    }
  };

  const handleTogglePayment = (id: string) => {
    const player = players.find((p) => p.id === id);
    if (player) {
      updatePlayer(id, { paid: !player.paid });
      toast({
        title: player.paid ? "Pagamento removido" : "Pagamento registrado",
        description: `Pagamento de ${player.name} marcado como ${player.paid ? "pendente" : "realizado"
          }`,
      });
    }
  };

  const filteredPlayers = players
    .filter((player) => {
      if (filter === "present") return player.present;
      if (filter === "absent") return !player.present;
      return true;
    })
    .filter((player) =>
      player.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  const presentCount = players.filter((p) => p.present).length;
  const paidCount = players.filter((p) => p.present && p.paid).length;

  const handleGeneratePDF = () => {
    try {
      generatePresencePDF(formattedDate, filteredPlayers, presentCount, paidCount, isAdmin);
      toast({
        title: "Relatório gerado",
        description: "O PDF foi baixado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o relatório.",
        variant: "destructive",
      });
    }
  };

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    // Present players first
    if (a.present && !b.present) return -1;
    if (!a.present && b.present) return 1;
    // Then sort alphabetically
    return a.name.localeCompare(b.name);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig}
      className="min-h-screen"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              <span>Lista de Presença</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-md p-4 flex flex-col items-center">
                <div className="text-3xl font-bold text-blue-600">
                  {players.length}
                </div>
                <div className="text-sm text-blue-600">Total de Jogadores</div>
              </div>
              <div className="bg-green-50 rounded-md p-4 flex flex-col items-center">
                <div className="text-3xl font-bold text-green-600">
                  {presentCount}
                </div>
                <div className="text-sm text-green-600">Presentes</div>
              </div>
              <div className="bg-orange-50 rounded-md p-4 flex flex-col items-center">
                <div className="text-3xl font-bold text-orange-600">
                  {paidCount}
                </div>
                <div className="text-sm text-orange-600">Pagamentos</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("all")}
                  className={clsx({
                    "bg-blue-50 border-blue-200": filter === "all",
                  })}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Todos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("present")}
                  className={clsx({
                    "bg-green-50 border-green-200": filter === "present",
                  })}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Presentes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilter("absent")}
                  className={clsx({
                    "bg-red-50 border-red-200": filter === "absent",
                  })}
                >
                  <X className="mr-2 h-4 w-4" />
                  Ausentes
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {showAddForm ? "Cancelar" : "Adicionar"}
                </Button>
                <Button size="sm" onClick={handleGeneratePDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Gerar PDF
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  // Trecho corrigido do formulário de adição
                  <AddPlayerForm
                    onAddPlayer={async (name) => {
                      const newPlayer: Player = {
                        id: Date.now().toString(),
                        name,
                        nickname: "",
                        birthDate: new Date().toISOString(),
                        isGuest: true,
                        rating: RatingEnum.THREE,
                        sport: SportEnum.SOCCER,
                        selectedPositions: [PositionEnum.FORWARD],
                        present: true,
                        paid: false,
                        includeInDraw: true,
                        createdAt: new Date().toISOString(),
                        registered: true,
                        selected: false,
                      };

                      await Promise.resolve(addPlayer(newPlayer));
                      setShowAddForm(false);
                      toast({
                        title: "Jogador adicionado",
                        description: `${name} foi adicionado como presente`,
                      });
                    }}
                    onCancel={() => setShowAddForm(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Tabs defaultValue="player-view">
              <TabsList className="mb-4">
                <TabsTrigger value="player-view">Jogadores</TabsTrigger>
                <TabsTrigger value="admin-view">Administrador</TabsTrigger>
              </TabsList>
              <TabsContent value="player-view">
                <div className="space-y-2">
                  {sortedPlayers.map((player) => (
                    <PresenceListItem
                      key={player.id}
                      player={player}
                      isAdmin={false}
                      guestHighlight={guestHighlight}
                      onTogglePresence={handleTogglePresence}
                      onTogglePayment={handleTogglePayment}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="admin-view">
                <div className="space-y-2">
                  {sortedPlayers.map((player) => (
                    <PresenceListItem
                      key={player.id}
                      player={player}
                      isAdmin={true}
                      guestHighlight={guestHighlight}
                      onTogglePresence={handleTogglePresence}
                      onTogglePayment={handleTogglePayment}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default PresenceList;

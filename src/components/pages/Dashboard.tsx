import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, StarHalf, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard');
  const [selectedRatingSystem, setSelectedRatingSystem] = useState(() => 
    localStorage.getItem('ratingSystem') || 'stars'
  );
  const [guestHighlight, setGuestHighlight] = useState(() => 
    localStorage.getItem('guestHighlight') || 'orange'
  );
  
  const isAdmin = true;

  const handleTitleEdit = () => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem editar o título");
      return;
    }
    setIsEditing(true);
  };

  const handleTitleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Título atualizado com sucesso!");
  };

  const handleRatingSystemChange = (value: string) => {
    setSelectedRatingSystem(value);
    localStorage.setItem('ratingSystem', value);
    toast.success("Sistema de avaliação atualizado!");
  };

  const handleGuestHighlightChange = (value: string) => {
    setGuestHighlight(value);
    localStorage.setItem('guestHighlight', value);
    toast.success("Estilo de destaque para convidados atualizado!");
  };

  const menuItems = [
    { title: 'Cadastrar Jogador', route: '/player/new' },
    { title: 'Lista de Jogadores', route: '/players' },
    { title: 'Sorteio de Times', route: '/teams/draw' },
    { title: 'Lista de Presença', route: '/presence' },
    { title: 'Estatísticas', route: '/statistics' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {isEditing ? (
            <form onSubmit={handleTitleSave} className="flex gap-2">
              <input
                type="text"
                value={dashboardTitle}
                onChange={(e) => setDashboardTitle(e.target.value)}
                className="text-2xl font-bold bg-white border border-teal-200 rounded px-2 py-1"
                autoFocus
              />
              <Button type="submit" size="sm">Salvar</Button>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-gray-800">{dashboardTitle}</h1>
              {isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTitleEdit}
                  className="text-teal-600 hover:text-teal-700"
                >
                  <Edit2 className="h-5 w-5" />
                </motion.button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sistema de Avaliação</h2>
            <RadioGroup 
              defaultValue={selectedRatingSystem} 
              onValueChange={handleRatingSystemChange}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stars" id="stars" />
                <Label htmlFor="stars" className="flex items-center gap-2">
                  Estrelas
                  <div className="flex">
                    {[1,2,3,4,5].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary" />
                    ))}
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="halfStars" id="halfStars" />
                <Label htmlFor="halfStars" className="flex items-center gap-2">
                  Meia Estrela
                  <div className="flex">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <StarHalf className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="numeric10" id="numeric10" />
                <Label htmlFor="numeric10">
                  Escala 1-10
                  <div className="flex gap-1 text-sm">
                    <span className="text-red-500">1</span>
                    <span className="text-green-500">5</span>
                    <span className="text-blue-500">10</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="numeric5" id="numeric5" />
                <Label htmlFor="numeric5">
                  Escala 1-5
                  <div className="flex gap-1 text-sm">
                    <span className="text-red-500">1</span>
                    <span className="text-green-500">3</span>
                    <span className="text-blue-500">5</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Destaque para Convidados</h2>
            <Select onValueChange={handleGuestHighlightChange} defaultValue={guestHighlight}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o estilo de destaque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orange">Laranja</SelectItem>
                <SelectItem value="purple">Roxo</SelectItem>
                <SelectItem value="pink">Rosa</SelectItem>
                <SelectItem value="bold">Negrito</SelectItem>
                <SelectItem value="italic">Itálico</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Prévia:</p>
              <div className={`p-2 rounded ${
                guestHighlight === 'orange' ? 'bg-orange-100 text-orange-800' :
                guestHighlight === 'purple' ? 'bg-purple-100 text-purple-800' :
                guestHighlight === 'pink' ? 'bg-pink-100 text-pink-800' :
                guestHighlight === 'bold' ? 'font-bold' :
                guestHighlight === 'italic' ? 'italic' : ''
              }`}>
                Nome do Jogador Convidado
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <motion.div
              key={item.route}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={item.route}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <div className="h-1 w-20 bg-primary rounded-full" />
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import jsPDF from 'jspdf';
import { Group, KnockoutMatches, Player } from '@/utils/types';

// Corrigir a assinatura da função
export const generatePresencePDF = (
  eventName: string,
  date: string, // Alterado de Date para string
  players: Player[],
  presentCount: number,
  paidCount: number
) => {
  const doc = new jsPDF();
  const margin = 20;
  const lineSpacing = 10;

  // Adicionar cabeçalho
  doc.setFontSize(18);
  doc.text(eventName, margin, margin);
  doc.setFontSize(12);
  doc.text(`Data: ${date}`, margin, margin + lineSpacing);

  // Adicionar estatísticas
  doc.text(`Total de Presentes: ${presentCount}`, margin, margin + (3 * lineSpacing));
  doc.text(`Total de Pagamentos: ${paidCount}`, margin, margin + (4 * lineSpacing));

  // Adicionar lista de jogadores
  let yPosition = margin + (6 * lineSpacing);
  doc.text("Lista de Jogadores:", margin, yPosition);
  yPosition += lineSpacing;
  
  players.forEach((player) => {
    const presenceText = player.present ? '✅ Presente' : '❌ Ausente';
    const paymentText = player.paid ? '✔️ Pago' : '⚠️ Pendente';
    doc.text(`${player.name}: ${presenceText} - ${paymentText}`, margin, yPosition);
    yPosition += lineSpacing;
    
    // Quebra de página se necessário
    if (yPosition > 280) {
      doc.addPage();
      yPosition = margin;
    }
  });

  // Salvar o PDF
  doc.save(`relatorio_presenca_${date}.pdf`);
};

// Corrigir a chamada da função
const handleGeneratePDF = () => {
  const formattedDate = new Date().toLocaleDateString(); // Definir formattedDate
  const filteredPlayers: Player[] = []; // Definir filteredPlayers
  const presentCount = filteredPlayers.filter(player => player.present).length;
  const paidCount = filteredPlayers.filter(player => player.paid).length;
  try {
    generatePresencePDF(
      "Relatório de Presença", // Nome do evento fixo ou variável
      formattedDate,           // Data formatada como string
      filteredPlayers, 
      presentCount, 
      paidCount
    );
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

export const generateTournamentPDF = (
  tournamentName: string,
  groups: Group[],
  knockoutMatches?: KnockoutMatches
) => {
  const doc = new jsPDF();
  const margin = 20;
  const lineSpacing = 10;

  doc.text(`Torneio: ${tournamentName}`, margin, margin + lineSpacing);

  let yPosition = margin + (2 * lineSpacing);
  groups.forEach((group) => {
    doc.text(`${group.name}`, margin, yPosition);
    yPosition += lineSpacing;

    group.matches.forEach((match) => {
      doc.text(`${match.team1.name} vs ${match.team2.name}`, margin + lineSpacing, yPosition);
      yPosition += lineSpacing;
    });

    yPosition += lineSpacing;
  });

  if (knockoutMatches) {
    doc.text('Fase Eliminatória', margin, yPosition);
    yPosition += lineSpacing;

    Object.keys(knockoutMatches).forEach((round) => {
      doc.text(`${round.charAt(0).toUpperCase() + round.slice(1)}`, margin, yPosition);
      yPosition += lineSpacing;
      knockoutMatches[round].forEach((match) => {
        doc.text(`${match.team1.name} vs ${match.team2.name}`, margin + lineSpacing, yPosition);
        yPosition += lineSpacing;
      });
    });
  }

  doc.save(`${tournamentName}campeonato.pdf`);
};
function toast(arg0: { title: string; description: string; variant?: string; }) {
  throw new Error('Function not implemented.');
}


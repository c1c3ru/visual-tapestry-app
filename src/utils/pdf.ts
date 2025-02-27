
import jsPDF from 'jspdf';
import { Group, KnockoutMatches, Player } from '@/utils/types';

export const generatePresencePDF = (
  players: Player[],
  formattedDate: string,
  presentCount: number,
  paidCount: number
) => {
  const doc = new jsPDF();
  const margin = 20;
  const lineSpacing = 10;

  doc.text(`Evento: Lista de Presença`, margin, margin + lineSpacing);
  doc.text(`Data: ${formattedDate}`, margin, margin + (2 * lineSpacing));
  doc.text(`Total de Presentes: ${presentCount}`, margin, margin + (3 * lineSpacing));
  doc.text(`Total de Pagamentos: ${paidCount}`, margin, margin + (4 * lineSpacing));

  let yPosition = margin + (6 * lineSpacing);
  players.forEach((player) => {
    const presenceText = player.present ? 'Presente' : 'Ausente';
    const paymentText = player.paid ? 'Pago' : 'Não pago';
    doc.text(`${player.name}: ${presenceText} - ${paymentText}`, margin, yPosition);
    yPosition += lineSpacing;
  });

  doc.save(`lista_presenca_${new Date().toISOString().slice(0,10)}.pdf`);
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

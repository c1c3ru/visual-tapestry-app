import jsPDF from 'jspdf';
import { Group, KnockoutMatches } from '@/types/types';

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
      doc.text(`${match.team1} vs ${match.team2}`, margin + lineSpacing, yPosition);
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
        doc.text(`${match.team1} vs ${match.team2}`, margin + lineSpacing, yPosition);
        yPosition += lineSpacing;
      });
    });
  }

  doc.save(`${tournamentName}campeonato.pdf`);
};
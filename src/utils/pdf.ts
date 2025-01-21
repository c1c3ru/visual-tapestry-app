import jsPDF from 'jspdf';
import { Group, KnockoutMatches } from './types';

export const generateTournamentPDF = (
  tournamentName: string,
  groups: Group[],
  knockoutMatches?: KnockoutMatches
) => {
  const doc = new jsPDF();
  let yPosition = 20;
  const margin = 20;
  const lineHeight = 10;

  // Título
  doc.setFontSize(24);
  doc.setTextColor(33, 33, 33);
  doc.text(tournamentName, margin, yPosition);
  yPosition += lineHeight * 2;

  // Data e Hora
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, margin, yPosition);
  yPosition += lineHeight * 2;

  // Fase de Grupos
  if (groups.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(33, 33, 33);
    doc.text('Fase de Grupos', margin, yPosition);
    yPosition += lineHeight * 1.5;

    groups.forEach((group) => {
      doc.setFontSize(14);
      doc.setTextColor(66, 66, 66);
      doc.text(group.name, margin, yPosition);
      yPosition += lineHeight;

      group.matches.forEach((match) => {
        doc.setFontSize(12);
        doc.setTextColor(33, 33, 33);
        const matchText = `${match.team1.name} vs ${match.team2.name}`;
        doc.text(matchText, margin + 5, yPosition);
        yPosition += lineHeight;
      });

      yPosition += lineHeight / 2;
    });
  }

  // Fase Eliminatória
  if (knockoutMatches) {
    yPosition += lineHeight;
    doc.setFontSize(16);
    doc.setTextColor(33, 33, 33);
    doc.text('Fase Eliminatória', margin, yPosition);
    yPosition += lineHeight * 1.5;

    // Oitavas de Final
    if (knockoutMatches.roundOf16.length > 0) {
      doc.setFontSize(14);
      doc.text('Oitavas de Final', margin, yPosition);
      yPosition += lineHeight;

      knockoutMatches.roundOf16.forEach((match) => {
        doc.setFontSize(12);
        const matchText = `${match.team1.name} vs ${match.team2.name}`;
        doc.text(matchText, margin + 5, yPosition);
        yPosition += lineHeight;
      });
    }

    // Quartas de Final
    if (knockoutMatches.quarterFinals.length > 0) {
      yPosition += lineHeight;
      doc.setFontSize(14);
      doc.text('Quartas de Final', margin, yPosition);
      yPosition += lineHeight;

      knockoutMatches.quarterFinals.forEach((match) => {
        doc.setFontSize(12);
        const matchText = `${match.team1.name} vs ${match.team2.name}`;
        doc.text(matchText, margin + 5, yPosition);
        yPosition += lineHeight;
      });
    }

    // Semi Finais
    if (knockoutMatches.semiFinals.length > 0) {
      yPosition += lineHeight;
      doc.setFontSize(14);
      doc.text('Semi Finais', margin, yPosition);
      yPosition += lineHeight;

      knockoutMatches.semiFinals.forEach((match) => {
        doc.setFontSize(12);
        const matchText = `${match.team1.name} vs ${match.team2.name}`;
        doc.text(matchText, margin + 5, yPosition);
        yPosition += lineHeight;
      });
    }

    // Final
    if (knockoutMatches.final) {
      yPosition += lineHeight;
      doc.setFontSize(14);
      doc.text('Final', margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(12);
      const finalText = `${knockoutMatches.final.team1.name} vs ${knockoutMatches.final.team2.name}`;
      doc.text(finalText, margin + 5, yPosition);
    }
  }

  doc.save(`${tournamentName.toLowerCase().replace(/\s+/g, '-')}-torneio.pdf`);
};
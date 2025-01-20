import jsPDF from 'jspdf';
import { Group, KnockoutMatches } from '@/components/tournament/types';

export const generateTournamentPDF = (
  tournamentName: string,
  groups: Group[],
  knockoutMatches?: KnockoutMatches
) => {
  const doc = new jsPDF();
  doc.text(`Tournament: ${tournamentName}`, 20, 20);
  
  let yPosition = 40;
  groups.forEach((group) => {
    doc.text(`${group.name}`, 20, yPosition);
    yPosition += 10;
    
    group.matches.forEach((match) => {
      doc.text(`${match.team1} vs ${match.team2}`, 30, yPosition);
      yPosition += 10;
    });
    
    yPosition += 10;
  });

  if (knockoutMatches) {
    doc.text('Knockout Stage', 20, yPosition);
    yPosition += 10;
    
    doc.text('Round of 16', 20, yPosition);
    yPosition += 10;
    knockoutMatches.roundOf16.forEach((match) => {
      doc.text(`${match.team1} vs ${match.team2}`, 30, yPosition);
      yPosition += 10;
    });
  }

  doc.save(`${tournamentName}-tournament.pdf`);
};
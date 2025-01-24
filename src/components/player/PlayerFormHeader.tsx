import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface PlayerFormHeaderProps {
  title: string;
}

export const PlayerFormHeader: React.FC<PlayerFormHeaderProps> = ({ title }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
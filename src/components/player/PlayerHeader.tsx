
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import BackToDashboard from "../BackToDashboard";
import { motion } from "framer-motion";

export const PlayerHeader = () => {
  return (
    <div className="mb-6">
      <BackToDashboard />
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Novo Jogador</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

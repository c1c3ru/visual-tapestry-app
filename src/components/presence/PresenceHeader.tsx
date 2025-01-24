import React from 'react';
import { DynamicTitle } from '../DynamicTitle';
import { BackToDashboard } from '../BackToDashboard';

export const PresenceHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <BackToDashboard />
      <DynamicTitle />
    </div>
  );
};
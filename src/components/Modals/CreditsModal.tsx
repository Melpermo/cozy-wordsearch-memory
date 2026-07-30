import React from 'react';
import { InfoModal, type InfoModalProps } from './InfoModal';

export const CreditsModal: React.FC<InfoModalProps> = (props) => {
  return <InfoModal {...props} defaultTab="credits" />;
};

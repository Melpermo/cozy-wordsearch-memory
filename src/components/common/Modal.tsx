import React, { useEffect } from 'react';
import { Card } from './Card';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent scrolling under the modal when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cozy-bg/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md z-10 animate-pop-in">
        <Card className="relative overflow-hidden">
          {title && (
            <div className="flex items-center justify-between mb-4 border-b border-cozy-tile/30 pb-3">
              <h3 className="text-xl font-bold text-cozy-text">{title}</h3>
              <button
                onClick={onClose}
                className="text-cozy-muted hover:text-cozy-text p-1 rounded-full hover:bg-cozy-tile transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-cozy-muted hover:text-cozy-text p-1 rounded-full hover:bg-cozy-tile transition-colors z-15"
            >
              <X size={20} />
            </button>
          )}
          <div>{children}</div>
        </Card>
      </div>
    </div>
  );
};

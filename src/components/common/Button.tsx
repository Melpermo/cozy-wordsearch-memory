import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-tile select-none transition-all duration-150 outline-none focus:ring-4 focus:ring-cozy-mint/20 cursor-pointer active:translate-y-0.5 active:shadow-none';
  
  const variantStyles = {
    primary: 'bg-cozy-mint text-white border-2 border-cozy-mint-dark/40 shadow-tactile hover:bg-cozy-mint-dark',
    secondary: 'bg-cozy-tile text-cozy-text border-2 border-cozy-tile-shadow/30 shadow-tactile hover:brightness-95',
    accent: 'bg-cozy-honey text-cozy-text border-2 border-cozy-honey-dark/40 shadow-tactile hover:bg-cozy-honey-dark',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset"; // ✅ Tambahkan ini
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant, 
  size = 'md', 
  onClick, 
  fullWidth = false,
  icon,
  disabled = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg"
  };

  const baseStyle = `
    ${sizeClasses[size]} 
    rounded-full 
    transition 
    font-bold 
    flex 
    items-center 
    justify-center 
    gap-2
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'transform hover:scale-[1.03] active:scale-[0.98]'}
  `;

  const styles = {
    primary: `${baseStyle} bg-[#8B5CF6] text-white hover:bg-[#7A3FD6] shadow-md hover:shadow-lg`,
    secondary: `${baseStyle} border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#EDE7FF]`,
    outline: `${baseStyle} border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#F8ECFF]`,
    danger: `${baseStyle} bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg`,
    success: `${baseStyle} bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg`
  };

  return (
    <button 
      className={`${styles[variant]} ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
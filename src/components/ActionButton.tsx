import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  buttonType?: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  disabled,
  buttonType = 'primary',
}) => {
  const buttonStyles = {
    primary: 'bg-gradient-to-r from-orange-400 to-pink-500',
    secondary: 'bg-gradient-to-r from-teal-400 to-blue-500',
  };

  const hoverGradients = {
    primary: 'from-orange-500 to-pink-600',
    secondary: 'from-teal-500 to-blue-600',
  };

  return (
    <Button
      onClick={disabled ? undefined : onClick}
      className={`group relative overflow-hidden ${buttonStyles[buttonType]} text-white shadow-md transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={disabled}
    >
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{label}</span>
      <div
        className={`absolute inset-0 bg-gradient-to-r ${hoverGradients[buttonType]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
    </Button>
  );
};

export default ActionButton;

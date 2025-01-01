import { Button } from '@/components/ui/button';

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
  disabled,
}) => {
  return (
    <Button
      onClick={disabled ? undefined : onClick}
      className={`group relative overflow-hidden bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={disabled}
    >
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  );
};

export default ActionButton;

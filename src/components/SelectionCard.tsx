import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SelectionCardProps {
  icon?: string | React.ReactNode;
  title: string;
  subtitle?: string;
  isSelected?: boolean;
  onClick: () => void;
  delay?: number;
}

export const SelectionCard = ({
  icon,
  title,
  subtitle,
  isSelected,
  onClick,
  delay = 0,
}: SelectionCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative w-full p-6 rounded-xl text-left transition-all duration-300',
        'bg-card border-2 hover:border-primary/50',
        isSelected
          ? 'border-primary glow-primary bg-primary/10'
          : 'border-border hover:bg-card/80'
      )}
    >
      {/* Glow effect on selection */}
      {isSelected && (
        <motion.div
          layoutId="selection-glow"
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        {icon && (
          <div
            className={cn(
              'flex items-center justify-center transition-transform duration-300',
              isSelected && 'scale-110'
            )}
          >
            {typeof icon === 'string' ? (
              <span className="text-3xl sm:text-4xl">{icon}</span>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 text-primary">
                {icon}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-semibold text-lg transition-colors',
              isSelected ? 'text-primary' : 'text-foreground'
            )}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 truncate">{subtitle}</p>
          )}
        </div>

        {/* Check indicator */}
        <div
          className={cn(
            'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
            isSelected
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/30'
          )}
        >
          {isSelected && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </div>
      </div>
    </motion.button>
  );
};

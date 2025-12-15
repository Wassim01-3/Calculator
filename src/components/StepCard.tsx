import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const StepCard = ({ title, subtitle, children, className }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'w-full max-w-2xl mx-auto',
        className
      )}
    >
      <div className="glass rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-gradient-primary"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
};

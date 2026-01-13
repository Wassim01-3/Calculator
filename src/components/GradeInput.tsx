import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GradeInputProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  className?: string;
}

export const GradeInput = ({ label, value, onChange, className }: GradeInputProps) => {
  const [inputValue, setInputValue] = useState(value !== undefined ? String(value) : '');

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(String(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Normalize comma to dot
    val = val.replace(',', '.');

    // Allow empty string for clearing
    if (val === '') {
      setInputValue('');
      return;
    }

    // Validate: only allow numbers and one decimal point
    if (!/^\d*\.?\d*$/.test(val)) return;

    setInputValue(val);
  };

  const handleBlur = () => {
    let parsed = parseFloat(inputValue);
    if (isNaN(parsed) || inputValue === '') {
      parsed = 0;
    }
    // Clamp between 0 and 20
    parsed = Math.max(0, Math.min(20, parsed));
    // Round to 2 decimal places
    parsed = Math.round(parsed * 100) / 100;
    setInputValue(String(parsed));
    onChange(parsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const numericValue = parseFloat(inputValue) || 0;

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'border-success text-success';
    if (grade >= 14) return 'border-primary text-primary';
    if (grade >= 12) return 'border-secondary text-secondary';
    if (grade >= 10) return 'border-warning text-warning';
    return 'border-destructive text-destructive';
  };

  const getBackgroundGlow = (grade: number) => {
    if (grade >= 10) return 'shadow-[0_0_20px_hsl(150,100%,45%,0.2)]';
    if (inputValue !== '') return 'shadow-[0_0_20px_hsl(0,84%,60%,0.2)]';
    return '';
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="0.00"
          className={cn(
            'w-full px-4 py-4 text-center text-2xl font-bold rounded-xl',
            'bg-muted/50 border-2 transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
            'placeholder:text-muted-foreground/30',
            inputValue !== '' ? getGradeColor(numericValue) : 'border-border text-foreground',
            inputValue !== '' && getBackgroundGlow(numericValue),
            'focus:ring-primary'
          )}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          /20
        </div>
      </div>
      {/* Visual feedback bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 rounded-full',
            numericValue >= 10 ? 'bg-success' : 'bg-destructive'
          )}
          style={{ width: `${(numericValue / 20) * 100}%` }}
        />
      </div>
    </div>
  );
};

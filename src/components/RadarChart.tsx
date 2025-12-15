import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RadarChartProps {
  data: { name: string; value: number; coefficient: number }[];
  maxValue?: number;
}

export const RadarChart = ({ data, maxValue = 20 }: RadarChartProps) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;
  const levels = 4;

  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length;
    return data.map((item, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const normalizedValue = item.value / maxValue;
      return {
        x: center + radius * normalizedValue * Math.cos(angle),
        y: center + radius * normalizedValue * Math.sin(angle),
        labelX: center + (radius + 40) * Math.cos(angle),
        labelY: center + (radius + 40) * Math.sin(angle),
        angle,
        ...item,
      };
    });
  }, [data, center, radius, maxValue]);

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ') + ' Z';

  // Grid lines
  const gridLines = useMemo(() => {
    const lines = [];
    const angleStep = (2 * Math.PI) / data.length;
    
    for (let i = 0; i < data.length; i++) {
      const angle = angleStep * i - Math.PI / 2;
      lines.push({
        x1: center,
        y1: center,
        x2: center + radius * Math.cos(angle),
        y2: center + radius * Math.sin(angle),
      });
    }
    return lines;
  }, [data.length, center, radius]);

  // Concentric circles for levels
  const levelCircles = useMemo(() => {
    return Array.from({ length: levels }, (_, i) => ({
      r: (radius / levels) * (i + 1),
    }));
  }, [levels, radius]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        {/* Level circles */}
        {levelCircles.map((circle, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={circle.r}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Center point value labels */}
        {levelCircles.map((circle, i) => (
          <text
            key={i}
            x={center}
            y={center - circle.r - 2}
            fill="hsl(var(--muted-foreground))"
            fontSize="10"
            textAnchor="middle"
          >
            {((i + 1) * (maxValue / levels)).toFixed(0)}
          </text>
        ))}

        {/* Data polygon with gradient fill */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(185, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(260, 80%, 60%)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <motion.path
          d={pathData}
          fill="url(#radarGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="6"
            fill={point.value >= 10 ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
            stroke="hsl(var(--background))"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
          />
        ))}

        {/* Labels */}
        {points.map((point, i) => (
          <motion.text
            key={i}
            x={point.labelX}
            y={point.labelY}
            fill="hsl(var(--foreground))"
            fontSize="9"
            textAnchor="middle"
            dominantBaseline="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.03 }}
            className="font-medium"
          >
            {point.name.length > 15 ? point.name.substring(0, 12) + '...' : point.name}
          </motion.text>
        ))}
      </svg>

      {/* Legend showing pass/fail */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">≥ 10 (Admis)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-muted-foreground">&lt; 10 (Ajourné)</span>
        </div>
      </div>
    </div>
  );
};

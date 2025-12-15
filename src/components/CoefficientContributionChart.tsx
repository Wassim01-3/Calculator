import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CoefficientContributionChartProps {
  data: { name: string; value: number; coefficient: number }[];
  generalAverage: number;
}

export const CoefficientContributionChart = ({ data, generalAverage }: CoefficientContributionChartProps) => {
  const chartData = useMemo(() => {
    const totalCoefficient = data.reduce((sum, item) => sum + item.coefficient, 0);
    
    return data
      .map((item) => {
        const contribution = (item.value * item.coefficient) / totalCoefficient;
        const percentage = totalCoefficient > 0 ? ((item.coefficient / totalCoefficient) * 100).toFixed(1) : '0';
        
        return {
          name: item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name,
          fullName: item.name,
          contribution: Number(contribution.toFixed(2)),
          coefficient: item.coefficient,
          percentage: `${percentage}%`,
          status: item.value >= 10 ? 'passed' : 'failed',
        };
      })
      .sort((a, b) => b.contribution - a.contribution);
  }, [data]);

  const chartConfig = {
    contribution: {
      label: 'Contribution',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            stroke="hsl(var(--border))"
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            stroke="hsl(var(--border))"
            label={{ value: 'Contribution à la moyenne', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) return null;
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-background p-3 shadow-lg">
                  <div className="font-semibold mb-1">{data.fullName}</div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Contribution:</span>
                      <span className="font-bold">{data.contribution.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Coefficient:</span>
                      <span className="font-medium">{data.coefficient} ({data.percentage})</span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Bar dataKey="contribution" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.status === 'passed' ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};


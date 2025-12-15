import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

interface PassFailDonutChartProps {
  data: { name: string; value: number; coefficient: number }[];
}

export const PassFailDonutChart = ({ data }: PassFailDonutChartProps) => {
  const chartData = useMemo(() => {
    const passed = data.filter((item) => item.value >= 10).length;
    const failed = data.filter((item) => item.value < 10).length;
    
    return [
      { name: 'Admis', value: passed, color: 'hsl(var(--success))' },
      { name: 'Ajourné', value: failed, color: 'hsl(var(--destructive))' },
    ];
  }, [data]);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const passedPercentage = total > 0 ? ((chartData[0].value / total) * 100).toFixed(1) : '0';

  const chartConfig = {
    passed: {
      label: 'Admis',
      color: 'hsl(var(--success))',
    },
    failed: {
      label: 'Ajourné',
      color: 'hsl(var(--destructive))',
    },
  };

  return (
    <div className="w-full relative">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload[0]) return null;
                const data = payload[0];
                const percentage = total > 0 ? ((data.value as number / total) * 100).toFixed(1) : '0';
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-lg">
                    <div className="font-semibold mb-1">{data.name}</div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Nombre:</span>
                        <span className="font-bold">{data.value}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Pourcentage:</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-4xl font-bold text-foreground">{passedPercentage}%</div>
        <div className="text-sm text-muted-foreground mt-1">Admis</div>
      </div>
    </div>
  );
};


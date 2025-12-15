import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';

interface SubjectBarChartProps {
  data: { name: string; value: number; coefficient: number }[];
}

export const SubjectBarChart = ({ data }: SubjectBarChartProps) => {
  const chartData = useMemo(() => {
    return data
      .map((item) => ({
        name: item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name,
        fullName: item.name,
        average: Number(item.value.toFixed(2)),
        coefficient: item.coefficient,
        status: item.value >= 10 ? 'passed' : 'failed',
      }))
      .sort((a, b) => b.average - a.average);
  }, [data]);

  const chartConfig = {
    average: {
      label: 'Moyenne',
      color: 'hsl(var(--primary))',
    },
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
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            type="number"
            domain={[0, 20]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            stroke="hsl(var(--border))"
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            stroke="hsl(var(--border))"
            width={120}
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
                      <span className="text-muted-foreground">Moyenne:</span>
                      <span className={cn(
                        'font-bold',
                        data.average >= 10 ? 'text-success' : 'text-destructive'
                      )}>
                        {data.average.toFixed(2)}/20
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Coefficient:</span>
                      <span className="font-medium">{data.coefficient}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Statut:</span>
                      <span className={cn(
                        'font-medium',
                        data.average >= 10 ? 'text-success' : 'text-destructive'
                      )}>
                        {data.average >= 10 ? 'Admis' : 'Ajourné'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Bar
            dataKey="average"
            fill="hsl(var(--primary))"
            radius={[0, 4, 4, 0]}
          >
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


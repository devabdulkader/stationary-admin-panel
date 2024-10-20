import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  categoryName: string;
  stockQuantity: number;
}

interface CardProps {
  title: string;
  data: ChartData[];
}

const LowStock2: React.FC<CardProps> = ({ title, data }) => {
  // Function to dynamically set bar color based on stock quantity
  const getBarColor = (value: number) => {
    if (value > 0 && value <= 2) return '#D60D0D'; // Red for low stock
    if (value > 2 && value <= 5) return '#808EFF'; // Blue for medium stock
    return '#808EFF'; // Default color
  };

  // Y-axis tick formatter
  const formatYAxisTicks = (tick: number) => `${tick} unit`;

  // Y-axis ticks generation
  const getYTicks = (data: ChartData[]) => {
    const maxValue = Math.max(
      ...(data?.map((item) => item.stockQuantity) || []),
    );
    const ticks = [];

    for (let i = 0; i <= maxValue; i += 10) {
      ticks.push(i);
    }

    if (ticks.length > 4) {
      const step = Math.ceil(ticks.length / 4);
      return ticks.filter((_, index) => index % step === 0);
    }

    return ticks;
  };

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{title}</span>
      </div>

      <div className="h-[400px] overflow-x-auto p-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={10}
          >
            <XAxis
              dataKey="categoryName"
              scale="point"
              padding={{ left: 50, right: 50 }}
            />
            <YAxis
              domain={[0, 'dataMax+10']}
              ticks={getYTicks(data)}
              tickFormatter={formatYAxisTicks}
            />
            <Tooltip />

            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="stockQuantity"
              fill="#8884d8"
              background={{ fill: '#eee' }}
              shape={(props: any) => {
                const { x, y, width, height, value } = props;
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx={5}
                    ry={5}
                    fill={getBarColor(value)}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LowStock2;

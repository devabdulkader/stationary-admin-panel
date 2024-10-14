import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FC } from 'react';

interface CardData {
  title: string;
}

interface ChartData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
  sales: number;
}

interface CardProps {
  data: CardData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; fill: string; payload: ChartData }[];
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const customLabels: Record<string, string> = {
      uv: 'All Categories',
      pv: 'Art Supplies',
      amt: 'Paper Product',
      sales: 'Notebook & Diaries',
    };

    return (
      <div className="rounded-lg border border-gray-300 bg-white p-3 shadow-md">
        <p>{`Day: ${payload[0].payload.name}`}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.fill }}>
            {`${customLabels[entry.name]}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const CustomLegend: FC = () => {
  const legendData = [
    { label: 'All Categories', color: '#00359E' },
    { label: 'Art Supplies', color: '#FFA0A0' },
    { label: 'Paper Product', color: '#EDE6AD' },
    { label: 'Notebook & Diaries', color: '#93AAFD' },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {legendData.map((item) => (
        <div key={item.label} className="flex items-center space-x-2">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          ></span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const ProductPerformance: React.FC<CardProps> = ({ data }) => {
  const chartData: ChartData[] = [
    {
      name: 'MON',
      uv: 4000,
      pv: 2400,
      amt: 2400,
      sales: 3200,
    },
    {
      name: 'TUE',
      uv: 3000,
      pv: 1398,
      amt: 2210,
      sales: 2800,
    },
    {
      name: 'WED',
      uv: 2000,
      pv: 9800,
      amt: 2290,
      sales: 3500,
    },
    {
      name: 'THU',
      uv: 2780,
      pv: 3908,
      amt: 2000,
      sales: 3100,
    },
    {
      name: 'FRI',
      uv: 1890,
      pv: 4800,
      amt: 2181,
      sales: 2600,
    },
    {
      name: 'SAT',
      uv: 2390,
      pv: 3800,
      amt: 2500,
      sales: 3300,
    },
  ];

  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 font-semibold">
        <span>{data.title}</span>
        <div className="relative space-x-3">
          <button>Daily</button>
          <button>Weekly</button>
          <button>Monthly</button>
        </div>
      </div>

      <div className="flex p-5">
        <div className="h-[400px] w-3/4 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1000) return `${value / 1000}k`;
                  return value;
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="uv" fill="#00359E" radius={[10, 10, 0, 0]} />
              <Bar dataKey="pv" fill="#FFA0A0" radius={[10, 10, 0, 0]} />
              <Bar dataKey="amt" fill="#EDE6AD" radius={[10, 10, 0, 0]} />
              <Bar dataKey="sales" fill="#93AAFD" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex w-1/4 items-center justify-center">
          <CustomLegend />
        </div>
      </div>
    </div>
  );
};

export default ProductPerformance;

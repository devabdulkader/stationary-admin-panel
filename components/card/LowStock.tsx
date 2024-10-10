import DatePicker from 'react-datepicker';
import { IoChevronDownSharp } from 'react-icons/io5';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CardData {
  title: string;
}

interface ChartData {
  name: string;
  uv: number;
  pv: number;
}

interface CardProps {
  data: CardData;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const LowStock: React.FC<CardProps> = ({ data, startDate, setStartDate }) => {
  const chartData: ChartData[] = [
    { name: 'Pen', uv: 15, pv: 3 },
    { name: 'Notebook', uv: 30, pv: 5 },
    { name: 'Colors', uv: 120, pv: 100 },
    { name: 'Games', uv: 5, pv: 0 },
    { name: 'Office', uv: 12, pv: 2 },
    { name: 'Schools', uv: 8, pv: 3 },
    { name: 'Artist', uv: 10, pv: 2 },
    { name: 'Markers', uv: 25, pv: 4 },
    { name: 'Papers', uv: 35, pv: 10 },
    { name: 'Erasers', uv: 180, pv: 6 },
  ];

  const getBarColor = (value: number) => {
    if (value > 0 && value <= 2) return '#D60D0D';
    if (value > 2 && value <= 5) return '#808EFF';
    return '#808EFF';
  };

  const formatYAxisTicks = (tick: number) => `${tick} unit`;

  const getYTicks = (data: ChartData[]) => {
    const maxValue = Math.max(...data.map((item) => item.pv));
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
        <span>{data.title}</span>
        <div className="relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMM yyyy"
            showPopperArrow={false}
            showMonthYearPicker
            customInput={
              <button className="flex items-center justify-between bg-white py-2 font-semibold text-gray-700">
                {startDate?.toLocaleString('default', {
                  month: 'short',
                  year: 'numeric',
                })}
                <IoChevronDownSharp className="ml-2" />
              </button>
            }
            popperClassName="custom-datepicker"
          />
        </div>
      </div>

      <div className="h-[400px] overflow-x-auto p-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={10}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 50, right: 50 }}
            />
            <YAxis
              domain={[0, 'dataMax+10']}
              ticks={getYTicks(chartData)}
              tickFormatter={formatYAxisTicks}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              background={{ fill: '#eee' }}
              shape={(props: any) => {
                const { x, y, width, height } = props;
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx={5}
                    ry={5}
                    fill={getBarColor(props.value)}
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

export default LowStock;

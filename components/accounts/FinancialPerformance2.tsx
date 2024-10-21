'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface FinancialData {
  year: number;
  profit: number;
  loss: number;
}

interface FinancialPerformanceProps {
  data: FinancialData[] | null;
}

const FinancialPerformance2: React.FC<FinancialPerformanceProps> = ({
  data,
}) => {
  return (
    <div className="h-full rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>Financial Performance</span>
      </div>

      <div className="flex p-5">
        <div className="h-[250px] flex-1 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data || []}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="loss" fill="#8884d8" />
              <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend Section */}
        <div className="flex flex-col justify-center px-5">
          <div className="mb-2 flex items-center">
            <span className="mr-1 h-3 w-3 rounded-full bg-[#8884d8]"></span>
            <span className="text-sm">Loss</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 h-3 w-3 rounded-full bg-[#82ca9d]"></span>
            <span className="text-sm">Profit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPerformance2;

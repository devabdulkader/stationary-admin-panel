'use client';

import { BsPlusLg } from 'react-icons/bs';
import { RiSearchLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithIcon from '@/components/button/ButtonWithIcon';

const Accounts: React.FC = () => {
  // const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className="min-h-screen bg-gray-100 p-5 sm:px-10 2xl:px-20">
      <header className="flex items-center gap-4">
        <h1 className="pr-10 text-4xl text-blue-600">Accounts</h1>

        {/* Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border bg-white px-10 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
            <RiSearchLine className="text-gray-600" />
          </span>
        </div>

        {/* Button Section */}
        <div className="flex gap-4">
          <ButtonWithIcon icon={<BsPlusLg />} text="Generate Report" />
          <ButtonWithIcon icon={<BsPlusLg />} text="Entry Expense" />
        </div>
      </header>
      <main className="mt-5 grid grid-cols-12 gap-5">
        <section className="col-span-12 space-y-5"></section>
      </main>
    </div>
  );
};

export default Accounts;

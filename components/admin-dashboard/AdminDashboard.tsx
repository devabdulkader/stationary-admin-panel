'use client';
import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { CgShutterstock } from 'react-icons/cg';
import { IoChevronDownSharp } from 'react-icons/io5';
import { PiFire } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithIcon from '../button/ButtonWithIcon';
import DataOverviewCard from '../card/DataOverviewCard';
import LowStock from '../card/LowStock';
import DeadStock from '../card/DeadStock';
import StockLevel from '../card/StockLevel';
import FadeUp from '../motion/FadeUp';

interface CardData {
  title: string;
  value: number;
  percentageChange: number;
}

const AdminDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const inventoryData: CardData = {
    title: 'Inventory Value',
    value: 3540400,
    percentageChange: 23.04,
  };
  const revenueData: CardData = {
    title: 'Revenue',
    value: 3540400,
    percentageChange: 23.04,
  };

  const invoiceData: CardData = {
    title: 'Invoice',
    value: 3540400,
    percentageChange: -23.04,
  };

  const stockHistoryData: CardData = {
    title: 'Stock History',
    value: 3540400,
    percentageChange: 23.04,
  };
  const lowStockData = {
    title: 'Low Stock',
    value: 3540400,
    percentageChange: 23.04,
  };

  const deadStockData = {
    title: 'Dead Stock Products',
    products: [
      { productName: 'Pen', daysUnsold: 15 },
      { productName: 'Notebook', daysUnsold: 10 },
      { productName: 'Colors', daysUnsold: 5 },
    ],
  };
  const stockLevelData = {
    title: 'Stock Level Overview',
    products: [
      {
        productName: 'Pen',
        sku: 'PEN001',
        category: 'Stationery',
        quantity: 150,
        stockStatus: 'In Stock',
        action: 'Reorder',
      },
      {
        productName: 'Notebook',
        sku: 'NTBK002',
        category: 'Stationery',
        quantity: 10,
        stockStatus: 'Low Stock',
        action: 'Order Now',
      },
      {
        productName: 'Markers',
        sku: 'MRK003',
        category: 'Art Supplies',
        quantity: 0,
        stockStatus: 'Out of Stock',
        action: 'Restock',
      },
      {
        productName: 'Sketchbook',
        sku: 'SKBK004',
        category: 'Art Supplies',
        quantity: 50,
        stockStatus: 'In Stock',
        action: 'Reorder',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 sm:px-10 2xl:px-20">
      <header className="flex items-center gap-4">
        <h1 className="text-4xl text-blue-600">Inventory</h1>

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
          <ButtonWithIcon icon={<BsPlusLg />} text="Add New Product" />
          <ButtonWithIcon icon={<PiFire />} text="Deals of the Day" />
          <ButtonWithIcon icon={<CgShutterstock />} text="Stocks" />
        </div>
      </header>
      <main className="mt-5 grid grid-cols-12 gap-5">
        <section className="col-span-8 space-y-5">
          <div className="grid grid-cols-4 gap-5">
            <FadeUp delay={0.1} duration={1}>
              <DataOverviewCard
                data={inventoryData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
            <FadeUp delay={0.2} duration={1}>
              <DataOverviewCard
                data={revenueData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
            <FadeUp delay={0.3} duration={1}>
              <DataOverviewCard
                data={invoiceData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
            <FadeUp delay={0.4} duration={1}>
              <DataOverviewCard
                data={stockHistoryData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2">
              <FadeUp delay={1} duration={1}>
                <LowStock
                  data={lowStockData}
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
              </FadeUp>
            </div>
            <div className="w-1/2">
              <FadeUp delay={0.6} duration={1}>
                <DeadStock
                  data={deadStockData}
                  linkHref="/dead-stock-details"
                />
              </FadeUp>
            </div>
          </div>
          <FadeUp delay={1.5} duration={1}>
            <StockLevel data={stockLevelData} linkHref="/dead-stock-details" />
          </FadeUp>
        </section>

        <section className="col-span-4 space-y-5">
          <FadeUp delay={0.8} duration={1}>
            <DropDownMenu />
          </FadeUp>
        </section>
      </main>
    </div>
  );
};

// DropDownMenu component
const DropDownMenu: React.FC = () => (
  <div className="row-span-3 rounded-lg bg-white shadow">
    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 font-semibold">
      <span>Drop down menu</span>
      <button
        type="button"
        className="-mr-1 inline-flex justify-center rounded-md bg-white px-1 text-sm font-medium leading-5 text-gray-500 hover:text-gray-600"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <IoChevronDownSharp className="-mr-1 ml-1" />
      </button>
    </div>
    <div className="overflow-y-auto">
      <ul className="space-y-6 p-6"></ul>
    </div>
  </div>
);

export default AdminDashboard;

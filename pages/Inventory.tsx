'use client';
import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { CgShutterstock } from 'react-icons/cg';
import { PiFire } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithIcon from '@/components/button/ButtonWithIcon';
import FadeUp from '@/components/motion/FadeUp';
import InventoryOverviewCard from '@/components/inventory/InventoryOverviewCard';
import LowStock from '@/components/inventory/LowStock';
import DeadStock from '@/components/inventory/DeadStock';
import Table from '@/components/common/Table';
import ProductPerformance from '@/components/inventory/ProductPerformance';
import MyProducts from '@/components/inventory/MyProducts';

const Inventory: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const inventoryData = {
    value: 3540400,
    percentageChange: 23.04,
  };
  const revenueData = {
    value: 3540400,
    percentageChange: 23.04,
  };

  const invoiceData = {
    value: 3540400,
    percentageChange: -23.04,
  };

  const stockHistoryData = {
    value: 3540400,
    percentageChange: 23.04,
  };

  const deadStockData = [
    { productName: 'Pen', daysUnsold: 15 },
    { productName: 'Notebook', daysUnsold: 10 },
    { productName: 'Colors', daysUnsold: 5 },
  ];
  const stockLevelData = [
    {
      productName: 'Pen',
      sku: 'PEN001',
      category: 'Stationery',
      quantity: 150,
      status: 'In Stock',
    },
    {
      productName: 'Notebook',
      sku: 'NTBK002',
      category: 'Stationery',
      quantity: 10,
      status: 'Low Stock',
    },
    {
      productName: 'Markers',
      sku: 'MRK003',
      category: 'Art Supplies',
      quantity: 0,
      status: 'Out of Stock',
    },
    {
      productName: 'Sketchbook',
      sku: 'SKBK004',
      category: 'Art Supplies',
      quantity: 50,
      status: 'In Stock',
    },
  ];
  const myProductsData = {
    title: 'My Products',
    products: [
      {
        name: 'Nataraj Color Pencil (12 pcs)',
        price: 149,
        sku: '1101234',
        stock: 45600,
        imageUrl: '/product-1.png',
      },
      {
        name: 'Nataraj Color Pencil (12 pcs)',
        price: 149,
        sku: '1101234',
        stock: 45600,
        imageUrl: '/product-2.png',
      },
      {
        name: 'Faber-Castell Colored Pencils (24 pcs)',
        price: 299,
        sku: '1105678',
        stock: 32000,
        imageUrl: '/product-3.png',
      },
      {
        name: 'Crayola Crayons (16 pcs)',
        price: 89,
        sku: '1109123',
        stock: 15000,
        imageUrl: '/product-4.png',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5 sm:px-10 2xl:px-20">
      <header className="flex items-center gap-4">
        <h1 className="pr-10 text-4xl text-blue-600">Inventory</h1>

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
              <InventoryOverviewCard
                title="Inventory Value"
                data={inventoryData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
            <FadeUp delay={0.2} duration={1}>
              <InventoryOverviewCard
                title="Revenue"
                data={revenueData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
            <FadeUp delay={0.3} duration={1}>
              <InventoryOverviewCard
                title="Invoice"
                data={invoiceData}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </FadeUp>
            <FadeUp delay={0.4} duration={1}>
              <InventoryOverviewCard
                title="Stock History"
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
                  title="Low Stock"
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
              </FadeUp>
            </div>
            <div className="w-1/2">
              <FadeUp delay={0.6} duration={1}>
                <DeadStock
                  title="Dead Stock Products"
                  data={deadStockData}
                  linkHref="/dead-stock-details"
                />
              </FadeUp>
            </div>
          </div>

          {/* table */}
          <FadeUp delay={1.5} duration={1}>
            <Table
              title="Stock Level"
              headings={[
                'Product Name',
                'SKU',
                'Category',
                'Quantity',
                'Stock Status',
              ]}
              data={stockLevelData}
              href="/"
            />
          </FadeUp>
        </section>

        <section className="col-span-4 space-y-5">
          <FadeUp delay={0.8} duration={1}>
            <ProductPerformance title="Product Performance" />
          </FadeUp>
          <FadeUp delay={1} duration={1}>
            <MyProducts data={myProductsData} linkHref="/products" />
          </FadeUp>
        </section>
      </main>
    </div>
  );
};

export default Inventory;

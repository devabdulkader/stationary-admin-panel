import React from 'react';
import Table from '../common/Table';

interface StockItem {
  id: number;
  productName: string;
  sku: string;
  category: string;
  quantity: number;
}

const StocksPopup = () => {
  const stocksData: StockItem[] = [
    {
      id: 1,
      productName: 'Pen',
      sku: 'PEN001',
      category: 'Stationery',
      quantity: 150,
    },
    {
      id: 2,
      productName: 'Notebook',
      sku: 'NTBK002',
      category: 'Stationery',
      quantity: 10,
    },
    {
      id: 3,
      productName: 'Markers',
      sku: 'MRK003',
      category: 'Art Supplies',
      quantity: 0,
    },
    {
      id: 4,
      productName: 'Sketchbook',
      sku: 'SKBK004',
      category: 'Art Supplies',
      quantity: 50,
    },
    {
      id: 5,
      productName: 'Pen',
      sku: 'PEN001',
      category: 'Stationery',
      quantity: 150,
    },
    {
      id: 6,
      productName: 'Notebook',
      sku: 'NTBK002',
      category: 'Stationery',
      quantity: 10,
    },
    {
      id: 7,
      productName: 'Markers',
      sku: 'MRK003',
      category: 'Art Supplies',
      quantity: 0,
    },
    {
      id: 8,
      productName: 'Sketchbook',
      sku: 'SKBK004',
      category: 'Art Supplies',
      quantity: 50,
    },
    {
      id: 9,
      productName: 'Pen',
      sku: 'PEN001',
      category: 'Stationery',
      quantity: 150,
    },
    {
      id: 10,
      productName: 'Notebook',
      sku: 'NTBK002',
      category: 'Stationery',
      quantity: 10,
    },
    {
      id: 11,
      productName: 'Markers',
      sku: 'MRK003',
      category: 'Art Supplies',
      quantity: 0,
    },
    {
      id: 12,
      productName: 'Sketchbook',
      sku: 'SKBK004',
      category: 'Art Supplies',
      quantity: 50,
    },
  ];

  return (
    <div>
      <Table
        topHeading="List of Stocks"
        headings={['Product Name', 'SKU', 'Category', 'Quantity']}
        data={stocksData}
        pagination={true}
        view={false}
        action={false}
        search={true}
        sort={true}
        arrowDown={false}
        href="/"
      />
    </div>
  );
};

export default StocksPopup;

import React from 'react';
import Table from '../common/Table';

interface StockLevelItem {
  id: number;
  productName: string;
  sku: string;
  category: string;
  quantity: number;
  status: string;
}

const StockLevel = () => {
  const stockLevelData: StockLevelItem[] = [
    {
      id: 1,
      productName: 'Pen',
      sku: 'PEN001',
      category: 'Stationery',
      quantity: 150,
      status: 'In Stock',
    },
    {
      id: 2,
      productName: 'Notebook',
      sku: 'NTBK002',
      category: 'Stationery',
      quantity: 10,
      status: 'Low Stock',
    },
    {
      id: 3,
      productName: 'Markers',
      sku: 'MRK003',
      category: 'Art Supplies',
      quantity: 0,
      status: 'Out of Stock',
    },
    {
      id: 4,
      productName: 'Sketchbook',
      sku: 'SKBK004',
      category: 'Art Supplies',
      quantity: 50,
      status: 'In Stock',
    },
  ];

  return (
    <Table
      title="Stock Level"
      view={true}
      headings={['Product Name', 'SKU', 'Category', 'Quantity', 'Stock Status']}
      data={stockLevelData}
      href="/"
    />
  );
};

export default StockLevel;

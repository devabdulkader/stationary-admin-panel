import React from 'react';
import Table from '../common/Table';

const StoackLevel = () => {
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
  return (
    <Table
      title="Stock Level"
      headings={['Product Name', 'SKU', 'Category', 'Quantity', 'Stock Status']}
      data={stockLevelData}
      href="/"
    />
  );
};

export default StoackLevel;

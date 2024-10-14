import Table from '@/components/common/Table';
import React from 'react';

// Define the type for the product data
interface Product {
  productName: string;
  sku: string;
  category: string;
  quantity: number;
  stockStatus: string;
}

const Page: React.FC = () => {
  const title = 'Stock Level Overview';

  const headings: string[] = [
    'Product Name',
    'SKU',
    'Category',
    'Quantity',
    'Stock Status',
  ];

  const data: Product[] = [
    {
      productName: 'Pen',
      sku: 'PEN001',
      category: 'Stationery',
      quantity: 150,
      stockStatus: 'In Stock',
    },
    {
      productName: 'Notebook',
      sku: 'NTBK002',
      category: 'Stationery',
      quantity: 10,
      stockStatus: 'Low Stock',
    },
  ];

  const href: string = '/products';

  return (
    <div className="min-h-screen bg-gray-100">
      <Table title={title} headings={headings} data={data} href={href} />
    </div>
  );
};

export default Page;

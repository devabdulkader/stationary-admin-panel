import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoChevronRight } from 'react-icons/go';
import { RxDragHandleDots2 } from 'react-icons/rx';

interface ProductData {
  name: string; // Product name
  price: number; // Product price
  sku: string; // Product SKU
  stock: number; // Available stock
  imageUrl: string; // Image URL for the product
}

interface ProductProps {
  data: {
    title: string; // Title of the product category
    products: ProductData[]; // Array of products
  };
  linkHref: string; // Link to view more products
}

const MyProducts: React.FC<ProductProps> = ({ data, linkHref }) => {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>{data.title}</span>
        <Link href={linkHref}>
          <button className="py-2 text-blue-500">View</button>
        </Link>
      </div>
      <div className="py-4">
        {data.products.map((product, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-4 py-2 ${
              index !== data.products.length - 1
                ? 'border-b border-gray-200'
                : ''
            }`} // Add border-b only if not the last item
          >
            {/* Column 1: Drag handle icon */}
            <div className="flex w-16 items-center">
              <RxDragHandleDots2 className="h-6 w-6" />
            </div>

            {/* Column 2: Product image */}
            <div className="flex h-full w-1/4 items-center">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-auto"
                height={300}
                width={300}
                objectFit="contain" // Adjusts how the image is resized
              />
            </div>

            {/* Column 3: Product details */}
            <div className="w-1/2">
              <h4 className="font-semibold">{product.name}</h4>
              <p>Price: ${product.price}</p>
              <p>SKU: {product.sku}</p>
              <p>Available Stock: {product.stock} units</p>
            </div>

            {/* Column 4: Link with icon */}
            <div className="flex w-16 items-center justify-end">
              <Link href="#" className="text-gray-600">
                <GoChevronRight size={24} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;

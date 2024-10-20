import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoChevronRight } from 'react-icons/go';
import { RxDragHandleDots2 } from 'react-icons/rx';

interface ProductData {
  id: string;
  title: string;
  price: string;
  sku: string;
  stockQuantity: string;
  images: { url: string; alt: string | null }[];
  category: { name: string };
}

interface ProductProps {
  data: ProductData[];
  linkHref: string;
}

const MyProducts2: React.FC<ProductProps> = ({ data, linkHref }) => {
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-2 font-semibold">
        <span>My Products</span>
        <Link href={linkHref}>
          <button className="py-2 text-blue-500">View</button>
        </Link>
      </div>
      <div className="py-4">
        {data?.slice(0, 3)?.map((product, index) => (
          <div
            key={product.id}
            className={`flex items-center justify-between gap-2 px-4 py-2 ${
              index !== data?.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <div className="flex items-center">
              <RxDragHandleDots2 className="h-6 w-6" />
            </div>

            <div className="flex h-full w-1/4 items-center">
              <Image
                src={product.images[0].url} // Use the first image from the array
                alt={product.images[0].alt || product.title}
                className="h-full w-auto"
                height={300}
                width={300}
                objectFit="contain"
              />
            </div>

            <div className="w-1/2">
              <h4 className="font-semibold">{product.title}</h4>
              <p>Price: ${product.price}</p>
              <p>SKU: {product.sku}</p>
              <p>Available Stock: {product.stockQuantity} units</p>
            </div>

            <div className="flex items-center justify-end">
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

export default MyProducts2;

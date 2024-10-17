import React from 'react';
import Image from 'next/image';
import { useSelectedProducts } from '@/context/SelectedProductsContext';
import { PiDotsSixVerticalLight } from 'react-icons/pi';
import { TfiZoomIn } from 'react-icons/tfi';
import { HiOutlinePlus } from 'react-icons/hi';

interface Product {
  id: number;
  name: string;
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nihil.';
  currentPrice: number;
  originalPrice?: number;
  discountedPrice?: number;
  image: string;
  imageVariants?: string[];
  colorOptions?: string[];
  stockQuantity: number;
}

interface HorizontalProductCardProps {
  product: Product;
}

const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
  product,
}) => {
  const { addProduct } = useSelectedProducts();

  const handleAddProduct = () => {
    addProduct(product);
  };

  return (
    <section className="flex items-center justify-between border-b border-gray-300 p-4">
      <div className="flex items-center gap-5">
        <PiDotsSixVerticalLight size={30} />

        <div className="relative h-36 w-64">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-lg font-semibold text-red-700">
            MVR {product.currentPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            Available Stock {product.stockQuantity} unit
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-blue flex items-center gap-2 rounded-md bg-gray-200 px-5 py-3 transition hover:bg-gray-100">
          <TfiZoomIn size={20} />
          <span className="font-semibold">View Details</span>
        </button>

        <button
          className="text-blue bg-blue flex items-center gap-2 rounded-md px-5 py-3 transition hover:bg-blue-700"
          onClick={handleAddProduct}
        >
          <HiOutlinePlus size={20} className="text-white" />
          <span className="font-semibold text-white">Add to Deals</span>
        </button>
      </div>
    </section>
  );
};

export default HorizontalProductCard;

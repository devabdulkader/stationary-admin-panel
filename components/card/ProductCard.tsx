'use client';
import Image from 'next/image';
import FadeUp from '../motion/FadeUp';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useSelectedProducts } from '@/context/SelectedProductsContext';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { removeProduct } = useSelectedProducts();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleRemoveProduct = () => {
    removeProduct(product.id);
  };

  return (
    <FadeUp>
      <div className="relative flex h-full min-w-[300px] max-w-[320px] flex-col bg-[#F5F8FF] shadow">
        {/* Image */}
        <div className="relative h-64">
          <Image
            className="h-full w-full object-cover"
            src={product.image}
            alt="Product Image"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="mt-4 line-clamp-2 min-h-[2rem] text-xl font-semibold">
              {product.name}
            </h3>
            <p className="line-clamp-2 text-base text-gray-500">
              {product.description}
            </p>
          </div>
          <div className="mt-2">
            <span className="text-xl font-semibold">
              MVR.{' '}
              <del className="mr-2 text-black">{product.originalPrice}</del>{' '}
              <span className="text-red-700">{product.discountedPrice}</span>
            </span>
          </div>
        </div>

        {/* Bag icon */}
        <div className="absolute bottom-4 right-4">
          <button onClick={handleRemoveProduct}>
            <RiDeleteBinLine className="text-red-600" size={24} />
          </button>
        </div>
      </div>
    </FadeUp>
  );
};

export default ProductCard;

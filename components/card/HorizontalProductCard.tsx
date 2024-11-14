'use client';
import Image from 'next/image';
import { PiDotsSixVerticalLight } from 'react-icons/pi';
import { TfiZoomIn } from 'react-icons/tfi';
import { HiOutlinePlus } from 'react-icons/hi';
import { instance } from '@/axios/axiosInstance';
import { toast } from 'react-toastify';

const HorizontalProductCard: React.FC<any> = ({ product, onUpdate }) => {
  console.log("PRODUCT", product);
  const handleAddProduct = async () => {
    try {
      const response = await instance.post('', {
        query: `
          mutation addProductToDeal($productId: String!) {
            addProductToDeal(productId: $productId) {
              success
              message
            }
          }
        `,
        variables: {
          productId: product.id,
        },
      });
      // Handle the response
      if (response.data.data) {
        toast.success('Product added to Deals of the Day successfully');
        onUpdate(true);
      } else {
        toast.error(
          'Failed to add product: ' + response.data.data
        );
      }
    } catch (err) {
      console.error('Error adding product to deals:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-between gap-4 border-b border-gray-300 p-4 sm:flex-row">
      <div className="flex w-full flex-col gap-5 sm:flex-row lg:w-auto">
        <PiDotsSixVerticalLight size={30} className="hidden lg:block" />

        <div className="relative h-48 w-full sm:h-36 md:w-64">
          <Image
            src={product.images && product.images.length > 0 ? product.images[0].url : undefined}
            alt={product.name}
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold lg:text-xl">{product.name}</h2>
          <p className="text-md font-semibold text-red-700 lg:text-lg">
            MVR {product.price}
          </p>
          <p className="text-sm text-gray-500">
            Available Stock: {product.stockQuantity} unit
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:flex-row">
        <button className="text-blue flex w-full items-center justify-center gap-2 rounded-md bg-gray-200 px-5 py-3 transition hover:bg-gray-100 lg:w-auto">
          <TfiZoomIn size={20} />
          <span className="font-semibold">View Details</span>
        </button>

        <button
          className="text-blue bg-blue flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 transition hover:bg-blue-700 lg:w-auto"
          onClick={handleAddProduct} // Trigger mutation on click
        >
          <HiOutlinePlus size={20} className="text-white" />
          <span className="font-semibold text-white">Add to Deals</span>
        </button>
      </div>
    </section>
  );
};

export default HorizontalProductCard;

'use client';

import Form from '@/components/form/Form';

import Link from 'next/link';

import { BsArrowLeft } from 'react-icons/bs';

import ProductImages from '@/components/ProductDetails/ProductImages';
import ProductDiscount from '@/components/ProductDetails/ProductDiscount';
import ProductInformation from '@/components/ProductDetails/ProductInformation';

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const submitHandler = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full p-5">
      <div className="flex flex-col gap-5 pb-10 lg:flex-row">
        <Link href="/list-of-products">
          <h1 className="text-blue flex items-center gap-2 pr-10 text-3xl font-medium">
            <BsArrowLeft />
            <span>Product Details</span>
          </h1>
        </Link>
        <div className="flex flex-grow flex-col gap-5 sm:flex-row">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>
        </div>
      </div>

      <Form submitHandler={submitHandler} className="w-full">
        <div>
          <ProductImages />
        </div>
        <div className="flex w-full gap-5 py-5">
          <ProductInformation productId={productId} />

          <ProductDiscount />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue my-5 w-full rounded-lg p-3 text-center text-white"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductDetails;

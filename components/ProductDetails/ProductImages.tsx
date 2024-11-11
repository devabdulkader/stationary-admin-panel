'use client';
// import React, { useState } from 'react';
// import { AiFillPlusCircle } from 'react-icons/ai';
// import ProductImage from '../card/ProductImage';
import FormImageUpload from '../form/FormImageUpload';

const ProductImages = () => {
  //   const [carouselData, setCarouselData] = useState<any[]>([]);

  //   const totalSlots = 4;

  //   const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const newImageUrl = URL.createObjectURL(file);
  //       setCarouselData((prevData) => [
  //         ...prevData,
  //         { id: prevData.length + 1, image: newImageUrl },
  //       ]);
  //     }
  //   };

  //   const handleDeleteImage = () => {};

  return (
    <div className="relative w-full">
      <h1 className="py-5 text-2xl font-medium">Product Image</h1>

      <div className="grid grid-cols-1 gap-5 rounded-lg sm:grid-cols-2 lg:grid-cols-4">
        {/* {Array.from({ length: totalSlots }).map((_, index) => {
          const data = carouselData[index];
          return data ? (
            <ProductImage
              key={data.id}
              src={data.image}
              onDelete={handleDeleteImage}
            />
          ) : (
            <div key={index} className="relative">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleAddImage}
              />
              <div className="border-blue-dashed flex h-full min-h-[240px] cursor-pointer items-center justify-center rounded-lg border hover:bg-gray-100">
                <AiFillPlusCircle className="text-blue" size={40} />
              </div>
            </div>
          );
        })} */}
        <div className="relative">
          <FormImageUpload
            name="photo.1"
            className="flex h-full min-h-[240px] cursor-pointer items-center justify-center hover:bg-gray-100"
          />
        </div>
        <div className="relative">
          <FormImageUpload
            name="photo.2"
            className="flex h-full min-h-[240px] cursor-pointer items-center justify-center hover:bg-gray-100"
          />
        </div>
        <div className="relative">
          <FormImageUpload
            name="photo.3"
            className="flex h-full min-h-[240px] cursor-pointer items-center justify-center hover:bg-gray-100"
          />
        </div>
        <div className="relative">
          <FormImageUpload
            name="photo.4"
            className="flex h-full min-h-[240px] cursor-pointer items-center justify-center hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImages;

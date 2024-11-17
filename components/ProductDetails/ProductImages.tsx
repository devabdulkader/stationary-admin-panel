'use client';
import FormImageUpload from '../form/FormImageUpload';

interface ProductImagesProps {
  images?: { url: string; alt: string }[]; // The product images coming from parent
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  return (
    <div className="relative w-full">
      <h1 className="py-5 text-2xl font-medium">Product Image</h1>

      <div className="grid grid-cols-1 gap-5 rounded-lg sm:grid-cols-2 lg:grid-cols-4">
        {[...(images ?? []), null, null, null, null] // Pad the images array to ensure 4 slots
          .slice(0, 4) // Ensure we only show 4 fields
          .map((image, index) => (
            <div key={index} className="relative">
              <FormImageUpload
                name={`photo.${index + 1}`}
                className="flex h-full min-h-[240px] cursor-pointer items-center justify-center hover:bg-gray-100"
                defaultValue={image ? image.url : undefined} // Display existing image if available
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProductImages;

import ProductDetails from '@/page-component/ProductDetails';

interface PageParams {
  productId: string;
}

const Page = ({ params }: { params: PageParams }) => {
  return (
    <div>
      <ProductDetails productId={params.productId} />
    </div>
  );
};

export default Page;

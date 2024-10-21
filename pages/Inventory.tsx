'use client';

import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { CgShutterstock } from 'react-icons/cg';
import { PiFire } from 'react-icons/pi';
import { RiSearchLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithIcon from '@/components/button/ButtonWithIcon';
import FadeUp from '@/components/motion/FadeUp';
import DeadStock from '@/components/inventory/DeadStock';
import ProductPerformance from '@/components/inventory/ProductPerformance';
import Modal from '@/components/common/Modal';
import AddNewProduct from '@/components/inventory/AddNewProduct';
import { gql, useQuery } from '@apollo/client';
import InventoryOverviewCard2 from '@/components/inventory/InventoryOverviewCard2';

import LowStock2 from '@/components/inventory/LowStock2';
import StockLevel2 from '@/components/inventory/StockLevel2';
import MyProducts2 from '@/components/inventory/MyProducts2';
import StocksPopup2 from '@/components/inventory/StocksPopup2';

const GET_ALL_PRODUCTS = gql`
  query {
    products {
      items {
        id
        sku
        title
        description
        price
        buyPrice
        stockQuantity
        images {
          url
          alt
        }
        category {
          name
        }
        variants {
          id
          name
          value
        }
        discount {
          id
          discountedPrice
          startsAt
          endsAt
          isActive
        }
      }
      totalItems
      currentPage
      totalPages
    }
  }
`;

const GET_DEAD_STOCK = gql`
  query {
    deadStockProducts {
      productName
      daysUnsold
    }
  }
`;

const GET_LOW_STOCK = gql`
  query {
    lowStockCategory {
      categoryName
      stockQuantity
    }
  }
`;

const GET_MONTHLY_INVOICE = gql`
  query {
    getMonthlyInvoiceValues {
      month
      value
      change
    }
  }
`;

const GET_MONTHLY_STOCK = gql`
  query {
    getMonthlyStockValues {
      month
      value
      change
    }
  }
`;

const GET_MONTHLY_REVENUE = gql`
  query {
    getMonthlyRevenueValues {
      month
      value
      change
    }
  }
`;

const GET_MONTHLY_INVENTORY_VALUE = gql`
  query {
    getMonthlyInventoryValues {
      month
      value
      change
    }
  }
`;

const Inventory: React.FC = () => {
  const { data: monthlyInventoryValue, loading: monthlyInventoryValueLoading } =
    useQuery(GET_MONTHLY_INVENTORY_VALUE);

  const { data: monthlyRevenue, loading: monthlyRevenueLoading } =
    useQuery(GET_MONTHLY_REVENUE);

  const { data: monthlyStock, loading: monthlyStockLoading } =
    useQuery(GET_MONTHLY_STOCK);

  const { data: monthlyInvoice, loading: monthlyInvoiceLoading } =
    useQuery(GET_MONTHLY_INVOICE);

  const { data: lowStock, loading: lowStockLoading } = useQuery(GET_LOW_STOCK);

  const { data: deadStock, loading: deadStockLoading } =
    useQuery(GET_DEAD_STOCK);

  const { data: allProducts, loading: allProductsLoading } =
    useQuery(GET_ALL_PRODUCTS);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  };

  const openStockModal = () => {
    setIsStockModalOpen(true);
  };

  const closeStockModal = () => {
    setIsStockModalOpen(false);
  };

  if (
    monthlyInventoryValueLoading ||
    monthlyRevenueLoading ||
    monthlyStockLoading ||
    monthlyInvoiceLoading ||
    lowStockLoading ||
    deadStockLoading ||
    allProductsLoading
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {isAddProductModalOpen && (
        <Modal closeModal={closeAddProductModal}>
          <AddNewProduct />
        </Modal>
      )}

      {isStockModalOpen && (
        <Modal closeModal={closeStockModal}>
          <StocksPopup2 products={allProducts?.products?.items} />
        </Modal>
      )}

      <header className="flex flex-wrap items-center gap-4">
        <h1 className="text-2xl text-blue-600 sm:text-4xl">Inventory</h1>

        {/* Search Bar */}
        <div className="relative mt-4 w-full flex-grow sm:mt-0 sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border bg-white px-10 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
            <RiSearchLine className="text-gray-600" />
          </span>
        </div>

        {/* Button Section */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <ButtonWithIcon
            icon={<BsPlusLg />}
            text="Add New Product"
            onClick={openAddProductModal}
          />
          <ButtonWithIcon
            icon={<PiFire />}
            text="Deals of the Day"
            href="/deals-of-the-day"
          />
          <ButtonWithIcon
            icon={<CgShutterstock />}
            text="Stocks"
            onClick={openStockModal}
          />
        </div>
      </header>

      <main className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12">
        <section className="col-span-12 space-y-5 xl:col-span-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">
            <FadeUp delay={0.1} duration={1}>
              <InventoryOverviewCard2
                title="Inventory Value"
                data={monthlyInventoryValue?.getMonthlyInventoryValues}
              />
            </FadeUp>
            <FadeUp delay={0.2} duration={1}>
              <InventoryOverviewCard2
                title="Revenue"
                data={monthlyRevenue?.getMonthlyRevenueValues}
              />
            </FadeUp>
            <FadeUp delay={0.3} duration={1}>
              <InventoryOverviewCard2
                title="Invoice"
                data={monthlyInvoice?.getMonthlyInvoiceValues}
              />
            </FadeUp>
            <FadeUp delay={0.4} duration={1}>
              <InventoryOverviewCard2
                title="Stock History"
                data={monthlyStock?.getMonthlyStockValues}
              />
            </FadeUp>
          </div>

          <div className="flex flex-col gap-5 2xl:flex-row">
            <div className="flex-1">
              <FadeUp delay={1} duration={1}>
                <LowStock2 title="Low Stock" data={lowStock.lowStockCategory} />
              </FadeUp>
            </div>
            <div className="flex-1">
              <FadeUp delay={0.6} duration={1}>
                <DeadStock
                  title="Dead Stock Products"
                  data={deadStock.deadStockProducts}
                  linkHref="/dead-stock-details"
                />
              </FadeUp>
            </div>
          </div>

          {/* table */}
          <FadeUp delay={1.5} duration={1}>
            <StockLevel2
              data={allProducts?.products?.items?.map((product: any) => ({
                id: product.id,
                title: product.title,
                sku: product.sku,
                category: product.category.name, // Pass the category name (string)
                stockQuantity: Number(product.stockQuantity),
              }))}
            />
          </FadeUp>
        </section>

        <section className="col-span-12 space-y-5 xl:col-span-4">
          <FadeUp delay={0.8} duration={1}>
            <ProductPerformance title="Product Performance" />
          </FadeUp>
          <FadeUp delay={1} duration={1}>
            <MyProducts2
              data={allProducts?.products?.items}
              linkHref="/list-of-products"
            />
          </FadeUp>
        </section>
      </main>
    </div>
  );
};

export default Inventory;

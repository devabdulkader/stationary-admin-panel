'use client';

import React, { useState, useEffect } from 'react';
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
import InventoryOverviewCard2 from '@/components/inventory/InventoryOverviewCard2';
import LowStock2 from '@/components/inventory/LowStock2';
import StockLevel2 from '@/components/inventory/StockLevel2';
import MyProducts2 from '@/components/inventory/MyProducts2';
import StocksPopup2 from '@/components/inventory/StocksPopup2';
import { instance } from '@/axios/axiosInstance';

const Inventory = () => {
  const [monthlyInventoryValue, setMonthlyInventoryValue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyStock, setMonthlyStock] = useState([]);
  const [monthlyInvoice, setMonthlyInvoice] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [deadStock, setDeadStock] = useState([]);
  const [allProducts, setAllProducts] = useState({
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          inventoryValue,
          revenue,
          stock,
          invoice,
          lowStockData,
          deadStockData,
          productsData,
        ] = await Promise.all([
          instance.post('', {
            query: `
            query {
              getMonthlyInventoryValues {
                month
                value
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getMonthlyRevenueValues {
                month
                value
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getMonthlyStockValues {
                month
                value
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              getMonthlyInvoiceValues {
                month
                value
                change
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              lowStockCategory {
                categoryName
                stockQuantity
              }
            }
          `,
          }),
          instance.post('', {
            query: `
            query {
              deadStockProducts {
                productName
                daysUnsold
              }
            }
          `,
          }),
          instance.post('', {
            query: `
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
          `,
          }),
        ]);

        setMonthlyInventoryValue(
          inventoryValue.data.data.getMonthlyInventoryValues,
        );
        setMonthlyRevenue(revenue.data.data.getMonthlyRevenueValues);
        setMonthlyStock(stock.data.data.getMonthlyStockValues);
        setMonthlyInvoice(invoice.data.data.getMonthlyInvoiceValues);
        setLowStock(lowStockData.data.data.lowStockCategory);
        setDeadStock(deadStockData.data.data.deadStockProducts);
        setAllProducts(productsData.data.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
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
          <StocksPopup2 products={allProducts?.items} />
        </Modal>
      )}

      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl text-blue-600 sm:text-4xl">Inventory</h1>

        {/* Search Bar */}
        <div className="relative w-full flex-grow sm:mt-0 sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border bg-white px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 transform">
            <RiSearchLine className="text-gray-600" />
          </span>
        </div>

        {/* Button Section */}
        <div className="flex w-full flex-wrap gap-2 sm:w-auto lg:flex-row lg:gap-4">
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
                data={monthlyInventoryValue}
              />
            </FadeUp>
            <FadeUp delay={0.2} duration={1}>
              <InventoryOverviewCard2 title="Revenue" data={monthlyRevenue} />
            </FadeUp>
            <FadeUp delay={0.3} duration={1}>
              <InventoryOverviewCard2 title="Invoice" data={monthlyInvoice} />
            </FadeUp>
            <FadeUp delay={0.4} duration={1}>
              <InventoryOverviewCard2
                title="Stock History"
                data={monthlyStock}
              />
            </FadeUp>
          </div>

          <div className="mt-5 flex flex-col gap-5 2xl:flex-row">
            <div className="flex-1">
              <FadeUp delay={1} duration={1}>
                <LowStock2 title="Low Stock" data={lowStock} />
              </FadeUp>
            </div>
            <div className="flex-1">
              <FadeUp delay={0.6} duration={1}>
                <DeadStock
                  title="Dead Stock Products"
                  data={deadStock}
                  linkHref="/dead-stock-details"
                />
              </FadeUp>
            </div>
          </div>

          {/* table */}
          <FadeUp delay={1.5} duration={1}>
            <StockLevel2
              data={allProducts?.items?.map((product: any) => ({
                id: product.id,
                title: product.title,
                sku: product.sku,
                category: product.category.name,
                stockQuantity: Number(product.stockQuantity),
              }))}
            />
          </FadeUp>
        </section>

        <section className="col-span-12 xl:col-span-4">
          <FadeUp delay={0.8} duration={1}>
            <ProductPerformance title="Product Performance" />
          </FadeUp>
          <FadeUp delay={1} duration={1}>
            <MyProducts2
              data={allProducts?.items}
              linkHref="/list-of-products"
            />
          </FadeUp>
        </section>
      </main>
    </div>
  );
};

export default Inventory;

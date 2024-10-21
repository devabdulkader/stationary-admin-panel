'use client';

import { BsArrowRepeat } from 'react-icons/bs';
import { RiSearchLine } from 'react-icons/ri';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithIcon from '@/components/button/ButtonWithIcon';
import FadeUp from '@/components/motion/FadeUp';
import SupplierDue from '@/components/accounts/SupplierDue';
import { useState, useEffect } from 'react';
import EntryExpensePopup from '@/components/accounts/EntryExpensePopup';
import Modal from '@/components/common/Modal';
import { AiOutlineInbox } from 'react-icons/ai';
import ProfitLoss2 from '@/components/accounts/ProfitLoss2';
import Transactions2 from '@/components/accounts/Transactions2';
import ProfitMargin2 from '@/components/accounts/ProfitMargin2';
import ExpenseBreakdown2 from '@/components/accounts/ExpenseBreakdown2';
import GrowthProgression2 from '@/components/accounts/GrowthProgression2';
import FinancialPerformance2 from '@/components/accounts/FinancialPerformance2';
import InvoiceSummary2 from '@/components/accounts/InvoiceSummary2';
import { instance } from '@/axios/axiosInstance';

const Accounts: React.FC = () => {
  const [isEntryExpenseModalOpen, setIsEntryExpenseModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    getYearlyProfitLoss: null,
    getAllPayments: null,
    getTotalProfitAndExpense: {
      totalProfit: 0,
      totalExpense: 0,
    },
    getMonthlyExpenseByCategory: null,
    getGrowthProgression: null,
    getYearlyProfitAndLoss: null,
    getInvoiceSummary: null,
  });

  const fetchGraphQLData = async () => {
    try {
      const queries = [
        {
          name: 'getYearlyProfitLoss',
          query: `query { getYearlyProfitLoss { year summary { month profit loss } } }`,
        },
        {
          name: 'getAllPayments',
          query: `query { getAllPayments { id amount status trxId paymentMethod createdAt } }`,
        },
        {
          name: 'getTotalProfitAndExpense',
          query: `query { getTotalProfitAndExpense { totalProfit totalExpense } }`,
        },
        {
          name: 'getMonthlyExpenseByCategory',
          query: `query { getMonthlyExpenseByCategory { month data { categoryName value percentage } } }`,
        },
        {
          name: 'getGrowthProgression',
          query: `query { getGrowthProgression { month data { week current last } } }`,
        },
        {
          name: 'getYearlyProfitAndLoss',
          query: `query { getYearlyProfitAndLoss { year profit loss } }`,
        },
        {
          name: 'getInvoiceSummary',
          query: `query { getInvoiceSummary { month data { totalInvoice amountDue paidInvoice } } }`,
        },
      ];

      const responses = await Promise.all(
        queries.map(({ query }) => instance.post('', { query })),
      );

      const result = responses.reduce(
        (acc: Record<string, any>, res, index) => {
          acc[queries[index].name] = res.data.data[queries[index].name];
          return acc;
        },
        {},
      );

      setData(result as any);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphQLData();
  }, []);

  const openEntryExpenseModal = () => {
    setIsEntryExpenseModalOpen(true);
  };

  const closeEntryExpenseModal = () => {
    setIsEntryExpenseModalOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      {isEntryExpenseModalOpen && (
        <Modal closeModal={closeEntryExpenseModal}>
          <EntryExpensePopup />{' '}
        </Modal>
      )}
      <header className="flex items-center gap-4">
        <h1 className="pr-10 text-4xl text-blue-600">Accounts</h1>

        {/* Search Bar */}
        <div className="relative flex-grow">
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
        <div className="flex gap-4">
          <ButtonWithIcon icon={<BsArrowRepeat />} text="Generate Report" />
          <ButtonWithIcon
            icon={<AiOutlineInbox />}
            text="Entry Expense"
            onClick={openEntryExpenseModal}
          />
        </div>
      </header>

      <main className="mt-5 flex flex-col gap-5">
        <section className="grid gap-5 lg:grid-cols-2">
          <FadeUp delay={0.1} duration={1}>
            <ProfitLoss2 data={data.getYearlyProfitLoss || []} />
          </FadeUp>
          <FadeUp delay={0.2} duration={1}>
            <GrowthProgression2 data={data.getGrowthProgression || []} />
          </FadeUp>
        </section>

        <div className="grid grid-cols-12 gap-5">
          {/* First section - Transactions */}
          <section className="col-span-12 2xl:col-span-7">
            <FadeUp delay={0.3} duration={1}>
              <Transactions2 transactionData={data.getAllPayments || []} />
            </FadeUp>
          </section>

          {/* Second section - Profit Margin and Expense Breakdown */}
          <section className="col-span-12 gap-5 space-y-5 xl:grid xl:grid-cols-2 xl:space-y-0 2xl:col-span-5 2xl:grid-cols-1">
            <FadeUp delay={0.4} duration={1}>
              <ProfitMargin2
                totalExpense={data.getTotalProfitAndExpense?.totalExpense}
                totalProfit={data.getTotalProfitAndExpense?.totalProfit}
              />
            </FadeUp>
            <FadeUp delay={0.5} duration={1}>
              <ExpenseBreakdown2
                data={data.getMonthlyExpenseByCategory || []}
              />
            </FadeUp>
          </section>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <section className="col-span-12 grid gap-5 xl:col-span-6 2xl:col-span-7">
            <FadeUp delay={0.3} duration={1}>
              <FinancialPerformance2 data={data.getYearlyProfitAndLoss || []} />
            </FadeUp>
          </section>

          <section className="col-span-12 grid grid-cols-2 gap-5 xl:col-span-6 2xl:col-span-5">
            <FadeUp delay={0.4} duration={1}>
              <SupplierDue />
            </FadeUp>
            <FadeUp delay={0.5} duration={1}>
              <InvoiceSummary2 invoiceData={data.getInvoiceSummary || []} />
            </FadeUp>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Accounts;

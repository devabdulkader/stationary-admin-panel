import { useState, useEffect } from 'react';
import Table from '../common/Table';
import { instance } from '@/axios/axiosInstance';

const GET_ALL_CUSTOMERS_QUERY = `
  query {
    getAllCustomers {
      id
      fullName
      phoneNumber
      email
      address
      district
    }
  }
`;

const CustomersPopup = () => {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const response = await instance.post('', {
          query: GET_ALL_CUSTOMERS_QUERY,
        });

        const customerList = response.data.data.getAllCustomers.map(
          (customer: any) => ({
            id: customer.id,
            customerName: customer.fullName,
            customerId: customer.id,
            email: customer.email,
            contactNo: customer.phoneNumber,
            totalSpent: 'N/A',
            totalOrder: 'N/A',
          }),
        );

        setCustomersData(customerList);
      } catch (err: any) {
        console.log(err.message);
        setError('Error fetching customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomersData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Table
        topHeading="Customers"
        headings={[
          'Customer Name',
          'Customer ID',
          'Email',
          'Contact No.',
          'Total Spent',
          'Total Order',
        ]}
        data={customersData}
        pagination={true}
        view={false}
        action={false}
        search={true}
        sort={false}
        arrowDown={false}
        href="/"
      />
    </div>
  );
};

export default CustomersPopup;

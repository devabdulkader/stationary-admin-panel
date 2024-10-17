import Table from '../common/Table';

const CustomersPopup = () => {
  const customersData = [
    {
      id: 1,
      customerName: 'John Doe',
      customerId: 'CUST001',
      email: 'john.doe@example.com',
      contactNo: '+1-555-123-4567',
      totalSpent: '1200.50',
      totalOrder: 5,
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      customerId: 'CUST002',
      email: 'jane.smith@example.com',
      contactNo: '+1-555-234-5678',
      totalSpent: '950.00',
      totalOrder: 3,
    },
    {
      id: 3,
      customerName: 'Michael Brown',
      customerId: 'CUST003',
      email: 'michael.brown@example.com',
      contactNo: '+1-555-345-6789',
      totalSpent: '2400.75',
      totalOrder: 7,
    },
    {
      id: 4,
      customerName: 'Emily Davis',
      customerId: 'CUST004',
      email: 'emily.davis@example.com',
      contactNo: '+1-555-456-7890',
      totalSpent: '670.20',
      totalOrder: 2,
    },
    {
      id: 5,
      customerName: 'David Johnson',
      customerId: 'CUST005',
      email: 'david.johnson@example.com',
      contactNo: '+1-555-567-8901',
      totalSpent: '1750.90',
      totalOrder: 6,
    },
    {
      id: 6,
      customerName: 'Sarah Williams',
      customerId: 'CUST006',
      email: 'sarah.williams@example.com',
      contactNo: '+1-555-678-9012',
      totalSpent: '2100.00',
      totalOrder: 5,
    },
    {
      id: 7,
      customerName: 'Chris Evans',
      customerId: 'CUST007',
      email: 'chris.evans@example.com',
      contactNo: '+1-555-789-0123',
      totalSpent: '780.75',
      totalOrder: 3,
    },
    {
      id: 8,
      customerName: 'Anna Taylor',
      customerId: 'CUST008',
      email: 'anna.taylor@example.com',
      contactNo: '+1-555-890-1234',
      totalSpent: '1150.50',
      totalOrder: 4,
    },
    {
      id: 9,
      customerName: 'James Wilson',
      customerId: 'CUST009',
      email: 'james.wilson@example.com',
      contactNo: '+1-555-901-2345',
      totalSpent: '825.60',
      totalOrder: 3,
    },
    {
      id: 10,
      customerName: 'Sophia Martinez',
      customerId: 'CUST010',
      email: 'sophia.martinez@example.com',
      contactNo: '+1-555-012-3456',
      totalSpent: '2230.25',
      totalOrder: 6,
    },
    {
      id: 11,
      customerName: 'Oliver Thomas',
      customerId: 'CUST011',
      email: 'oliver.thomas@example.com',
      contactNo: '+1-555-123-4567',
      totalSpent: '960.75',
      totalOrder: 4,
    },
    {
      id: 12,
      customerName: 'Isabella White',
      customerId: 'CUST012',
      email: 'isabella.white@example.com',
      contactNo: '+1-555-234-5678',
      totalSpent: '620.00',
      totalOrder: 2,
    },
    {
      id: 13,
      customerName: 'Liam Harris',
      customerId: 'CUST013',
      email: 'liam.harris@example.com',
      contactNo: '+1-555-345-6789',
      totalSpent: '1860.50',
      totalOrder: 5,
    },
    {
      id: 14,
      customerName: 'Mia Lewis',
      customerId: 'CUST014',
      email: 'mia.lewis@example.com',
      contactNo: '+1-555-456-7890',
      totalSpent: '510.25',
      totalOrder: 2,
    },
    {
      id: 15,
      customerName: 'Ethan Clark',
      customerId: 'CUST015',
      email: 'ethan.clark@example.com',
      contactNo: '+1-555-567-8901',
      totalSpent: '1400.00',
      totalOrder: 4,
    },
  ];

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

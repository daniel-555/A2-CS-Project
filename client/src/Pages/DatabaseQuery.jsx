import { Card, Grid } from "@mantine/core";
import CustomerTable from "../Components/DatabaseQuery/CustomerTable";
import { BsSearch } from "react-icons/bs";
import { TextInput } from "@mantine/core";
import { useState } from "react";
import HomeButton from "../Components/HomeButton";
import InvoiceTable from "../Components/DatabaseQuery/InvoiceTable";

const DatabaseQuery = ({ collection }) => {
	const [search, setSearch] = useState("");

	// This is test data for the customer table.
	// Real data will be fetched from the database
	const customerData = [
		{
			id: 1,
			customerName: "Customer 1",
			postcode: "ABC 123",
			email: "customer1@email.com",
			mobileNo: "12345",
		},
		{
			id: 2,
			customerName: "Testing 2",
			postcode: "ABC 123",
			email: "customer2@email.com",
			mobileNo: "12345",
		},
		{
			id: 3,
			customerName: "Halve 3",
			postcode: "ABC 123",
			email: "customer3@email.com",
			mobileNo: "12345",
		},
		{
			id: 4,
			customerName: "Person 4",
			postcode: "ABC 123",
			email: "customer4@email.com",
			mobileNo: "12345",
		},
		{
			id: 5,
			customerName: "Customer 1",
			postcode: "ABC 123",
			email: "customer1@email.com",
			mobileNo: "12345",
		},
		{
			id: 6,
			customerName: "Testing 2",
			postcode: "ABC 123",
			email: "customer2@email.com",
			mobileNo: "12345",
		},
		{
			id: 7,
			customerName: "Halve 3",
			postcode: "ABC 123",
			email: "customer3@email.com",
			mobileNo: "12345",
		},
		{
			id: 8,
			customerName: "Person 4",
			postcode: "ABC 123",
			email: "customer4@email.com",
			mobileNo: "12345",
		},
		{
			id: 9,
			customerName: "Customer 1",
			postcode: "ABC 123",
			email: "customer1@email.com",
			mobileNo: "12345",
		},
		{
			id: 10,
			customerName: "Testing 2",
			postcode: "ABC 123",
			email: "customer2@email.com",
			mobileNo: "12345",
		},
		{
			id: 11,
			customerName: "Halve 3",
			postcode: "ABC 123",
			email: "customer3@email.com",
			mobileNo: "12345",
		},
		{
			id: 12,
			customerName: "Person 4",
			postcode: "ABC 123",
			email: "customer4@email.com",
			mobileNo: "12345",
		},
	];

	const invoiceData = [
		{
			id: "INV0001",
			customer: "Customer1",
			dateDue: new Date().toDateString(),
			totalPrice: 600,
		},
		{
			id: "INV0002",
			customer: "Customer2",
			dateDue: new Date().toDateString(),
			totalPrice: 220,
		},
		{
			id: "INV0003",
			customer: "Customer3",
			dateDue: new Date().toDateString(),
			totalPrice: 2360,
		},
		{
			id: "INV0221",
			customer: "Customer4",
			dateDue: new Date().toDateString(),
			totalPrice: 877,
		},
		{
			id: "INV0525",
			customer: "Customer5",
			dateDue: new Date().toDateString(),
			totalPrice: 600,
		},
	];

	return (
		<Card className="card center">
			<Grid>
				<Grid.Col span={8}>
					{/* This search field updates the results in real time */}
					<TextInput
						placeholder={`Search ${collection} by name`}
						size="md"
						icon={<BsSearch />}
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</Grid.Col>
				<Grid.Col span={4}>
					<HomeButton size="md" />
				</Grid.Col>
			</Grid>
			<br />
			{/* This displays the table of all customers using 
			the supplied data and search fields */}
			{collection === "customers" ? (
				<CustomerTable data={customerData} search={search} />
			) : (
				<InvoiceTable data={invoiceData} search={search} />
			)}
		</Card>
	);
};

// This component will allow the user to query both the customers and invoices database.
// The results will be shown in a table with all relevant data displayed.

export default DatabaseQuery;

import { Card, Grid } from "@mantine/core";
import CustomerTable from "../Components/DatabaseQuery/CustomerTable";
import { BsSearch } from "react-icons/bs";
import { TextInput } from "@mantine/core";
import { useState } from "react";
import HomeButton from "../Components/HomeButton";

import InvoiceTable from "../Components/DatabaseQuery/InvoiceTable";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-init";
import { useParams } from "react-router-dom";

const DatabaseQuery = () => {
	const { table } = useParams();

	// Used to store the search field
	const [search, setSearch] = useState("");
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		const getCustomers = async () => {
			const querySnapshot = await getDocs(collection(db, "Customers"));

			// Format the retrieved customer data into the desired layout
			let formattedCustomers = [];
			querySnapshot.forEach((customer) => {
				const customerData = customer.data();

				const formattedData = {
					id: customer.id,
					companyName: customerData.companyName,
					postcode: customerData.postcode,
					email: customerData.email,
					contactNo: customerData.contactNo,
				};

				formattedCustomers.push(formattedData);
			});

			// Send the formatted data to the table for rendering
			setTableData(formattedCustomers);
		};

		if (table === "customers") {
			getCustomers();
		}
	}, []);

	const invoiceData = [
		{
			id: "INV0001",
			companyName: "Customer1",
			dateDue: new Date().toDateString(),
			totalPrice: 600,
		},
		{
			id: "INV0002",
			companyName: "Customer2",
			dateDue: new Date().toDateString(),
			totalPrice: 220,
		},
		{
			id: "INV0003",
			companyName: "Customer3",
			dateDue: new Date().toDateString(),
			totalPrice: 2360,
		},
		{
			id: "INV0221",
			companyName: "Customer4",
			dateDue: new Date().toDateString(),
			totalPrice: 877,
		},
		{
			id: "INV0525",
			companyName: "Customer5",
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
						placeholder={`Search ${table} by name`}
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
			{table === "customers" ? (
				<CustomerTable data={tableData} search={search} />
			) : (
				<InvoiceTable data={invoiceData} search={search} />
			)}
		</Card>
	);
};

// This component will allow the user to query both the customers and invoices database.
// The results will be shown in a table with all relevant data displayed.

export default DatabaseQuery;

import { Card, Grid } from "@mantine/core";
import CustomerTable from "../Components/DatabaseQuery/CustomerTable";
import { BsSearch } from "react-icons/bs";
import { TextInput } from "@mantine/core";
import { useState } from "react";
import HomeButton from "../Components/HomeButton";

import InvoiceTable from "../Components/DatabaseQuery/InvoiceTable";
import { useEffect } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
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

		const getInvoices = async () => {
			const querySnapshot = await getDocs(collection(db, "Invoices"));

			// Extract invoices from the snapshot
			let extractedInvoices = [];
			querySnapshot.forEach((invoice) => extractedInvoices.push(invoice));

			// Format the invoices into a more useful state
			let formattedInvoices = [];
			for (const invoice of extractedInvoices) {
				const invoiceData = invoice.data();

				// Get the company name from the referenced customer
				let companyName;
				const customerSnap = await getDoc(invoiceData.customer);
				if (customerSnap.exists()) {
					// Customer Exists
					companyName = customerSnap.data().companyName;
				} else {
					console.error("Customer no longer exists");
					companyName = "Deleted";
				}

				// Calculate the due date from the date the invoice was created
				// and the terms of trade

				let dateDue = invoiceData.dateCreated.toDate();
				dateDue.setDate(
					dateDue.getDate() + parseInt(invoiceData.termsOfTrade)
				);

				// Calculate the net and vat prices from the invoice's items
				// and add them to calculate the total due

				const netPrices = invoiceData.invoiceItems.map(
					(item) => item.price
				);
				const sumNetPrices = netPrices.reduce((acc, val) => acc + val, 0);
				const vatPrices = invoiceData.invoiceItems.map((item) => item.vat);
				const sumVatPrices = vatPrices.reduce((acc, val) => acc + val, 0);
				const totalPrice = sumNetPrices + sumVatPrices;

				const formattedData = {
					id: invoice.id,
					companyName,
					dateDue: dateDue.toDateString(),
					totalPrice,
				};

				formattedInvoices.push(formattedData);
			}

			// Send the formatted data to the table for rendering
			setTableData(formattedInvoices);
		};

		if (table === "customers") {
			getCustomers();
		} else if (table === "invoices") {
			getInvoices();
		}
	}, []);

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
				<InvoiceTable data={tableData} search={search} />
			)}
		</Card>
	);
};

// This component will allow the user to query both the customers and invoices database.
// The results will be shown in a table with all relevant data displayed.

export default DatabaseQuery;

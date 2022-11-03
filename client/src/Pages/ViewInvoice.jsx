import { Card, SimpleGrid, Text, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useParams } from "react-router-dom";
import InvoiceItemTable from "../Components/CreateUpdateInvoice/InvoiceItemTable";

const ViewInvoice = () => {
	const { invoice } = useParams();

	const invoiceItems = [{}];

	const testData = {
		customer: "TestCustomer",
		date: new Date(),
		emails: "test@gmail.com",
		makeModelReg: "YG50SSR",
		orderNo: "00114",
		preInspection: "None",
		termsOfTrade: "30",
		netPrice: 120,
		vatPrice: 0,
	};

	const formattedTerms = () => {
		switch (testData.termsOfTrade) {
			case "30":
				return "30 Days";
			case "7":
				return "7 Days";
			case "0":
				return "On Receipt";
			default:
				return "Error";
		}
	};

	return (
		<Card className="card center">
			<Title order={1}>Invoice {invoice}</Title>
			<br />
			<SimpleGrid cols={2}>
				<TextInput
					label="Customer Name"
					value={testData.customer}
					disabled
				/>
				<DatePicker label="Date Created" value={testData.date} disabled />
				<TextInput label="Emails" value={testData.emails} disabled />
				<TextInput
					label="Make/Model/Reg"
					value={testData.makeModelReg}
					disabled
				/>
				<TextInput label="Order Number" value={testData.orderNo} disabled />
				<TextInput
					label="Preinspection/Mileage"
					value={testData.preInspection}
					disabled
				/>
				<TextInput
					label="Terms of Trade"
					value={formattedTerms()}
					disabled
				/>
			</SimpleGrid>
			<InvoiceItemTable
				invoiceItems={
					[
						/** WRITE TEST DATA FOR INVOICE ITEMS */
					]
				}
				disabled
			/>
			<br />
			<div>
				<Text size="xl">Net: £{testData.netPrice.toFixed(2)}</Text>
				<Text size="xl">VAT: £{testData.vatPrice.toFixed(2)}</Text>
				<Title order={3}>
					Balance Due: £
					{(testData.netPrice + testData.vatPrice).toFixed(2)}
				</Title>
			</div>
		</Card>
	);
};

export default ViewInvoice;

// This file could probably just be combined with CreateUpdateInvoice

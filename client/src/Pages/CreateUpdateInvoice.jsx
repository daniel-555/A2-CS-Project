import {
	Button,
	Card,
	Select,
	SimpleGrid,
	Table,
	TextInput,
	Title,
} from "@mantine/core";

// I'm using react-icons for my site's icons, as they have a large variety.
import { BsHash, BsFillCalendarFill, BsFillTrashFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateUpdateInvoice = ({ action }) => {
	const { invoice } = useParams();

	// Filler data for customer selection, will be filled with actual customers in future
	const customerData = Array(50)
		.fill(0)
		.map((_, index) => `Customer ${index}`);

	const termsOfTradeData = [
		{ label: "30 Days", value: "30" },
		{ label: "7 Days", value: "7" },
		{ label: "On Receipt", value: "0" },
	];

	const vatRateData = [
		{ label: "20%", value: "20" },
		{ label: "Exempt", value: "NA" },
		{ label: "Zero", value: "0" },
	];

	// React state variables for the form, these are the variables that
	// will be sent to the server in a database post/patch request
	const [invoiceNumber, setInvoiceNumber] = useState();
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [termsOfTrade, setTermsOfTrade] = useState(null);
	const [dateCreated, setDateCreated] = useState(new Date());
	const [emails, setEmails] = useState("");
	const [vatRate, setVatRate] = useState(null);
	const [makeModelReg, setMakeModelReg] = useState("");
	const [preInspection, setPreInspection] = useState("");
	const [orderNumber, setOrderNumber] = useState("");
	const [invoiceItems, setInvoiceItems] = useState([]);

	const testItem = {
		id: 0,
		service: "Fit only",
		description: "Mercedes turismo screen",
		quantity: 1,
		vatRate: "20%",
		price: "£650",
		vat: `£${650 * 0.2}`,
		date: new Date(),
	};

	const rows = invoiceItems.map((item) => (
		<tr key={item.id}>
			<td>{item.service}</td>
			<td>{item.description}</td>
			<td>{item.quantity}</td>
			<td>{item.vatRate}</td>
			<td>{item.price}</td>
			<td>{item.vat}</td>
			<td>{item.date.toDateString()}</td>
			<td>
				<Button color="red.7" variant="outline" size="xs">
					<BsFillTrashFill />
				</Button>
			</td>
		</tr>
	));

	return (
		// This is the final rendered page
		<Card className="card center">
			<form>
				<Title order={1}>
					{/** This is a ternary operator, javascript's one liner solution to if statements. For this page's purpose, I'm using it to decide the page's title depending whether data is being created or updated. */}
					{action === "create"
						? "Create an Invoice"
						: `Edit Invoice ${invoice}`}
				</Title>
				<br />
				{/** The SimpleGrid component allows easy layout of inputs in the form */}
				<SimpleGrid cols={3} spacing="sm">
					<TextInput
						label="Invoice number"
						icon={<BsHash />}
						value={invoiceNumber}
						onChange={(e) => setInvoiceNumber(e.target.value)}
					/>
					<Select
						label="Customer name"
						placeholder="pick an option"
						searchable
						nothingFound="No customers with that name"
						data={customerData}
						value={selectedCustomer}
						onChange={setSelectedCustomer}
					/>
					<Select
						label="Terms of trade"
						placeholder="pick an option"
						data={termsOfTradeData}
						value={termsOfTrade}
						onChange={setTermsOfTrade}
					/>
					<TextInput
						label="Emails"
						icon={<IoMdMail />}
						placeholder="Separate emails with a comma"
						value={emails}
						onChange={(e) => setEmails(e.target.value)}
					/>
					<Select
						label="VAT rate"
						placeholder="pick an option"
						data={vatRateData}
						value={vatRate}
						onChange={setVatRate}
					/>
					<TextInput
						label="Make/Model/Registration"
						value={makeModelReg}
						onChange={(e) => setMakeModelReg(e.target.value)}
					/>
					<DatePicker
						label="Date created"
						icon={<BsFillCalendarFill />}
						value={dateCreated}
						onChange={setDateCreated}
					/>
					<TextInput
						label="Pre Inspection/Mileage"
						value={preInspection}
						onChange={(e) => setPreInspection(e.target.value)}
					/>
					<TextInput
						label="Order number"
						value={orderNumber}
						onChange={(e) => setOrderNumber(e.target.value)}
					/>
				</SimpleGrid>
				<br />
				<Table>
					<thead>
						<tr>
							<th>Product/Service</th>
							<th>Description</th>
							<th>Qty</th>
							<th>VAT Rate</th>
							<th>Amount</th>
							<th>VAT</th>
							<th>Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
				<br />
				<Button
					onClick={() => {
						setInvoiceItems([...invoiceItems, testItem]);
					}}
				>
					Add item
				</Button>
			</form>
		</Card>
	);
};

// This page will allow the user to create a new invoice or edit details on an existing one

export default CreateUpdateInvoice;

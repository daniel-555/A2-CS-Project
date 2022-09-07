import { Card, Select, SimpleGrid, TextInput, Title } from "@mantine/core";
import { BsHash, BsFillCalendarFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateUpdateInvoice = ({ action }) => {
	const { invoice } = useParams();

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

	const [invoiceNumber, setInvoiceNumber] = useState();
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [termsOfTrade, setTermsOfTrade] = useState(null);
	const [dateCreated, setDateCreated] = useState(new Date());
	const [emails, setEmails] = useState("");
	const [vatRate, setVatRate] = useState(null);
	const [makeModelReg, setMakeModelReg] = useState("");
	const [preInspection, setPreInspection] = useState("");
	const [orderNumber, setOrderNumber] = useState("");

	return (
		<Card className="card center">
			<form>
				<Title order={1}>
					{action === "create"
						? "Create an Invoice"
						: `Edit Invoice ${invoice}`}
				</Title>
				<br />
				<SimpleGrid cols={2} spacing="sm">
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
			</form>
		</Card>
	);
};

// This page will allow the user to create a new invoice or edit details on an existing one

export default CreateUpdateInvoice;

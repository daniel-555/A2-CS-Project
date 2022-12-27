import {
	Button,
	Card,
	Select,
	SimpleGrid,
	Table,
	Text,
	TextInput,
	Title,
} from "@mantine/core";

// I'm using react-icons for my site's icons, as they have a large variety.
import { BsHash, BsFillCalendarFill, BsFillTrashFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { openModal } from "@mantine/modals";
import InvoiceItemModal from "../Components/CreateUpdateInvoice/InvoiceItemModal";
import HomeButton from "../Components/HomeButton";
import InvoiceItemTable from "../Components/CreateUpdateInvoice/InvoiceItemTable";

const CreateUpdateInvoice = ({ action }) => {
	// Invoice number extracted from url query params
	const { invoice } = useParams();

	// Filler data for customer selection, will be filled with actual customers in prototype 3
	const customerData = Array(50)
		.fill(0)
		.map((_, index) => `Customer ${index}`);

	/* Initialises selections for termsOfTrade field. label is displayed to the user and value is stored in the database.
	Number values can be used to calculate due date when qeuerying the database
	 */
	const termsOfTradeData = [
		{ label: "30 Days", value: "30" },
		{ label: "7 Days", value: "7" },
		{ label: "On Receipt", value: "0" },
	];

	// React state variables for the form, these are the variables that
	// will be sent to the server in a database post/patch request
	const [invoiceNumber, setInvoiceNumber] = useState();
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [termsOfTrade, setTermsOfTrade] = useState(null);
	const [dateCreated, setDateCreated] = useState(new Date());
	const [emails, setEmails] = useState("");
	const [makeModelReg, setMakeModelReg] = useState("");
	const [preInspection, setPreInspection] = useState("");
	const [orderNumber, setOrderNumber] = useState("");
	const [invoiceItems, setInvoiceItems] = useState([]);
	const [itemCounter, setItemCounter] = useState(0);

	const [netPrice, setNetPrice] = useState(0);
	const [vatPrice, setVatPrice] = useState(0);

	// This function is responsible for opening the add item form & adding the submitted item
	// to the list invoiceItems
	const addItem = () => {
		// This callback function allows the InvoiceItemModal component to alter the state
		// of its parent component (i.e. this one).
		const addItemCallback = (newItem) => {
			// Appends the new item to the invoiceItems state
			setInvoiceItems([...invoiceItems, newItem]);
			setItemCounter(itemCounter + 1);

			// update the displayed net and vat prices
			setNetPrice(netPrice + newItem.price);
			setVatPrice(vatPrice + newItem.vat);
		};

		// Opens the modal that displays the InvoiceItemModal component
		openModal({
			title: <Title order={1}>Add an Item</Title>,
			centered: true,
			children: (
				<InvoiceItemModal callback={addItemCallback} id={itemCounter} />
			),
			size: "lg",
		});
	};

	// passed as the reset callback for the delete button in the InvoiceItemTable component
	const resetInvoiceItems = () => {
		setInvoiceItems([]);
		setNetPrice(0);
		setVatPrice(0);
	};

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
				<SimpleGrid cols={2} spacing="sm">
					<TextInput
						label="Invoice number"
						icon={<BsHash />}
						value={action === "create" ? invoiceNumber : invoice}
						onChange={(e) => setInvoiceNumber(e.target.value)}
						// Fields that have the disabled tag are only editable on a specific page such as the create page
						disabled={action === "update"}
					/>
					<Select
						label="Customer name"
						placeholder="pick an option"
						searchable
						nothingFound="No customers with that name"
						data={customerData}
						value={selectedCustomer}
						onChange={setSelectedCustomer}
						disabled={action === "update"}
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
						// This line of code allows the text input to be stored in state
						onChange={(e) => setEmails(e.target.value)}
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
						disabled={action === "update"}
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
				{/* Renders the invoice item table */}
				<InvoiceItemTable
					invoiceItems={invoiceItems}
					resetItemsCallback={resetInvoiceItems}
				/>
				<br />
				{/* This button opens the add item modal and is only visable when creating an invoice */}
				{action === "create" && (
					<Button onClick={() => addItem()} color="yellow.6">
						Add item
					</Button>
				)}
				<br />
				<br />
				{/* Displays the net and vat prices then calculates the total balance due */}
				<Text size="xl">Net: £{netPrice.toFixed(2)}</Text>
				<Text size="xl">VAT: £{vatPrice.toFixed(2)}</Text>
				<Title order={3}>
					Balance Due: £{(netPrice + vatPrice).toFixed(2)}
				</Title>
				<br />
				{/* Display the submit and home buttons side by side in a grid */}
				<SimpleGrid cols={2}>
					<Button color="yellow.6" size="lg">
						{action === "create" ? "Submit" : "Update"}
					</Button>
					<HomeButton />
				</SimpleGrid>
			</form>
		</Card>
	);
};

export default CreateUpdateInvoice;

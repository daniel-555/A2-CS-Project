// React Base
import { useEffect } from "react";
import { useState } from "react";

// React Router
import { useParams } from "react-router-dom";

// UI-related
import {
	Button,
	Card,
	Select,
	SimpleGrid,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { BsHash, BsFillCalendarFill, BsAt } from "react-icons/bs";
import { openModal } from "@mantine/modals";

// Components
import InvoiceItemModal from "../Components/CreateUpdateInvoice/InvoiceItemModal";
import InvoiceItemTable from "../Components/CreateUpdateInvoice/InvoiceItemTable";
import HomeButton from "../Components/HomeButton";

// Validation
import fieldMaxLengths from "../Validation/FieldMaxLengths";
import { collection, getDoc, getDocs, query, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-init";

const CreateUpdateInvoice = ({ action }) => {
	const { invoice } = useParams();

	const termsOfTradeData = [
		{ label: "30 Days", value: "30" },
		{ label: "7 Days", value: "7" },
		{ label: "On Receipt", value: "0" },
	];

	// React state variables for the form, these are the variables that
	// will be sent to the server in a database post/patch request
	const [invoiceNumber, setInvoiceNumber] = useState();
	const [customer, setCustomer] = useState(null);
	const [termsOfTrade, setTermsOfTrade] = useState(null);
	const [dateCreated, setDateCreated] = useState(new Date());
	const [email, setEmail] = useState("");
	const [makeModelReg, setMakeModelReg] = useState("");
	const [preInspection, setPreInspection] = useState("");
	const [orderNumber, setOrderNumber] = useState("");
	const [invoiceItems, setInvoiceItems] = useState([]);
	const [itemCounter, setItemCounter] = useState(0);

	const [customerData, setCustomerData] = useState([]);

	const [netPrice, setNetPrice] = useState(0);
	const [vatPrice, setVatPrice] = useState(0);

	// This function is responsible for opening the add item form & adding the submitted item
	// to the list invoiceItems
	const addItem = () => {
		// This callback function allows the InvoiceItemModal component to alter the state
		// of its parent component.
		const addItemCallback = (newItem) => {
			setInvoiceItems([...invoiceItems, newItem]);

			// Gives a unique ID for each item (required by table)
			setItemCounter(itemCounter + 1);

			setNetPrice(netPrice + newItem.price);
			setVatPrice(vatPrice + newItem.vat);
		};

		// Open the add item form
		openModal({
			title: <Title order={1}>Add an Item</Title>,
			centered: true,
			children: (
				<InvoiceItemModal callback={addItemCallback} id={itemCounter} />
			),
			size: "lg",
		});
	};

	// General function for changing state of string values
	const changeState = (value, setFunction, maxLength = 10) => {
		if (value.length > maxLength) return;

		setFunction(value);
	};

	// Get the selected customer's email from the database
	const populateCustomerDetails = async (selectedCustomer) => {
		const customerRef = doc(db, "Customers", selectedCustomer);
		const docSnap = await getDoc(customerRef);

		// Document has been retrieved
		if (docSnap.exists()) {
			// Populate the email field
			const doc = docSnap.data();
			setEmail(doc.email);
		} else {
			// Document wasn't found
			console.error("doc not found");
		}
	};

	// Executes when submit button is pressed
	const handleSubmit = () => {
		const invoiceData = {
			invoiceNumber,
			customer,
			termsOfTrade,
			customerData,
		};
	};

	// Clear the invoice items table
	const resetInvoiceItems = () => {
		setInvoiceItems([]);
		setNetPrice(0);
		setVatPrice(0);
	};

	// Runs on loading of the page
	useEffect(() => {
		// Get the data for the customers selection field from the database
		const createPageSetup = async () => {
			const customersQuery = query(collection(db, "Customers"));
			const querySnapshot = await getDocs(customersQuery);

			let customers = [];
			querySnapshot.forEach((doc) => {
				customers.push({ label: doc.data().companyName, value: doc.id });
			});
			setCustomerData(customers);
		};

		// Only runs when creating an invoice as the field is
		// disabled otherwise
		if (action === "create") createPageSetup();
	}, []);

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
						onChange={(e) =>
							changeState(
								e.target.value,
								setInvoiceNumber,
								fieldMaxLengths.invoiceNumber
							)
						}
						disabled={action === "update"}
					/>
					<Select
						label="Customer"
						placeholder="pick an option"
						searchable
						nothingFound="No customers with that name"
						data={customerData}
						value={customer}
						onChange={(selected) => {
							setCustomer(selected);
							populateCustomerDetails(selected);
						}}
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
						label="Email Address"
						icon={<BsAt />}
						value={email}
						// This line of code allows the text input to be stored in state
						onChange={(e) =>
							changeState(
								e.target.value,
								setEmail,
								fieldMaxLengths.email
							)
						}
					/>

					<TextInput
						label="Make/Model/Registration"
						value={makeModelReg}
						onChange={(e) =>
							changeState(
								e.target.value,
								setMakeModelReg,
								fieldMaxLengths.makeModelReg
							)
						}
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
						onChange={(e) =>
							changeState(
								e.target.value,
								setPreInspection,
								fieldMaxLengths.preInspection
							)
						}
					/>
					<TextInput
						label="Order number"
						value={orderNumber}
						onChange={(e) => changeState(e.target.value, setOrderNumber)}
					/>
				</SimpleGrid>
				<br />
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
				<Text size="xl">Net: £{netPrice.toFixed(2)}</Text>
				<Text size="xl">VAT: £{vatPrice.toFixed(2)}</Text>
				<Title order={3}>
					Balance Due: £{(netPrice + vatPrice).toFixed(2)}
				</Title>
				<br />
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

// This page will allow the user to create a new invoice or edit details on an existing one

export default CreateUpdateInvoice;

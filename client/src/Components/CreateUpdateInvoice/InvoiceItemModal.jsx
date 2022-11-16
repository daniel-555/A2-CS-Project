import {
	Button,
	NumberInput,
	Select,
	SimpleGrid,
	Text,
	Textarea,
	TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { closeAllModals } from "@mantine/modals";
import { useState } from "react";
import { BsCurrencyPound, BsFillCalendarFill } from "react-icons/bs";

const InvoiceItemModal = ({ callback, id }) => {
	const [service, setService] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [vatRate, setVatRate] = useState(null);
	const [price, setPrice] = useState(0);
	const [date, setDate] = useState(new Date());

	const vatRateData = [
		{ label: "20%", value: 0.2 },
		{ label: "Exempt", value: "NA" },
		{ label: "Zero", value: 0 },
	];

	const handleButtonPressed = () => {
		let formattedVatRate;
		switch (vatRate) {
			case 0.2:
				formattedVatRate = "20%";
				break;
			case 0:
				formattedVatRate = "Zero";
				break;
			default:
				formattedVatRate = "Exempt";
				break;
		}

		callback({
			id,
			service,
			description,
			quantity,
			vatRate: formattedVatRate,
			price: netPrice,
			vat: vatPrice,
			date,
		});
		closeAllModals();
	};

	// These variables update in real time when the state of the form is changed
	let netPrice = price * quantity;
	let vatPrice = netPrice * (vatRate === "NA" ? 0 : vatRate);
	let total = netPrice + vatPrice;

	return (
		<div>
			<form>
				<SimpleGrid cols={2} spacing="sm">
					<TextInput
						label="Product/Service"
						value={service}
						onChange={(e) => setService(e.target.value)}
					/>
					<NumberInput
						label="Quantity"
						value={quantity}
						onChange={(e) => setQuantity(e)}
					/>
					<Select
						label="VAT rate"
						placeholder="pick an option"
						data={vatRateData}
						value={vatRate}
						onChange={setVatRate}
					/>
					<NumberInput
						label="Price"
						icon={<BsCurrencyPound />}
						precision={2}
						value={price}
						onChange={(e) => setPrice(e)}
					/>
					<DatePicker
						label="Date of job"
						icon={<BsFillCalendarFill />}
						value={date}
						onChange={setDate}
					/>
					<Textarea
						label="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<SimpleGrid cols={1} spacing="xs">
						<Text size="sm">Net price: £{netPrice.toFixed(2)}</Text>
						<Text size="sm">Vat price: £{vatPrice.toFixed(2)}</Text>
						<Text size="lg">Total: £{total.toFixed(2)}</Text>
					</SimpleGrid>
					<br />
					{/* This button submits the form and adds the item to the table in CreateUpdateInvoice */}
					<Button onClick={handleButtonPressed} color="yellow.6">
						Add Item
					</Button>
				</SimpleGrid>
			</form>
		</div>
	);
};

export default InvoiceItemModal;

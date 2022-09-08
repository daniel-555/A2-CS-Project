import {
	Card,
	SimpleGrid,
	TextInput,
	Title,
	Button,
	Checkbox,
} from "@mantine/core";
import { useState } from "react";
import { BsFillCalendarFill, BsCurrencyPound } from "react-icons/bs";
import HomeButton from "../Components/HomeButton";
const VATReturn = () => {
	const [periodKey, setPeriodKey] = useState("");
	const [vatDueSales, setVatDueSales] = useState(0);
	const [vatReclaimed, setVatReclaimed] = useState(0);
	const [totalSalesExVat, setTotalSalesExVat] = useState(0);
	const [totalPurchasesExVat, setTotalPurchasesExVat] = useState(0);
	const [finalised, setFinalised] = useState(false);

	return (
		<Card className="card center">
			<form>
				<Title order={1}>Submit a VAT return</Title>
				<br />
				<SimpleGrid cols={2} spacing="sm">
					<TextInput
						label="Period key"
						icon={<BsFillCalendarFill />}
						value={periodKey}
						onChange={(e) => setPeriodKey(e.target.value)}
					/>
					<TextInput
						label="Vat due on sales"
						icon={<BsCurrencyPound />}
						value={vatDueSales}
						onChange={(e) => setVatDueSales(e.target.value)}
					/>
					<TextInput
						label="Vat reclaimed this period"
						icon={<BsCurrencyPound />}
						value={vatReclaimed}
						onChange={(e) => setVatReclaimed(e.target.value)}
					/>
					<TextInput
						label="Total sales excluding VAT"
						icon={<BsCurrencyPound />}
						value={totalSalesExVat}
						onChange={(e) => setTotalSalesExVat(e.target.value)}
					/>
					<TextInput
						label="Total purchases excluding VAT"
						icon={<BsCurrencyPound />}
						value={totalPurchasesExVat}
						onChange={(e) => setTotalPurchasesExVat(e.target.value)}
					/>
					<br />
					<Checkbox
						value={finalised}
						onChange={setFinalised}
						label="I confirm this data is correct"
					/>
					<br />
					<Button fullWidth size="lg" color="yellow.6">
						Submit
					</Button>
					<HomeButton />
				</SimpleGrid>
			</form>
		</Card>
	);
};
// This page will allow the user to submit a VAT return to HMRC, putting them through the necessary authentication to do so.

export default VATReturn;

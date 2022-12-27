// UI-Related
import {
	Card,
	SimpleGrid,
	TextInput,
	Title,
	Button,
	Checkbox,
} from "@mantine/core";
import { BsFillCalendarFill, BsCurrencyPound } from "react-icons/bs";

// React Base
import { useState } from "react";

// Custom Components
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
					{/* The user will have to confirm that data inputted is correct to make sure that they are not sending incorrect data to HMRC */}
					<Checkbox
						value={finalised}
						onChange={setFinalised}
						label="I confirm this data is correct"
					/>
					<br />
					{/* The user will be authenticated with HMRC and follow the flowchart as shown in my design stage */}
					<Button fullWidth size="lg" color="yellow.6">
						Submit
					</Button>
					<HomeButton />
				</SimpleGrid>
			</form>
		</Card>
	);
};

export default VATReturn;

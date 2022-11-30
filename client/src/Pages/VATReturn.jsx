import {
	Card,
	SimpleGrid,
	TextInput,
	Title,
	Button,
	Checkbox,
	NumberInput,
} from "@mantine/core";
import { useState } from "react";
import { BsFillCalendarFill, BsCurrencyPound } from "react-icons/bs";
import HomeButton from "../Components/HomeButton";

const VATReturn = () => {
	const vatDefault = {
		periodKey: "",
		vatDueSales: 0,
		vatReclaimedCurrPeriod: 0,
		totalValueSalesExVAT: 0,
		totalValuePurchasesExVAT: 0,
	};

	// const [periodKey, setPeriodKey] = useState("");
	// const [vatDueSales, setVatDueSales] = useState(0);
	// const [vatReclaimed, setVatReclaimed] = useState(0);
	// const [totalSalesExVat, setTotalSalesExVat] = useState(0);
	// const [totalPurchasesExVat, setTotalPurchasesExVat] = useState(0);
	const [finalised, setFinalised] = useState(false);

	const [vatData, setVatData] = useState(vatDefault);

	const changeState = (value, key, isNumber = false, maxLength = 10) => {
		if (!isNumber) if (value.length > maxLength) return;

		setVatData((vatData) => ({ ...vatData, [key]: value }));
	};

	return (
		<Card className="card center">
			<form>
				<Title order={1}>Submit a VAT return</Title>
				<br />
				<SimpleGrid cols={2} spacing="sm">
					<TextInput
						label="Period key"
						icon={<BsFillCalendarFill />}
						value={vatData.periodKey}
						onChange={(e) => changeState(e.target.value, "periodKey")}
					/>
					<NumberInput
						label="Vat due on sales"
						icon={<BsCurrencyPound />}
						value={vatData.vatDueSales}
						precision={2}
						onChange={(e) => changeState(e, "vatDueSales", true)}
					/>
					<NumberInput
						label="Vat reclaimed this period"
						icon={<BsCurrencyPound />}
						value={vatData.vatReclaimedCurrPeriod}
						precision={2}
						onChange={(e) =>
							changeState(e, "vatReclaimedCurrPeriod", true)
						}
					/>
					<NumberInput
						label="Total sales excluding VAT"
						icon={<BsCurrencyPound />}
						value={vatData.totalValueSalesExVAT}
						precision={2}
						onChange={(e) => changeState(e, "totalValueSalesExVAT", true)}
					/>
					<NumberInput
						label="Total purchases excluding VAT"
						icon={<BsCurrencyPound />}
						value={vatData.totalValuePurchasesExVAT}
						precision={2}
						onChange={(e) =>
							changeState(e, "totalValuePurchasesExVAT", true)
						}
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

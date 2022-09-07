import { Card, SimpleGrid, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateUpdateCustomer = ({ action }) => {
	const { customer } = useParams();

	const [invoiceNumber, setInvoiceNumber] = useState();
	return (
		<Card className="card center">
			<form>
				<SimpleGrid cols={1} spacing="sm">
					<Title order={1}>
						{action == "create"
							? "Create a customer"
							: `Edit ${customer}'s details`}
					</Title>
					<br />
					<TextInput
						label="Invoice number"
						value={invoiceNumber}
						onChange={(e) => setInvoiceNumber(e.target.value)}
					/>
				</SimpleGrid>
			</form>
		</Card>
	);
};

// This component will allow the user to create a new customer or edit the details of an existing one

export default CreateUpdateCustomer;

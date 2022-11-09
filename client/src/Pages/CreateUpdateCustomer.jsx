// React
import { useState } from "react";

// UI-related
import { Card, SimpleGrid, Title, TextInput, Button } from "@mantine/core";
import { BsAt, BsCursor, BsPersonSquare, BsTelephone } from "react-icons/bs";

// Routing
import { useParams } from "react-router-dom";

// Components
import HomeButton from "../Components/HomeButton";

// Functions
import createCustomer from "../Functions/CreateUpdateCustomer/createCustomer";

const CreateUpdateCustomer = ({ action }) => {
	const { customer } = useParams();

	const [companyName, setCompanyName] = useState("");
	const [addressLine1, setAddressLine1] = useState("");
	const [addressLine2, setAddressLine2] = useState("");
	const [postcode, setPostcode] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = () => {
		const customerData = {
			addressLine1,
			addressLine2,
			companyName,
			contactNo,
			email,
			postcode,
		};

		if (action === "create") {
			createCustomer(customerData);

			// Clear all the forms so data cannot be double submitted
			setCompanyName("");
			setAddressLine1("");
			setAddressLine2("");
			setPostcode("");
			setContactNo("");
			setEmail("");
		}
	};

	return (
		<Card className="card center">
			<form>
				<Title order={1}>
					{action === "create"
						? "Create a Customer"
						: `Update ${customer}'s Details`}
				</Title>
				<br />
				<SimpleGrid cols={2} spacing="sm">
					<TextInput
						label="Company Name"
						value={companyName}
						icon={<BsPersonSquare />}
						onChange={(e) => setCompanyName(e.target.value)}
					/>
					<TextInput
						label="Postcode"
						value={postcode}
						icon={<BsCursor />}
						onChange={(e) => setPostcode(e.target.value)}
					/>
					<TextInput
						label="Address Line 1"
						value={addressLine1}
						onChange={(e) => setAddressLine1(e.target.value)}
					/>
					<TextInput
						label="Address Line 2 (optional)"
						value={addressLine2}
						onChange={(e) => setAddressLine2(e.target.value)}
					/>
					<TextInput
						label="Contact Number"
						value={contactNo}
						icon={<BsTelephone />}
						onChange={(e) => setContactNo(e.target.value)}
					/>
					<TextInput
						label="Email Address"
						value={email}
						icon={<BsAt />}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</SimpleGrid>
				<br />
				<br />
				<SimpleGrid cols={2}>
					<Button color="yellow.6" size="lg" onClick={handleSubmit}>
						{action === "create" ? "Submit" : "Update"}
					</Button>
					<HomeButton />
				</SimpleGrid>
			</form>
		</Card>
	);
};

// This component will allow the user to create a new customer or edit the details of an existing one

export default CreateUpdateCustomer;

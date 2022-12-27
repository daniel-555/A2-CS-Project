// UI-Related
import { Card, SimpleGrid, Title, TextInput, Button } from "@mantine/core";
import { BsAt, BsCursor, BsPersonSquare, BsTelephone } from "react-icons/bs";

// React Base
import { useState } from "react";

// React Router
import { useParams } from "react-router-dom";

// Custom components
import HomeButton from "../Components/HomeButton";

const CreateUpdateCustomer = ({ action }) => {
	// customer ID extracted from url query params
	const { customer } = useParams();

	const [companyName, setCompanyName] = useState();
	const [addressLine1, setAddressLine1] = useState();
	const [addressLine2, setAddressLine2] = useState();
	const [postcode, setPostcode] = useState();
	const [contactNo, setContactNo] = useState();
	const [email, setEmail] = useState();

	return (
		<Card className="card center">
			<form>
				<Title order={1}>
					{/* Different content displayed based on if the page is create or update */}
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
					{/* This button will run all validations then send data off to the database to be created or updated based on the page action */}
					<Button color="yellow.6" size="lg">
						{action === "create" ? "Submit" : "Update"}
					</Button>
					<HomeButton />
				</SimpleGrid>
			</form>
		</Card>
	);
};

export default CreateUpdateCustomer;

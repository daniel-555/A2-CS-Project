// React
import { useEffect, useState } from "react";

// UI-related
import { Card, SimpleGrid, Title, TextInput, Button } from "@mantine/core";
import { BsAt, BsCursor, BsPersonSquare, BsTelephone } from "react-icons/bs";

// Routing
import { useParams } from "react-router-dom";

// Components
import HomeButton from "../Components/HomeButton";

// Values
import fieldMaxLengths from "../Validation/FieldMaxLengths";

// Functions
import createCustomer from "../Functions/CreateUpdateCustomer/createCustomer";
import { validateEmail, validateMobile } from "../Validation/FieldValidation";
import { invalidNotification } from "../Functions/presetNotifications";
import updateCustomer from "../Functions/CreateUpdateCustomer/updateCustomer";
import getCustomerInfo from "../Functions/CreateUpdateCustomer/getCustomerInfo";

const CreateUpdateCustomer = ({ action }) => {
	// Parse the customer ID from the url
	const { customerID } = useParams();

	const customerDefault = {
		companyName: "",
		address1: "",
		address2: "",
		postcode: "",
		contactNo: "",
		email: "",
	};

	const [customerData, setCustomerData] = useState(customerDefault);

	// Generalised function to change state in the form.
	// maxLength input is to limit the length of strings that shouldn't be long
	// the default maximum is 10 characters
	const changeState = (value, key, maxLength = 10) => {
		if (value.length <= maxLength) {
			setCustomerData((customerData) => ({ ...customerData, [key]: value }));
		}
	};

	// Runs when the submit button is pressed
	const handleSubmit = () => {
		// validate that fields are in the correct format
		let formOk = true;

		if (validateEmail(customerData.email) === false) {
			invalidNotification("Email");
			formOk = false;
		}
		if (validateMobile(customerData.contactNo) === false) {
			invalidNotification("Mobile");
			formOk = false;
		}

		// Break from the function if an error was detected above
		if (formOk === false) return;

		if (action === "create") {
			createCustomer(customerData);

			// Clear all the forms so data cannot be double submitted
			setCustomerData(customerDefault);
		}
		if (action === "update") {
			updateCustomer(customerID, customerData);
		}
	};

	// Runs when the page is "mounted" (ie when it is first loaded)
	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await getCustomerInfo(customerID);
			console.log(fetchedData);
			setCustomerData(fetchedData);
		};

		// Only get customer data when on the update page
		if (action === "update") fetchData();
	}, []);

	return (
		<Card className="card center">
			<form>
				<Title order={1}>
					{action === "create"
						? "Create a Customer"
						: `Update ${customerData.companyName}'s Details`}
				</Title>
				<br />
				<SimpleGrid cols={2} spacing="sm">
					<TextInput
						label="Company Name"
						value={customerData.companyName}
						icon={<BsPersonSquare />}
						onChange={(e) =>
							changeState(
								e.target.value,
								"companyName",
								fieldMaxLengths.companyName
							)
						}
					/>
					<TextInput
						label="Postcode"
						value={customerData.postcode}
						icon={<BsCursor />}
						onChange={(e) =>
							changeState(
								e.target.value,
								"postcode",
								fieldMaxLengths.postcode
							)
						}
					/>
					<TextInput
						label="Address Line 1"
						value={customerData.address1}
						onChange={(e) => {
							changeState(
								e.target.value,
								"address1",
								fieldMaxLengths.address
							);
						}}
					/>
					<TextInput
						label="Address Line 2 (optional)"
						value={customerData.address2}
						onChange={(e) =>
							changeState(
								e.target.value,
								"address2",
								fieldMaxLengths.addressLine
							)
						}
					/>
					<TextInput
						label="Contact Number"
						value={customerData.contactNo}
						icon={<BsTelephone />}
						onChange={(e) =>
							changeState(
								e.target.value,
								"contactNo",
								fieldMaxLengths.contactNo
							)
						}
					/>
					<TextInput
						label="Email Address"
						value={customerData.email}
						icon={<BsAt />}
						onChange={(e) =>
							changeState(e.target.value, "email", fieldMaxLengths.email)
						}
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

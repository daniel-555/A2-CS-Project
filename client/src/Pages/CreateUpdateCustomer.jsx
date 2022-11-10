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
	const { customerID } = useParams();

	// Refactor into an object _____
	const [companyName, setCompanyName] = useState("");
	const [addressLine1, setAddressLine1] = useState("");
	const [addressLine2, setAddressLine2] = useState("");
	const [postcode, setPostcode] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [email, setEmail] = useState("");

	// Generalised function to change state in the form.
	// maxLength input is to limit the length of strings that shouldn't be long
	const changeState = (element, updateFunction, maxLength = 10) => {
		if (element.length <= maxLength) {
			updateFunction(element);
		}
	};

	// Runs when the submit button is pressed
	const handleSubmit = () => {
		// validate that fields are in the correct format
		let formOk = true;

		if (validateEmail(email) === false) {
			invalidNotification("Email");
			formOk = false;
		}
		if (validateMobile(contactNo) === false) {
			invalidNotification("Mobile");
			formOk = false;
		}

		// Break from the function if an error was detected above
		if (formOk === false) return;

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
		if (action === "update") {
			updateCustomer(customerID, customerData);
		}
	};

	// Runs when the page is "mounted" (ie when it is first loaded)
	useEffect(() => {
		const fetchData = async () => {
			const customerData = await getCustomerInfo(customerID);

			// Refactor to object
			setCompanyName(customerData.companyName);
			setAddressLine1(customerData.addressLine1);
			setAddressLine2(customerData.addressLine2);
			setPostcode(customerData.postcode);
			setContactNo(customerData.contactNo);
			setEmail(customerData.email);
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
						: `Update ${companyName}'s Details`}
				</Title>
				<br />
				<SimpleGrid cols={2} spacing="sm">
					<TextInput
						label="Company Name"
						value={companyName}
						icon={<BsPersonSquare />}
						onChange={(e) =>
							changeState(
								e.target.value,
								setCompanyName,
								fieldMaxLengths.companyName
							)
						}
					/>
					<TextInput
						label="Postcode"
						value={postcode}
						icon={<BsCursor />}
						onChange={(e) =>
							changeState(
								e.target.value,
								setPostcode,
								fieldMaxLengths.postcode
							)
						}
					/>
					<TextInput
						label="Address Line 1"
						value={addressLine1}
						onChange={(e) => {
							changeState(
								e.target.value,
								setAddressLine1,
								fieldMaxLengths.addressLine
							);
						}}
					/>
					<TextInput
						label="Address Line 2 (optional)"
						value={addressLine2}
						onChange={(e) =>
							changeState(
								e.target.value,
								setAddressLine2,
								fieldMaxLengths.addressLine
							)
						}
					/>
					<TextInput
						label="Contact Number"
						value={contactNo}
						icon={<BsTelephone />}
						onChange={(e) =>
							changeState(
								e.target.value,
								setContactNo,
								fieldMaxLengths.contactNo
							)
						}
					/>
					<TextInput
						label="Email Address"
						value={email}
						icon={<BsAt />}
						onChange={(e) =>
							changeState(
								e.target.value,
								setEmail,
								fieldMaxLengths.email
							)
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

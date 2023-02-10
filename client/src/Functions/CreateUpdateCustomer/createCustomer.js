// UI-related
import { AiOutlineCheck } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";

// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { addDoc, collection } from "firebase/firestore";

const createCustomer = (customerData) => {
	// Tell the user that the action has started
	showNotification({
		id: "await-add",
		title: "Form submitted",
		message: "Adding customer to database",
		loading: true,
		autoClose: false,
		disallowClose: true,
	});

	// reference to the Customers collection
	const collectionRef = collection(db, "Customers");

	// Add the customerData to the database
	addDoc(collectionRef, customerData).then(() => {
		// Tell the user that the action has been completed
		updateNotification({
			id: "await-add",
			title: "Customer added",
			icon: <AiOutlineCheck />,
			color: "teal",
		});

		// Wait 1 second then refresh the page
		setTimeout(() => window.location.reload(), 1000);
	});
};

export default createCustomer;

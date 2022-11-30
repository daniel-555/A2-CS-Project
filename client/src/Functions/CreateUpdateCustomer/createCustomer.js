// UI-related
import { AiOutlineCheck } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";

// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { addDoc, collection } from "firebase/firestore";

const createCustomer = (customerData) => {
	showNotification({
		id: "await-add",
		title: "Form submitted",
		message: "Adding customer to database",
		loading: true,
		autoClose: false,
		disallowClose: true,
	});

	const collectionRef = collection(db, "Customers");

	addDoc(collectionRef, customerData).then(() => {
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

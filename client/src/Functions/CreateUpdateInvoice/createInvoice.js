// UI-related
import { AiOutlineCheck } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";

// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { doc, setDoc } from "firebase/firestore";

const createInvoice = (invoiceNumber, invoiceData) => {
	// Alert the user that the function has started running
	showNotification({
		id: "await-add",
		title: "Form submitted",
		message: "Adding invoice to database",
		loading: true,
		autoClose: false,
		disallowClose: true,
	});

	const docRef = doc(db, "Invoices", invoiceNumber);

	// Create the document in the database
	setDoc(docRef, invoiceData).then(() => {
		// Tell the user that the action has been completed
		updateNotification({
			id: "await-add",
			title: "Invoice added",
			icon: <AiOutlineCheck />,
			color: "teal",
		});
		// Wait 1 second then refresh the page
		setTimeout(() => window.location.reload(), 1000);
	});
};

export default createInvoice;

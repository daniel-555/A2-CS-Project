// UI-related
import { AiOutlineCheck } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";

// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { setDoc, doc } from "firebase/firestore";

const updateInvoice = (invoiceNumber, invoiceData) => {
	const docRef = doc(db, "Invoices", invoiceNumber);
	showNotification({
		id: "await-update",
		title: "Form submitted",
		message: "Updating invoice info",
		loading: true,
		autoClose: false,
		disallowClose: true,
	});

	// Update the document in the database
	setDoc(docRef, invoiceData).then(() => {
		// Tell the user the action has been completed
		updateNotification({
			id: "await-update",
			title: "Invoice updated",
			icon: <AiOutlineCheck />,
			color: "teal",
		});
		// Wait 1 second then refresh the page
		setTimeout(() => window.location.reload(), 1000);
	});
};
export default updateInvoice;

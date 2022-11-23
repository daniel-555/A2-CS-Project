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

	setDoc(docRef, invoiceData).then(() =>
		updateNotification({
			id: "await-update",
			title: "Invoice updated",
			icon: <AiOutlineCheck />,
			color: "teal",
		})
	);
};
export default updateInvoice;

// UI-related
import { AiOutlineCheck } from "react-icons/ai";
import { showNotification, updateNotification } from "@mantine/notifications";

// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { setDoc, doc } from "firebase/firestore";

const updateCustomer = (customerID, customerData) => {
	const docRef = doc(db, "Customers", customerID);

	showNotification({
		id: "await-update",
		title: "Form submitted",
		message: "Updating customer info",
		loading: true,
		autoClose: false,
		disallowClose: true,
	});

	setDoc(docRef, customerData).then(() => {
		updateNotification({
			id: "await-update",
			title: "Customer updated",
			icon: <AiOutlineCheck />,
			color: "teal",
		});

		// Wait 1 second then refresh the page
		setTimeout(() => window.location.reload(), 1000);
	});
};

export default updateCustomer;

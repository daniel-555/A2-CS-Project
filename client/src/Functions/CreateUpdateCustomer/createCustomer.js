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

	addDoc(collection(db, "Customers"), customerData).then(() =>
		updateNotification({
			id: "await-add",
			title: "Customer added",
			icon: <AiOutlineCheck />,
			color: "teal",
		})
	);
};

export default createCustomer;

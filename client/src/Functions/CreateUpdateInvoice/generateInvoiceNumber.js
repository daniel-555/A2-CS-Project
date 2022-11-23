// Firebase (backend)
import { getCountFromServer, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-init";

const generateInvoiceNumber = async () => {
	// Retrieve the number of invoices in the database
	// This count can be used to generate an invoice number as invoices won't be deleted
	const collectionRef = collection(db, "Invoices");
	const snapshot = await getCountFromServer(collectionRef);

	// Get the next number
	let nextNumber = (snapshot.data().count + 1).toString();

	//Make the number into the requrired 4 digit format
	while (nextNumber.length < 4) {
		nextNumber = "0" + nextNumber;
	}

	// Returns the formatted number
	return `INV${nextNumber}`;
};

export default generateInvoiceNumber;

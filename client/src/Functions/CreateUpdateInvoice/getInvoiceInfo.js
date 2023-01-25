// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { getDoc, doc } from "firebase/firestore";

// Retrieve the inputted invoice's data from the database (effectively a getter function)
const getInvoiceInfo = async (invoiceNumber) => {
	const docRef = doc(db, "Invoices", invoiceNumber);

	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// The invoice has been found
		return docSnap.data();
	} else {
		// The invoice doens't exist
		return false;
	}
};

export default getInvoiceInfo;

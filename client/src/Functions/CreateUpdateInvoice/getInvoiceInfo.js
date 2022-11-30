// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { getDoc, doc } from "firebase/firestore";

const getInvoiceInfo = async (invoiceNumber) => {
	const docRef = doc(db, "Invoices", invoiceNumber);

	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return false;
	}
};

export default getInvoiceInfo;

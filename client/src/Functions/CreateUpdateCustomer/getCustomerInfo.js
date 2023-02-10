// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { getDoc, doc } from "firebase/firestore";

// retrieves the customer's info from the database and sends it back to the CreateUpdateInvoice component
const getCustomerInfo = async (customerID) => {
	const docRef = doc(db, "Customers", customerID);

	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// customer has been found
		return docSnap.data();
	} else {
		// provided customerID couldn't be located
		return false;
	}
};

export default getCustomerInfo;

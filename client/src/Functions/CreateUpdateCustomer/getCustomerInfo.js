// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { getDoc, doc } from "firebase/firestore";

const getCustomerInfo = async (customerID) => {
	const docRef = doc(db, "Customers", customerID);

	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return false;
	}
};

export default getCustomerInfo;

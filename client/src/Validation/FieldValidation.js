export const validateEmail = (email) => {
	// regex is a way of generalising a formt of string
	const validEmail =
		//     any set of characters      @ domain     .  com, co.uk, etc
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (email.match(validEmail)) {
		// the email is of the correct format
		return true;
	} else {
		// email is invalid
		return false;
	}
};

export const validateMobile = (number) => {
	// Check that the given input only contains numbers & spaces
	const validMobile = /^[0-9 ]*$/;

	if (number.match(validMobile) && number.length > 0) {
		return true;
	} else {
		return false;
	}
};

export const validateInvoiceNumber = (invoiceNumber) => {
	const validNumber = /^INV[0-9]{4}$/;

	if (invoiceNumber.match(validNumber)) {
		return true;
	} else {
		return false;
	}
};

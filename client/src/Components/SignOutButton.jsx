// UI-related
import { Affix, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { AiOutlineCheck } from "react-icons/ai";

// Firebase (backend)
import { auth } from "../firebase/firebase-init";
import { signOut } from "firebase/auth";

const SignOutButton = () => {
	// This activates when the button is pressed
	const logout = () => {
		// Firebase's built-in funciton that signs a user out
		signOut(auth)
			// This is JavaScript's promise syntax. The code in .then isn't
			// executed until the user has been confirmed signed out
			.then(() =>
				// This code displays a notification on the screen
				showNotification({
					title: "Signed Out",
					icon: <AiOutlineCheck />,
					color: "teal",
					autoClose: 2000,
				})
			)
			.catch((error) => console.log(error));
	};

	return (
		<Affix position={{ top: 20, right: 20 }}>
			<Button color="yellow.6" size="md" onClick={logout}>
				Sign Out
			</Button>
		</Affix>
	);
};

export default SignOutButton;

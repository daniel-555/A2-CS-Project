// UI-related
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

// Firebase (backend)
import { auth } from "./firebase/firebase-init";
import { useAuthState } from "react-firebase-hooks/auth";

// Base Components
import SignedIn from "./Components/Base/SignedIn";
import SignedOut from "./Components/Base/SignedOut";

const App = () => {
	// This code checks whether or not the user is signed in
	const [user] = useAuthState(auth);

	return (
		<MantineProvider>
			<ModalsProvider>
				<NotificationsProvider>
					{user ? <SignedIn /> : <SignedOut />}
				</NotificationsProvider>
			</ModalsProvider>
		</MantineProvider>
	);
	// Test code to override the sign in feature.
	// return <SignedIn />;
};

// This file is the base of the whole application.

export default App;

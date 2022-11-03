// UI-related modules
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

// Firebase (backend) modules
import { auth } from "./firebase/firebase-init";
import { useAuthState } from "react-firebase-hooks/auth";

// Base Components
import SignedIn from "./Components/Base/SignedIn";
import SignedOut from "./Components/Base/SignedOut";

const App = () => {
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
	return <SignedIn />;
};

// This file is the base of the whole application. It routes all of the different pages to the code each one should run.

export default App;

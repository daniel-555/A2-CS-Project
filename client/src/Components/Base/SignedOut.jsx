// UI-related
import { Button, Card, Title } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";

// Firebase (backend)
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase-init";

const SignedOut = () => {
	// Sign the user in using their google account
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	return (
		<Card className="card center">
			<Title order={1}>Welcome to &lt;PROJECT NAME&gt;</Title>
			<br />
			<Button
				size="xl"
				variant="outline"
				color="yellow.6"
				leftIcon={<FcGoogle />}
				rightIcon={<FcGoogle />}
				onClick={signInWithGoogle}
				fullWidth
			>
				Sign In With Google
			</Button>
		</Card>
	);
};

export default SignedOut;

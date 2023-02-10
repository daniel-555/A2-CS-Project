// UI-related
import { Button, Card, Text, Title } from "@mantine/core";
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
		<Card className="card center" sx={{ width: "40%", textAlign: "center" }}>
			<Title order={1}>Welcome to VIMS</Title>
			<Text>The VAT and Invoice Management System</Text>
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

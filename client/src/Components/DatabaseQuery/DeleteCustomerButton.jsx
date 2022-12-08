// UI-related
import { ActionIcon, Button, Title } from "@mantine/core";
import { BsTrashFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";

// Firebase (backend)
import { db } from "../../firebase/firebase-init";
import { deleteDoc, doc } from "firebase/firestore";

const DeleteCustomerButton = ({ id }) => {
	// When the red delete button is pressed
	const handleClick = () => {
		// Opens the confirmation form
		openModal({
			title: <Title order={2}>Are You Sure?</Title>,
			centered: true,
			size: "auto",
			overlayBlur: 10,
			children: (
				<Button
					size="lg"
					variant="gradient"
					gradient={{ from: "orange.6", to: "yellow.6" }}
					fullWidth
					onClick={handleConfirmed}
				>
					Confirm
				</Button>
			),
		});
	};

	// When the deletion has been confirmed by the user
	const handleConfirmed = () => {
		// Tell the user that the confirm button has been pressed
		closeAllModals();
		showNotification({
			id: "await-delete",
			title: "Confirmed",
			message: "Deleting Customer",
			loading: true,
			autoClose: false,
			disallowClose: true,
		});

		// Database reference to the document with the assigned id
		const docRef = doc(db, "Customers", id);
		deleteDoc(docRef)
			.then(() => {
				// Tell the user the action has been completed
				updateNotification({
					id: "await-delete",
					title: "Customer deleted",
					icon: <AiOutlineCheck />,
					color: "teal",
				});
				// Wait 1 second and refresh the page
				setTimeout(() => window.location.reload(), 1000);
			})
			.catch(console.error);
	};
	return (
		<ActionIcon variant="outline" color="red" onClick={handleClick}>
			<BsTrashFill />
		</ActionIcon>
	);
};

export default DeleteCustomerButton;

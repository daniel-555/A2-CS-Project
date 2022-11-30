import { showNotification } from "@mantine/notifications";
import { BiErrorCircle } from "react-icons/bi";

export const notFoundNotification = (fieldName) => {
	showNotification({
		title: `That ${fieldName} does not exist`,
		color: "red",
		icon: <BiErrorCircle />,
	});
};

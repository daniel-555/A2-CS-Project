import { showNotification } from "@mantine/notifications";
import { BiErrorCircle } from "react-icons/bi";

export const invalidNotification = (fieldName) => {
	showNotification({
		title: `Invalid ${fieldName}`,
		color: "red",
		icon: <BiErrorCircle />,
	});
};

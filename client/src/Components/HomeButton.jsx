import { Button } from "@mantine/core";
// This component has the sole purpose of sending the user back to the home page,
// regardless of where they are on the site.

const HomeButton = ({ size }) => {
	// clickable functionality will be added in prototype 3
	const handleClick = () => {};
	return (
		<Button
			fullWidth
			// If a size isn't supplied use large as a default
			size={size || "lg"}
			color="gray.7"
			variant="outline"
			onClick={handleClick}
		>
			Home
		</Button>
	);
};

export default HomeButton;

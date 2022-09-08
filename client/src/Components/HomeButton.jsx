import { Button } from "@mantine/core";

// This component has the sole purpose of sending the user back to the home page,
// regardless of where they are on the site.

const HomeButton = () => {
	const handleClick = () => {};
	return (
		<Button
			fullWidth
			size="lg"
			color="gray.7"
			variant="outline"
			onClick={handleClick}
		>
			Back
		</Button>
	);
};

export default HomeButton;

import { Table, Button } from "@mantine/core";
import { BsFillTrashFill } from "react-icons/bs";

const InvoiceItemTable = ({ invoiceItems, disabled, resetItemsCallback }) => {
	// This array stores the invoice items formatted into table rows, which can be supplied
	// as the table's body
	const rows = invoiceItems.map((item) => (
		<tr key={item.id}>
			<td>{item.service}</td>
			<td>{item.description}</td>
			<td>{item.quantity}</td>
			<td>{item.vatRate}</td>
			<td>{item.price.toFixed(2)}</td>
			<td>{item.vat.toFixed(2)}</td>
			<td>{item.date.toDateString()}</td>
		</tr>
	));

	return (
		<Table>
			<thead>
				<tr>
					<th>Product/Service</th>
					<th>Description</th>
					<th>Qty</th>
					<th>VAT Rate</th>
					<th>Net Price</th>
					<th>VAT</th>
					<th>Date</th>
					<th>
						{/* This button deletes all of the invoice items and is only
									visable when creating an invoice */}
						{disabled || (
							<Button
								color="red"
								variant="outline"
								onClick={resetItemsCallback}
								size="xs"
							>
								<BsFillTrashFill />
							</Button>
						)}
					</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default InvoiceItemTable;

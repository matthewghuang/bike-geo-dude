import React from "react"
import { Bike } from "../types/bike"
import {
	Box,
	Paper,
	Divider,
	Button,
	Table,
	TableBody,
	TableRow,
	TableCell
} from "@material-ui/core"

interface Props {
	bikes: Bike[]
	delete_handler: (index: number) => void
}

export const BikesDisplay: React.FC<Props> = ({ bikes, delete_handler }) => {
	return (
		<>
			{Object.values(bikes).map((bike, i) => (
				<Box component={Paper} mb={1}>
					<Box
						p={1}
						display="flex"
						style={{ alignItems: "center", justifyContent: "space-between" }}
					>
						<Box color={bike.color} p={1}>
							{bike.name}
						</Box>
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => delete_handler(i)}
						>
							Delete
						</Button>
					</Box>
					<Divider orientation="horizontal"></Divider>
					<Box p={1}>
						<Table component={Paper}>
							{Object.entries(bike.measurements).map(([name, measurement]) => (
								<TableRow>
									<TableCell>{name}</TableCell>
									<TableCell>{Math.floor(measurement.length + 0.5)}</TableCell>
								</TableRow>
							))}
						</Table>
					</Box>
				</Box>
			))}
		</>
	)
}

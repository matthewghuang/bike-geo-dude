import React from "react"
import { Bike } from "../types/bike"
import { Box, Paper, Button, Grid } from "@material-ui/core"

export const BikesDisplay: React.FC<{
	bikes: Bike[]
	edit_handler: (index: number) => void
	delete_handler: (index: number) => void
}> = ({ bikes, edit_handler, delete_handler }) => {
	return (
		<>
			{Object.values(bikes).map((bike, i) => (
				<Box component={Paper} mb={1}>
					<Box p={1} display="flex" style={{ alignItems: "center" }}>
						<Box component={Paper} color="white" bgcolor={bike.color} p={1}>
							{bike.name}
						</Box>
						<Box ml="auto">
							<Box mr={1} display="inline">
								<Button
									variant="outlined"
									color="secondary"
									onClick={() => edit_handler(i)}
								>
									Edit
								</Button>
							</Box>

							<Button
								variant="outlined"
								color="secondary"
								onClick={() => delete_handler(i)}
							>
								Delete
							</Button>
						</Box>
					</Box>
				</Box>
			))}
		</>
	)
}

import React from "react"
import { Bike } from "../types/bike"
import { Typography, Button } from "@material-ui/core"

interface Props {
	add_bike_handler: (bike: Bike) => void
}

export const AddBikeForm: React.FC<Props> = ({ add_bike_handler }) => {
	return (
		<>
			<Typography variant="h1">test</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={() => add_bike_handler(undefined)}
			>
				Add Bike
			</Button>
		</>
	)
}

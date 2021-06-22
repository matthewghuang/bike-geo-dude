import React, { Fragment, useState } from "react"
import { Box, Paper, Button, Divider } from "@material-ui/core"
import { Bike, BikeParameters } from "../types/bike"
import { BikeParameterForm } from "./BikeParameterForm"

export const BikeDisplay: React.FC<{
	bike: Bike
	set_name: (name: string) => void
	set_color: (color: string) => void
	set_parameters: (parameters: BikeParameters) => void
	delete_bike: () => void
	hide_bike: () => void
}> = ({
	bike,
	set_name,
	set_color,
	set_parameters,
	delete_bike,
	hide_bike
}) => {
	const [editing, set_editing] = useState<boolean>(false)

	return (
		<Fragment>
			<Box component={Paper} mb={1}>
				<Box p={1} display="flex" style={{ alignItems: "center" }}>
					<Box
						component={!bike.hidden && Paper}
						color={bike.hidden ? "black" : "white"}
						bgcolor={!bike.hidden && bike.color}
						p={1}
						onClick={hide_bike}
					>
						{bike.name}
					</Box>
					<Box ml="auto">
						<Box mr={1} display="inline">
							<Button
								variant={editing ? "contained" : "outlined"}
								color="secondary"
								onClick={() => set_editing(!editing)}
							>
								Edit
							</Button>
						</Box>

						<Button variant="outlined" color="secondary" onClick={delete_bike}>
							Delete
						</Button>
					</Box>
				</Box>
				{editing && (
					<Fragment>
						<Divider orientation="horizontal"></Divider>
						<Box p={1}>
							<BikeParameterForm
								name={bike.name}
								color={bike.color}
								parameters={bike.parameters}
								set_name={set_name}
								set_color={set_color}
								set_parameters={set_parameters}
							/>
						</Box>
					</Fragment>
				)}
			</Box>
		</Fragment>
	)
}

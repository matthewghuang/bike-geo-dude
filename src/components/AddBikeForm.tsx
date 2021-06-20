import React from "react"
import { Bike } from "../types/bike"
import { Button, Box, Grid, TextField, MenuItem } from "@material-ui/core"
import { BikeParameters } from "../types/bike"

const AddBikeButton: React.FC<{
	name: string
	color: string
	parameters: BikeParameters
	handler: (bike: Bike) => void
}> = props => {
	return (
		<Button
			variant="contained"
			color="primary"
			fullWidth
			onClick={() =>
				props.handler(new Bike(props.name, props.color, props.parameters))
			}
		>
			Add Bike
		</Button>
	)
}

const GridInput: React.FC<{
	label: string
	value: string
	handler: (new_value: string) => void
	input_props?: Object
}> = props => {
	return (
		<Grid item xs={6}>
			<TextField
				fullWidth
				label={props.label}
				value={props.value}
				onChange={ev => props.handler(ev.target.value)}
				{...props.input_props}
			></TextField>
		</Grid>
	)
}

export const AddBikeForm: React.FC<{
	name: string
	color: string
	parameters: BikeParameters
	set_name: (value: string) => void
	set_color: (value: string) => void
	set_parameters: (value: BikeParameters) => void
	add_bike_handler: (bike: Bike) => void
	cancel_handler: () => void
}> = props => {
	return (
		<>
			<Box mb={1}>
				<AddBikeButton
					name={props.name}
					color={props.color}
					parameters={props.parameters}
					handler={props.add_bike_handler}
				/>
			</Box>
			<Box mb={1}>
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					onClick={props.cancel_handler}
				>
					Cancel
				</Button>
			</Box>
			<Grid container spacing={1}>
				<GridInput label="name" value={props.name} handler={props.set_name} />
				<GridInput
					label="color"
					value={props.color}
					handler={props.set_color}
				/>

				{Object.entries(props.parameters).map(([name, parameter]) => (
					<GridInput
						label={name}
						value={parameter}
						handler={new_value => {
							const obj = { ...props.parameters }
							obj[name] = Number(new_value)
							props.set_parameters(obj)
						}}
						input_props={{ type: "number", inputProps: { min: 0 } }}
					/>
				))}
			</Grid>
		</>
	)
}

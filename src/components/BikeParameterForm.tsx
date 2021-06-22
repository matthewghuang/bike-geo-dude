import React, { Fragment } from "react"
import { Bike } from "../types/bike"
import { Button, Box, Grid, TextField, MenuItem } from "@material-ui/core"
import { BikeParameters } from "../types/bike"

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

export const BikeParameterForm: React.FC<{
	name: string
	color: string
	parameters: BikeParameters
	set_name: (value: string) => void
	set_color: (value: string) => void
	set_parameters: (value: BikeParameters) => void
}> = props => {
	return (
		<Fragment>
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
							obj[name] = new_value == "0" ? undefined : Number(new_value)
							props.set_parameters(obj)
						}}
						input_props={{ type: "number", inputProps: { min: 0 } }}
					/>
				))}
			</Grid>
		</Fragment>
	)
}

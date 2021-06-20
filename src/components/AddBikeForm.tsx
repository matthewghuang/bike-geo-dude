import React, { useState } from "react"
import { Bike } from "../types/bike"
import { Button, Box, Grid, TextField, MenuItem } from "@material-ui/core"
import { ParameterInput } from "./ParameterInput"
import { BikeParameters } from "../types/bike"

interface Props {
	add_bike_handler: (bike: Bike) => void
}

export const AddBikeForm: React.FC<Props> = ({ add_bike_handler }) => {
	enum FrontEndCalculation {
		WHEEL_BASE,
		EFFECTIVE_TOP_TUBE_LENGTH,
		STACK_REACH
	}

	const [bike_name, set_bike_name] = useState<string>("Bike")
	const [bike_color, set_bike_color] = useState<string>("red")
	const [bike_parameters, set_bike_parameters] = useState<BikeParameters>({
		wheel_diameter: undefined,
		bottom_bracket_drop: undefined,
		chain_stay_length: undefined,
		seat_tube_angle: undefined,
		seat_tube_length: undefined,
		seat_post_length: undefined,
		head_tube_angle: undefined,
		fork_rake: undefined,
		fork_length: undefined,
		head_tube_length: undefined,
		front: {
			wheel_base: undefined,
			effective_top_tube_length: undefined,
			reach: undefined,
			stack: undefined
		}
	})
	const [front_end_calculation, set_front_end_calculation] =
		useState<FrontEndCalculation>(FrontEndCalculation.WHEEL_BASE)

	const set_bike_parameter = (parameter_name: string, value: number) => {
		const obj = { ...bike_parameters }
		obj[parameter_name] = value
		set_bike_parameters(obj)
	}

	const set_bike_front_parameter = (parameter_name: string, value: number) => {
		const obj = { ...bike_parameters }

		if (parameter_name == "wheel_base") {
			obj.front = {
				wheel_base: value,
				effective_top_tube_length: undefined,
				stack: undefined,
				reach: undefined
			}
		} else if (parameter_name == "effective_top_tube_length") {
			obj.front = {
				wheel_base: undefined,
				effective_top_tube_length: value,
				stack: undefined,
				reach: undefined
			}
		} else if (parameter_name == "stack") {
			obj.front = {
				wheel_base: undefined,
				effective_top_tube_length: undefined,
				stack: value
			}
		} else if (parameter_name == "reach") {
			obj.front = {
				wheel_base: undefined,
				effective_top_tube_length: undefined,
				reach: value
			}
		}

		console.log(obj)

		set_bike_parameters(obj)
	}

	enum OddOrEven {
		ODD,
		EVEN
	}

	const only_odd_or_even = (odd_or_even: OddOrEven) =>
		Object.entries(bike_parameters)
			.filter(
				([name, param], i) =>
					i % 2 == (odd_or_even == OddOrEven.EVEN ? 0 : 1) &&
					typeof param != "object"
			)
			.map(([name, parameter], i) => (
				<ParameterInput
					key={i}
					name={name}
					value={parameter}
					setter={set_bike_parameter}
				></ParameterInput>
			))

	return (
		<>
			<form onSubmit={ev => ev.preventDefault()}>
				<TextField
					label="name"
					fullWidth
					value={bike_name}
					onChange={ev => set_bike_name(ev.target.value)}
				></TextField>
				<TextField
					label="color"
					fullWidth
					value={bike_color}
					onChange={ev => set_bike_color(ev.target.value)}
				></TextField>
				<Box mt={1}>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							{only_odd_or_even(OddOrEven.EVEN)}
						</Grid>
						<Grid item xs={6}>
							{only_odd_or_even(OddOrEven.ODD)}
						</Grid>
					</Grid>
				</Box>
				<Box mt={1}>
					<TextField
						label="front end measurement"
						fullWidth
						select
						value={front_end_calculation}
						onChange={ev => set_front_end_calculation(ev.target.value as any)}
					>
						<MenuItem value={FrontEndCalculation.WHEEL_BASE}>
							wheel base
						</MenuItem>
						<MenuItem value={FrontEndCalculation.EFFECTIVE_TOP_TUBE_LENGTH}>
							effective top tube length
						</MenuItem>
						<MenuItem value={FrontEndCalculation.STACK_REACH}>
							stack and reach
						</MenuItem>
					</TextField>
					{front_end_calculation == FrontEndCalculation.WHEEL_BASE && (
						<ParameterInput
							name="wheel_base"
							value={bike_parameters.front.wheel_base}
							setter={set_bike_front_parameter}
						></ParameterInput>
					)}
					{front_end_calculation ==
						FrontEndCalculation.EFFECTIVE_TOP_TUBE_LENGTH && (
						<ParameterInput
							name="effective_top_tube_length"
							value={bike_parameters.front.effective_top_tube_length}
							setter={set_bike_front_parameter}
						></ParameterInput>
					)}
					{front_end_calculation == FrontEndCalculation.STACK_REACH && (
						<>
							<ParameterInput
								name="stack"
								value={bike_parameters.front.stack}
								setter={set_bike_front_parameter}
							></ParameterInput>
							<ParameterInput
								name="reach"
								value={bike_parameters.front.reach}
								setter={set_bike_front_parameter}
							></ParameterInput>
						</>
					)}
				</Box>
				<Box mt={1}>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={() =>
							add_bike_handler(new Bike(bike_name, bike_color, bike_parameters))
						}
					>
						Add Bike
					</Button>
				</Box>
			</form>
		</>
	)
}

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
		EFFECTIVE_TOP_TUBE_LENGTH,
		STACK_REACH,
		WHEEL_BASE
	}

	const [bike, set_bike] = useState<BikeParameters>({
		wheel_diameter: 622,
		bottom_bracket_drop: 70,
		chain_stay_length: 405,
		seat_tube_angle: 74.5,
		seat_tube_length: 450,
		seat_post_length: 660,
		head_tube_angle: 71,
		fork_rake: 50,
		fork_length: 375,
		head_tube_length: 135,
		front: {
			wheel_base: 997,
			effective_top_tube_length: undefined,
			reach: undefined,
			stack: undefined
		}
	})
	const [front_end_calculation, set_front_end_calculation] =
		useState<FrontEndCalculation>(FrontEndCalculation.WHEEL_BASE)

	const set_bike_parameter = (parameter_name: string, value: number) => {
		const obj = { ...bike }
		obj[parameter_name] = value
		set_bike(obj)
	}

	const set_bike_front_parameter = (parameter_name: string, value: number) => {
		const obj = { ...bike }

		if (parameter_name == "wheelbase") {
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

		set_bike(obj)
	}

	enum OddOrEven {
		ODD,
		EVEN
	}

	const only_odd_or_even = (odd_or_even: OddOrEven) =>
		Object.entries(bike)
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
				<Grid container spacing={1}>
					<Grid item xs={6}>
						{only_odd_or_even(OddOrEven.EVEN)}
					</Grid>
					<Grid item xs={6}>
						{only_odd_or_even(OddOrEven.ODD)}
					</Grid>
				</Grid>
				<Box mt={1}>
					<TextField
						label="Front"
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
							value={bike.front.wheel_base}
							setter={set_bike_front_parameter}
						></ParameterInput>
					)}
					{front_end_calculation ==
						FrontEndCalculation.EFFECTIVE_TOP_TUBE_LENGTH && (
						<ParameterInput
							name="effective_top_tube_length"
							value={bike.front.effective_top_tube_length}
							setter={set_bike_front_parameter}
						></ParameterInput>
					)}
					{front_end_calculation == FrontEndCalculation.STACK_REACH && (
						<>
							<ParameterInput
								name="stack"
								value={bike.front.stack}
								setter={set_bike_front_parameter}
							></ParameterInput>
							<ParameterInput
								name="reach"
								value={bike.front.reach}
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
						onClick={() => add_bike_handler(new Bike(bike))}
					>
						Add Bike
					</Button>
				</Box>
			</form>
		</>
	)
}

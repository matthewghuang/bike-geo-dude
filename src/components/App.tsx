import React, { useState, useEffect, useRef, Fragment } from "react"
import { Bike, BikeParameters } from "../types/bike"
import { BikesSVG } from "./BikesSVG"
import {
	Button,
	Box,
	ThemeProvider,
	Divider,
	CssBaseline,
	responsiveFontSizes,
	createMuiTheme
} from "@material-ui/core"
import { BikeParameterForm } from "./BikeParameterForm"
import { BikesDisplay } from "./BikesDisplay"
import localforage from "localforage"

const theme = responsiveFontSizes(
	createMuiTheme({
		typography: {
			fontFamily: "Roboto, sans-serif"
		},
		spacing: 12
	})
)

const reorder = (list, start_index, end_index) => {
	const result = Array.from(list)
	const [removed] = result.splice(start_index, 1)
	result.splice(end_index, 0, removed)

	return result
}

export const App: React.FC = () => {
	const svg: React.Ref<SVGSVGElement> = useRef()

	const [view_box, set_view_box] = useState<string>("")
	const [bikes, set_bikes] = useState<Bike[]>([])
	const [adding_bike, set_adding_bike] = useState<boolean>(false)

	const [new_bike_name, set_new_bike_name] = useState<string>("SuperSix EVO 51")
	const [new_bike_color, set_new_bike_color] = useState<string>("red")
	const [new_bike_parameters, set_new_bike_parameters] =
		useState<BikeParameters>({
			seat_tube_length: 477,
			head_tube_angle: 71.2,
			seat_tube_angle: 74.3,
			head_tube_length: 130,
			chain_stay_length: 408,
			bottom_bracket_drop: 74,
			fork_rake: 55,
			effective_top_tube_length: 528,
			wheel_base: undefined,
			stack: undefined,
			reach: undefined,
			fork_length: 375,
			wheel_diameter: 622,
			tire_width: 25,
			stem_length: 90,
			stem_angle: -7
		})

	const add_bike = () => {
		set_bikes([
			...bikes,
			new Bike(new_bike_name, new_bike_color, new_bike_parameters)
		])

		set_adding_bike(false)
	}

	const edit_bike_name = (index: number, name: string) => {
		const new_bikes = [...bikes]
		new_bikes[index].name = name
		set_bikes(new_bikes)
	}

	const edit_bike_color = (index: number, color: string) => {
		const new_bikes = [...bikes]
		new_bikes[index].color = color
		set_bikes(new_bikes)
	}

	const edit_bike_parameters = (index: number, parameters: BikeParameters) => {
		const new_bikes = [...bikes]
		const name = new_bikes[index].name
		const color = new_bikes[index].color
		new_bikes[index] = new Bike(name, color, parameters)
		set_bikes(new_bikes)
	}

	const delete_bike = (index: number) => {
		set_bikes(bikes.filter((_, i) => i != index))
	}

	const hide_bike = (index: number) => {
		const new_bikes = [...bikes]
		new_bikes[index].hidden = !new_bikes[index].hidden
		set_bikes(new_bikes)
	}

	const on_drag_end = (result: any) => {
		if (!result.destination) return

		const items = reorder(bikes, result.source.index, result.destination.index)

		set_bikes(items as Bike[])
	}

	useEffect(() => {
		const bbox = svg.current.getBBox()

		set_view_box(
			`${bbox.x - svg.current.clientWidth / 2 + bbox.width / 2} ${
				bbox.y - svg.current.clientHeight / 2 + bbox.height / 2
			} ${svg.current.clientWidth} ${svg.current.clientHeight}`
		)
	}, [bikes])

	useEffect(() => {
		const save_data = async () => {
			await localforage.setItem("bikes", bikes)
		}

		save_data()
	}, [bikes])

	useEffect(() => {
		const sync_data = async () => {
			const bikes = await localforage.getItem<Bike[]>("bikes")

			if (bikes) set_bikes(bikes)
		}

		sync_data()
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box height="100vh" display="flex">
				<Box width="25%" style={{ maxHeight: "100%", overflow: "auto" }}>
					<Box p={1} bgcolor="orange" color="white" fontSize="h4.fontSize">
						Bike Geo Dude
					</Box>

					<Divider orientation="horizontal"></Divider>

					<Box p={1}>
						{!adding_bike && (
							<Button
								variant="outlined"
								color="primary"
								fullWidth
								onClick={() => set_adding_bike(true)}
							>
								Add Bike
							</Button>
						)}
						{adding_bike && (
							<Fragment>
								<Box mb={1}>
									<Button
										variant="contained"
										color="primary"
										fullWidth
										onClick={() => add_bike()}
									>
										Add Bike
									</Button>
								</Box>
								<Box mb={1}>
									<Button
										variant="contained"
										color="secondary"
										fullWidth
										onClick={() => set_adding_bike(false)}
									>
										Cancel
									</Button>
								</Box>
								<BikeParameterForm
									name={new_bike_name}
									color={new_bike_color}
									parameters={new_bike_parameters}
									set_name={set_new_bike_name}
									set_color={set_new_bike_color}
									set_parameters={set_new_bike_parameters}
								/>
							</Fragment>
						)}
					</Box>

					<Divider orientation="horizontal"></Divider>

					<Box p={1}>
						<BikesDisplay
							bikes={bikes}
							drag_end={on_drag_end}
							edit_bike_name={edit_bike_name}
							edit_bike_color={edit_bike_color}
							edit_bike_parameters={edit_bike_parameters}
							delete_bike={delete_bike}
							hide_bike={hide_bike}
						></BikesDisplay>
					</Box>
				</Box>

				<Divider orientation="vertical"></Divider>

				<svg width="100%" height="100%" viewBox={view_box} ref={svg}>
					<BikesSVG bikes={bikes}></BikesSVG>
				</svg>
			</Box>
		</ThemeProvider>
	)
}

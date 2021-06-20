import React, { useState, useEffect, useRef } from "react"
import { Bike, BikeParameters } from "../types/bike"
import { BikeRender } from "./BikeRender"
import {
	Button,
	Box,
	ThemeProvider,
	Divider,
	CssBaseline,
	responsiveFontSizes,
	createMuiTheme
} from "@material-ui/core"
import { AddBikeForm } from "./AddBikeForm"
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
			fork_length: 375
		})

	const add_bike = (bike: Bike) => {
		const new_bike = { ...bike }

		set_bikes([...bikes, new_bike])

		set_adding_bike(false)
	}

	const cancel_add_bike = () => {
		set_adding_bike(false)
	}

	const edit_bike = (index: number) => {
		const { name, color, parameters } = bikes[index] as Bike
		set_new_bike_name(name)
		set_new_bike_color(color)
		set_new_bike_parameters(parameters)
		remove_bike(index)
		set_adding_bike(true)
	}

	const remove_bike = (index: number) => {
		set_bikes(bikes.filter((_, i) => i != index))
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
			await localforage.setItem("new_bike_name", new_bike_name)
			await localforage.setItem("new_bike_color", new_bike_color)
			await localforage.setItem("new_bike_parameters", new_bike_parameters)
		}

		save_data()
	}, [bikes, new_bike_name, new_bike_color, new_bike_parameters])

	useEffect(() => {
		const sync_data = async () => {
			const bikes = await localforage.getItem<Bike[]>("bikes")

			if (bikes) {
				const saved_new_bike_name = await localforage.getItem<string>(
					"new_bike_name"
				)
				const saved_new_bike_color = await localforage.getItem<string>(
					"new_bike_color"
				)
				const saved_new_bike_parameters =
					await localforage.getItem<BikeParameters>("new_bike_parameters")
				set_bikes(bikes)
				set_new_bike_name(saved_new_bike_name)
				set_new_bike_color(saved_new_bike_color)
				set_new_bike_parameters(saved_new_bike_parameters)
			}
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
							<AddBikeForm
								name={new_bike_name}
								color={new_bike_color}
								parameters={new_bike_parameters}
								set_name={set_new_bike_name}
								set_color={set_new_bike_color}
								set_parameters={set_new_bike_parameters}
								add_bike_handler={add_bike}
								cancel_handler={cancel_add_bike}
							/>
						)}
					</Box>

					<Divider orientation="horizontal"></Divider>

					<Box p={1}>
						<BikesDisplay
							bikes={bikes}
							edit_handler={edit_bike}
							delete_handler={remove_bike}
							on_drag_end={on_drag_end}
						></BikesDisplay>
					</Box>
				</Box>

				<Divider orientation="vertical"></Divider>

				<svg width="100%" height="100%" viewBox={view_box} ref={svg}>
					{Object.values(bikes).map((bike, i) => (
						<BikeRender key={i} bike={bike} color={bike.color}></BikeRender>
					))}
				</svg>
			</Box>
		</ThemeProvider>
	)
}

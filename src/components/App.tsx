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

const theme = responsiveFontSizes(
	createMuiTheme({
		typography: {
			fontFamily: "Roboto, sans-serif"
		},
		spacing: 12
	})
)

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
			wheel_diameter: 622
		})

	const add_bike = (bike: Bike) => {
		const new_bike = { ...bike }

		if (bikes.length > 0)
			new_bike.offset =
				bikes[0].points.bottom_bracket.x - bike.points.bottom_bracket.x

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

	useEffect(() => {
		const bbox = svg.current.getBBox()

		set_view_box(
			`${bbox.x - svg.current.clientWidth / 2 + bbox.width / 2} ${
				bbox.y - svg.current.clientHeight / 2 + bbox.height / 2
			} ${svg.current.clientWidth} ${svg.current.clientHeight}`
		)
	}, [bikes])

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
						></BikesDisplay>
					</Box>
				</Box>

				<Divider orientation="vertical"></Divider>

				<svg width="100%" height="100%" viewBox={view_box} ref={svg}>
					{Object.values(bikes).map((bike, i) => (
						<BikeRender
							key={i}
							bike={bike}
							color={bike.color}
							offset={bike.offset}
						></BikeRender>
					))}
				</svg>
			</Box>
		</ThemeProvider>
	)
}

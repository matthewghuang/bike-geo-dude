import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Bike } from "../types/bike"
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

	const add_bike = (bike: Bike) => {
		const new_bike = { ...bike }

		if (bikes.length > 0)
			new_bike.offset =
				bikes[0].points.bottom_bracket.x - bike.points.bottom_bracket.x

		set_bikes([...bikes, new_bike])

		set_adding_bike(false)
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
							<>
								<AddBikeForm add_bike_handler={add_bike}></AddBikeForm>
								<Box mt={1}>
									<Button
										variant="contained"
										color="secondary"
										fullWidth
										onClick={() => set_adding_bike(false)}
									>
										Cancel
									</Button>
								</Box>
							</>
						)}
					</Box>

					<Divider orientation="horizontal"></Divider>

					<Box p={1}>
						<BikesDisplay
							bikes={bikes}
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

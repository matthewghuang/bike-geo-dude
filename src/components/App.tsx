import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Bike } from "../types/bike"
import { BikeDisplay } from "./BikeDisplay"
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

const theme = responsiveFontSizes(
	createMuiTheme({
		typography: {
			fontFamily: "Roboto"
		},
		spacing: 8
	})
)

export const App: React.FC = () => {
	const svg: React.Ref<SVGSVGElement> = useRef()

	const [view_box, set_view_box] = useState<string>("")
	const [bikes, set_bikes] = useState<Bike[]>([])
	const [adding_bike, set_adding_bike] = useState<boolean>(false)

	const add_bike = (bike: Bike) => {
		set_bikes([...bikes, bike])

		set_adding_bike(false)
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
				<Box width="25%">
					<Box p={1} bgcolor="orange" color="white" fontSize="h4.fontSize">
						Bike Geo Dude
					</Box>

					<Divider orientation="horizontal"></Divider>

					<Box p={1}>
						{!adding_bike && (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								onClick={() => set_adding_bike(true)}
							>
								Add Bike
							</Button>
						)}
						{adding_bike && (
							<AddBikeForm add_bike_handler={add_bike}></AddBikeForm>
						)}
					</Box>
				</Box>

				<Divider orientation="vertical"></Divider>

				<svg width="100%" height="100%" viewBox={view_box} ref={svg}>
					{Object.values(bikes).map((bike, i) => (
						<BikeDisplay key={i} bike={bike} color="red"></BikeDisplay>
					))}
				</svg>
			</Box>
		</ThemeProvider>
	)
}

import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Bike } from "../types/bike"
import { BikeDisplay } from "./BikeDisplay"
import {
	Grid,
	Typography,
	Button,
	Paper,
	Box,
	ThemeProvider,
	Divider,
	CssBaseline,
	responsiveFontSizes,
	createMuiTheme
} from "@material-ui/core"
import { spacing } from "@material-ui/system"
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

	useLayoutEffect(() => {
		const bbox = svg.current.getBBox()

		set_view_box(
			`${bbox.x - svg.current.clientWidth / 2 + bbox.width / 2} ${
				bbox.y - svg.current.clientHeight / 2 + bbox.height / 2
			} ${svg.current.clientWidth} ${svg.current.clientHeight}`
		)
	}, [svg.current, window.innerWidth, window.innerHeight])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box height="100vh" display="flex">
				<Box width="25%">
					<Box p={1}>
						<Typography variant="h6">Bike Geo Dude</Typography>
					</Box>
					<Divider orientation="horizontal"></Divider>
					<Box p={1}>
						{!adding_bike && (
							<Button
								variant="contained"
								color="primary"
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
				<svg
					width="100%"
					height="100%"
					viewBox={view_box}
					ref={svg}
					className="col-span-10"
				></svg>
			</Box>
		</ThemeProvider>
	)
}

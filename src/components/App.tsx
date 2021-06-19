import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Bike } from "../data/bike"
import { BikeDisplay } from "./BikeDisplay"
import {
	Grid,
	Typography,
	Button,
	Paper,
	Box,
	ThemeProvider,
	CssBaseline,
	responsiveFontSizes,
	createMuiTheme
} from "@material-ui/core"
import { spacing } from "@material-ui/system"

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

	const add_bike = (bike: Bike) => set_bikes([...bikes, bike])

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
			<Grid container>
				<Grid item xs={3}>
					<Box p={1}>
						<Typography variant="h6">Bike Geo Dude</Typography>
						<Button variant="contained" color="primary">
							Add a Bike
						</Button>
					</Box>
				</Grid>
				<Grid item xs={9}>
					<svg
						width="100%"
						height="100%"
						viewBox={view_box}
						ref={svg}
						className="col-span-10"
					></svg>
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}

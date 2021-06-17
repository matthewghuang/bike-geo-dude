import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Bike } from "./bike"
import { BikeDisplay } from "./BikeDisplay"

export const App = () => {
	const svg = useRef()

	const [window_size, set_window_size] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})

	const [view_box, set_view_box] = useState("")

	useLayoutEffect(() => {
		const update_window_size = () => {
			set_window_size({ width: window.innerWidth, height: window.innerHeight })
			console.log(svg.current.getBBox())
		}

		update_window_size()
		window.addEventListener("resize", update_window_size)
		return () => window.removeEventListener("resize", update_window_size)
	}, [])

	useLayoutEffect(() => {
		const bbox = svg.current.getBBox()
		console.log(bbox)

		set_view_box(
			`${bbox.x - window_size.width / 2 + bbox.width / 2} ${
				bbox.y - window_size.height / 2 + bbox.height / 2
			} ${window_size.width} ${window_size.height}`
		)
	}, [svg.current])

	const bike_one = new Bike({
		wheel_diameter: 622,
		chain_stay_length: 420,
		bottom_bracket_drop: 70,
		seat_tube_angle: 73.5,
		seat_tube_length: 470,
		wheel_base: 997,
		head_tube_angle: 69,
		head_tube_length: 90,
		fork_length: 395,
		fork_rake: 50,
		seat_post_length: 660
	})

	const bike_two = new Bike({
		wheel_diameter: 622,
		chain_stay_length: 420,
		bottom_bracket_drop: 70,
		seat_tube_angle: 72.5,
		seat_tube_length: 500,
		wheel_base: 1001,
		head_tube_angle: 69.5,
		head_tube_length: 105,
		fork_length: 395,
		fork_rake: 50,
		seat_post_length: 660
	})

	return (
		<>
			<svg
				width={window_size.width}
				height={window_size.height}
				viewBox={view_box}
				ref={svg}
			>
				<BikeDisplay
					bike={bike_one}
					points={{ enabled: true, color: "purple" }}
					tubes={{ enabled: true, color: "red" }}
				></BikeDisplay>
				<BikeDisplay
					bike={bike_two}
					points={{ enabled: true, color: "green" }}
					tubes={{ enabled: true, color: "blue" }}
				></BikeDisplay>
			</svg>
		</>
	)
}

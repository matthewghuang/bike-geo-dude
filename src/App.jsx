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
		const update_window_size = () =>
			set_window_size({ width: window.innerWidth, height: window.innerHeight })

		update_window_size()
		window.addEventListener("resize", update_window_size)
		return () => window.removeEventListener("resize", update_window_size)
	}, [])

	useLayoutEffect(() => {
		const bbox = svg.current.getBBox()

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
		chain_stay_length: 405,
		bottom_bracket_drop: 70,
		seat_tube_angle: 74.5,
		seat_tube_length: 440,
		effective_top_tube_length: 510,
		head_tube_angle: 71,
		head_tube_length: 135,
		fork_length: 375,
		fork_rake: 50,
		seat_post_length: 660
	})

	return (
		<>
			<div className="grid grid-cols-12">
				<div className="col-span-2">
					<div className="w-full h-16 bg-black">Bike Geo Dude</div>
				</div>
				<svg
					width="100%"
					height="100%"
					viewBox={view_box}
					ref={svg}
					className="col-span-10"
				>
					<BikeDisplay
						bike={bike_one}
						points={{ enabled: true, color: "purple" }}
						tubes={{ enabled: true, color: "purple" }}
					></BikeDisplay>
					<BikeDisplay
						bike={bike_two}
						points={{ enabled: true, color: "green" }}
						tubes={{ enabled: true, color: "green" }}
					></BikeDisplay>
				</svg>
			</div>
		</>
	)
}

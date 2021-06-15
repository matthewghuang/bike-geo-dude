import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Bike } from "./bike"
import { Point } from "./point"
import { PointDisplay } from "./PointDisplay"
import { Tube } from "./tube"
import { TubeDisplay } from "./TubeDisplay"

const dtr = degrees => (degrees * Math.PI) / 180

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
			`${-(window_size.width / 2 + bbox.width / 2)} ${-(
				window_size.height / 2 +
				bbox.height / 2
			)} ${window_size.width} ${window_size.height}`
		)
	}, [svg.current])

	const bike = new Bike({
		st_length: 660,
		st_angle: 73.5,
		cs_length: 430,
		bb_drop: 72
	})

	return (
		<>
			<svg
				width={window_size.width}
				height={window_size.height}
				viewBox={view_box}
				ref={svg}
			>
				{Object.entries(bike.points).map(([name, pt]) => (
					<PointDisplay name={name} point={pt}></PointDisplay>
				))}

				{Object.entries(bike.tubes).map(([name, tube]) => (
					<TubeDisplay name={name} tube={tube}></TubeDisplay>
				))}
			</svg>
		</>
	)
}

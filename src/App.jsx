import React, { useState, useEffect, useLayoutEffect } from "react"
import { Point } from "./point"
import { PointDisplay } from "./PointDisplay"
import { Tube } from "./tube"
import { TubeDisplay } from "./TubeDisplay"

export const App = () => {
	const [window_size, set_window_size] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})

	useLayoutEffect(() => {
		const update_window_size = () => {
			set_window_size({ width: window.innerWidth, height: window.innerHeight })
		}

		update_window_size()
		window.addEventListener("resize", update_window_size)
		return () => window.removeEventListener("resize", update_window_size)
	}, [])

	const [points, set_points] = useState({
		bottom_bracket: new Point(0, 0),
		seat_clamp: new Point(-50, -650)
	})

	const [tubes, set_tubes] = useState({
		seat_tube: new Tube()
	})

	useEffect(() => {
		set_tubes({
			seat_tube: new Tube(points.bottom_bracket, points.seat_clamp)
		})
	}, [points])

	return (
		<>
			<svg width={window_size.width} height={window_size.height}>
				<g
					transform={`translate(${window_size.width / 2} ${
						window_size.height / 2
					}) scale(0.5)`}
				>
					{Object.entries(points).map(([name, pt]) => (
						<PointDisplay name={name} point={pt}></PointDisplay>
					))}

					{Object.entries(tubes).map(([name, tube]) => (
						<TubeDisplay name={name} tube={tube}></TubeDisplay>
					))}
				</g>
			</svg>
		</>
	)
}

import React from "react"
import { Point } from "./point"

export const TubeDisplay = ({ name, tube, color = "green" }) => {
	const start = tube.start
	const end = tube.end

	const distance = Math.floor(
		Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2) + 0.5
	)
	const middle = new Point((start.x + end.x) / 2, (start.y + end.y) / 2)

	return (
		<>
			<line
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
				stroke={color}
				style={{ strokeWidth: 20, opacity: 0.5 }}
			></line>
			{/* <text x={middle.x} y={middle.y} fill="black">
				{name}: {distance}
			</text> */}
		</>
	)
}

import React from "react"
import { Point } from "./point"

interface Props {
	name: string
	point: Point
	color: string
}

export const PointDisplay = ({ name, point, color }: Props) => {
	return (
		<>
			<circle
				cx={point.x}
				cy={point.y}
				r="10"
				fill={color}
				style={{ opacity: 0.5 }}
			></circle>
			{/* <text x={point.x + 10} y={point.y + 10} fill={color}>
				{name}
			</text> */}
		</>
	)
}

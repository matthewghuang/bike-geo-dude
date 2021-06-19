import React from "react"
import { Point } from "./point"

interface Props {
	name: string
	point: Point
	color: string
}

export const PointDisplay: React.FC<Props> = ({ name, point, color }) => {
	return (
		<>
			<circle
				cx={point.x}
				cy={point.y}
				r="10"
				fill={color}
				style={{ opacity: 0.5 }}
			></circle>
		</>
	)
}

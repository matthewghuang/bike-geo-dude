import React from "react"
import { Point } from "../types/point"

interface Props {
	name: string
	point: Point
	color: string
}

export const PointRender: React.FC<Props> = ({ name, point, color }) => {
	return (
		<>
			<circle cx={point.x} cy={point.y} r="10" fill={color}></circle>
		</>
	)
}

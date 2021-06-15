import React from "react"

export const PointDisplay = ({ name, point }) => {
	return (
		<>
			<circle cx={point.x} cy={point.y} r="10" fill="red"></circle>
			<text x={point.x + 10} y={point.y + 10} fill="red">
				{name}
			</text>
		</>
	)
}

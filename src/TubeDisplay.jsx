import React from "react"

export const TubeDisplay = ({ name, tube }) => {
	const start = tube.start
	const end = tube.end

	return (
		<>
			<line
				x1={start.x}
				y1={start.y}
				x2={end.x}
				y2={end.y}
				stroke="green"
			></line>
		</>
	)
}

import React from "react"
import { Tube } from "../types/tube"

interface Props {
	name: string
	tube: Tube
	color: string
}

export const TubeDisplay: React.FC<Props> = ({ name, tube, color }) => {
	const start = tube.start
	const end = tube.end

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
		</>
	)
}

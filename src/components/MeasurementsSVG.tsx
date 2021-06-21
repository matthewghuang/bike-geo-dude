import React, { Fragment } from "react"
import { Bike } from "../types/bike"

const Reach: React.FC<{ bike: Bike; pos: number }> = ({ bike, pos }) => {
	const bb = bike.points.bottom_bracket
	const htt = bike.points.head_tube_top

	return (
		<Fragment>
			<line
				x1={bb.x}
				y1={bb.y}
				x2={bb.x}
				y2={htt.y * pos}
				stroke="grey"
				strokeDasharray="4"
				strokeWidth="2"
			/>
			<line
				x1={bb.x}
				y1={htt.y * pos}
				x2={htt.x}
				y2={htt.y * pos}
				stroke="grey"
				strokeWidth="2"
			/>
			<text
				x={(bb.x + htt.x) * 0.5}
				y={(bb.y + htt.y) * pos}
				textAnchor="middle"
			>
				reach: {Math.floor(bike.measurements.reach + 0.5)}
			</text>
			<line
				x1={htt.x}
				y1={htt.y * pos}
				x2={htt.x}
				y2={htt.y}
				stroke="grey"
				strokeDasharray="4"
				strokeWidth="2"
			/>
		</Fragment>
	)
}

const Stack: React.FC<{ bike: Bike; pos: number }> = ({ bike, pos }) => {
	const bb = bike.points.bottom_bracket
	const htt = bike.points.head_tube_top

	return (
		<Fragment>
			<line
				x1={bb.x}
				y1={bb.y}
				x2={htt.x * pos}
				y2={bb.y}
				stroke="grey"
				strokeWidth="2"
				strokeDasharray="4"
			/>
			<line
				x1={htt.x * pos}
				y1={bb.y}
				x2={htt.x * pos}
				y2={htt.y}
				strokeWidth="2"
				stroke="grey"
			/>
			<text x={htt.x * pos} y={htt.y * 0.5}>
				stack: {Math.floor(bike.measurements.stack + 0.5)}
			</text>
			<line
				x1={htt.x * pos}
				y1={htt.y}
				x2={htt.x}
				y2={htt.y}
				stroke="grey"
				strokeWidth="2"
				strokeDasharray="4"
			/>
		</Fragment>
	)
}

export const MeasurementsSVG: React.FC<{ bike: Bike }> = ({ bike }) => {
	return (
		<Fragment>
			<Reach bike={bike} pos={0.2} />
			<Stack bike={bike} pos={0.2} />
		</Fragment>
	)
}

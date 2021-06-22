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
			/>
			<line
				x1={htt.x}
				y1={htt.y * pos}
				x2={htt.x}
				y2={htt.y}
				stroke="grey"
				strokeDasharray="4"
			/>
			<line
				x1={bb.x}
				y1={htt.y * pos}
				x2={htt.x}
				y2={htt.y * pos}
				stroke="grey"
			/>
			<text
				x={(bb.x + htt.x) * 0.5}
				y={(bb.y + htt.y) * pos}
				textAnchor="middle"
			>
				{bike.measurements.reach.name}:{" "}
				{Math.floor(bike.measurements.reach.length + 0.5)}
			</text>
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
				strokeDasharray="4"
			/>
			<line
				x1={htt.x * pos}
				y1={htt.y}
				x2={htt.x}
				y2={htt.y}
				stroke="grey"
				strokeDasharray="4"
			/>
			<line
				x1={htt.x * pos}
				y1={bb.y}
				x2={htt.x * pos}
				y2={htt.y}
				stroke="grey"
			/>
			<text x={htt.x * pos} y={htt.y * 0.5}>
				{bike.measurements.stack.name}:{" "}
				{Math.floor(bike.measurements.stack.length + 0.5)}
			</text>
		</Fragment>
	)
}

const EffectiveTopTube: React.FC<{ bike: Bike; offset: number }> = ({
	bike,
	offset
}) => {
	const ett = bike.points.ett_point
	const htt = bike.points.head_tube_top

	return (
		<Fragment>
			<line
				x1={htt.x}
				y1={htt.y}
				x2={htt.x}
				y2={htt.y - offset}
				stroke="grey"
				strokeDasharray="4"
			/>
			<line
				x1={ett.x}
				y1={ett.y}
				x2={ett.x}
				y2={ett.y - offset}
				stroke="grey"
				strokeDasharray="4"
			/>
			<line
				x1={ett.x}
				y1={ett.y - offset}
				x2={htt.x}
				y2={htt.y - offset}
				stroke="grey"
			/>
			<text x={(htt.x + ett.x) * 0.5} y={ett.y - offset} textAnchor="middle">
				{bike.measurements.effective_top_tube.name}:{" "}
				{bike.measurements.effective_top_tube.length}
			</text>
		</Fragment>
	)
}

const Trail: React.FC<{ bike: Bike }> = ({ bike }) => {
	return (
		<Fragment>
			<line
				x1={bike.points.head_tube_top.x}
				y1={bike.points.head_tube_top.y}
				x2={bike.points.trail_point.x}
				y2={bike.points.trail_point.y}
				stroke="grey"
				strokeDasharray="4"
			/>
			<line
				x1={bike.points.front_hub.x}
				y1={bike.points.front_hub.y}
				x2={bike.points.front_hub.x}
				y2={bike.points.trail_point.y}
				stroke="grey"
				strokeDasharray="4"
			/>
			<line
				x1={bike.points.front_hub.x}
				y1={bike.points.trail_point.y}
				x2={bike.points.trail_point.x}
				y2={bike.points.trail_point.y}
				stroke="grey"
			/>
			<text
				x={(bike.points.front_hub.x + bike.points.trail_point.x) / 2}
				y={bike.points.trail_point.y}
				textAnchor="middle"
			>
				{bike.measurements.trail.name}:{" "}
				{Math.floor(bike.measurements.trail.length + 0.5)}
			</text>
		</Fragment>
	)
}

export const MeasurementsSVG: React.FC<{ bike: Bike }> = ({ bike }) => {
	return (
		<Fragment>
			<Reach bike={bike} pos={0.2} />
			<Stack bike={bike} pos={0.2} />
			<EffectiveTopTube bike={bike} offset={50} />
			<Trail bike={bike} />
		</Fragment>
	)
}

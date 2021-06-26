import React, { Fragment } from "react"
import { Bike } from "../types/bike"
import { MeasurementsSVG } from "./MeasurementsSVG"

const TubeSVG: React.FC<{
	x1: number
	y1: number
	x2: number
	y2: number
	color: string
}> = ({ x1, y1, x2, y2, color }) => {
	return (
		<Fragment>
			<line
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
				stroke={color}
				strokeWidth="20"
				strokeLinecap="round"
			/>
		</Fragment>
	)
}

const WheelSVG: React.FC<{ bike: Bike }> = ({ bike }) => {
	return (
		<Fragment>
			<circle
				cx={bike.points.front_hub.x}
				cy={bike.points.front_hub.y}
				r={bike.parameters.wheel_diameter / 2 + bike.parameters.tire_width / 2}
				fill="none"
				stroke={bike.color}
				strokeDasharray="4"
			/>
			<circle
				cx={bike.points.rear_hub.x}
				cy={bike.points.rear_hub.y}
				r={bike.parameters.wheel_diameter / 2 + bike.parameters.tire_width / 2}
				fill="none"
				stroke={bike.color}
				strokeDasharray="4"
			/>
		</Fragment>
	)
}

const StemSVG: React.FC<{ bike: Bike }> = ({ bike }) => {
	return (
		<Fragment>
			<line
				x1={bike.points.stem_start.x}
				y1={bike.points.stem_start.y}
				x2={bike.points.head_tube_top.x}
				y2={bike.points.head_tube_top.y}
				stroke={bike.color}
				strokeWidth="20"
				opacity="0.5"
			></line>
			<line
				x1={bike.points.stem_start.x}
				y1={bike.points.stem_start.y}
				x2={bike.points.stem_end.x}
				y2={bike.points.stem_end.y}
				stroke={bike.color}
				strokeWidth="20"
				strokeLinecap="round"
			></line>
			<circle
				cx={bike.points.stem_end.x}
				cy={bike.points.stem_end.y}
				r={31.8 / 2}
				fill="white"
				stroke={bike.color}
			/>
		</Fragment>
	)
}

export const BikesSVG: React.FC<{ bikes: Bike[] }> = ({ bikes }) => {
	return (
		<Fragment>
			{bikes
				.slice()
				.reverse()
				.filter(bike => !bike.hidden)
				.map((bike, i, arr) => (
					<Fragment>
						<g style={{ opacity: 0.8 }}>
							<StemSVG bike={bike} />
							<WheelSVG bike={bike} />
							{Object.values(bike.tubes).map((tube, i) => (
								<TubeSVG
									key={i}
									x1={tube.start.x}
									y1={tube.start.y}
									x2={tube.end.x}
									y2={tube.end.y}
									color={bike.color}
								/>
							))}
						</g>
						{i == arr.length - 1 && <MeasurementsSVG bike={bike} />}
					</Fragment>
				))}
		</Fragment>
	)
}

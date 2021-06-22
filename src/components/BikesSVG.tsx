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
			<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="20" />
			<circle cx={x1} cy={y1} r="10" fill={color}></circle>
			<circle cx={x2} cy={y2} r="10" fill={color}></circle>
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

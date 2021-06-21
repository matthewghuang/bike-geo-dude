import React, { Fragment } from "react"
import { Bike } from "../types/bike"
import { Point } from "../types/point"
import { Tube } from "../types/tube"
import { MeasurementsSVG } from "./MeasurementsSVG"

const PointSVG: React.FC<{ point: Point; color: string }> = props => {
	return (
		<circle
			cx={props.point.x}
			cy={props.point.y}
			r="10"
			fill={props.color}
		></circle>
	)
}

const TubeSVG: React.FC<{ tube: Tube; color: string }> = ({ tube, color }) => {
	return (
		<line
			x1={tube.start.x}
			y1={tube.start.y}
			x2={tube.end.x}
			y2={tube.end.y}
			stroke={color}
			style={{ strokeWidth: 20 }}
		></line>
	)
}

export const BikesSVG: React.FC<{ bikes: Bike[] }> = ({ bikes }) => {
	return (
		<Fragment>
			{Object.values(bikes)
				.reverse()
				.filter(bike => !bike.hidden)
				.map((bike, i, arr) => (
					<Fragment>
						<g style={{ opacity: 0.8 }}>
							{Object.entries(bike.tubes).map(([name, tube], i) => (
								<TubeSVG key={i} tube={tube} color={bike.color}></TubeSVG>
							))}

							{Object.entries(bike.points).map(([name, pt], i) => (
								<PointSVG key={i} point={pt} color={bike.color}></PointSVG>
							))}
						</g>
						{i == arr.length - 1 && <MeasurementsSVG bike={bike} />}
					</Fragment>
				))}
		</Fragment>
	)
}

import React from "react"
import { Bike } from "../types/bike"
import { PointRender } from "./PointRender"
import { TubeRender } from "./TubeRender"

interface Props {
	bike: Bike
	color: string
	offset: number
}

export const BikeRender: React.FC<Props> = ({ bike, color, offset }) => {
	return (
		<>
			<g transform={`translate(${offset})`} style={{ opacity: 0.5 }}>
				{Object.entries(bike.tubes).map(([name, tube], i) => (
					<TubeRender
						key={i}
						name={name}
						tube={tube}
						color={color}
					></TubeRender>
				))}

				{Object.entries(bike.points).map(([name, pt], i) => (
					<PointRender
						key={i}
						name={name}
						point={pt}
						color={color}
					></PointRender>
				))}
			</g>
		</>
	)
}

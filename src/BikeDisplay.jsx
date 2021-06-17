import React from "react"
import { PointDisplay } from "./PointDisplay"
import { TubeDisplay } from "./TubeDisplay"

export const BikeDisplay = ({ bike, points, tubes }) => {
	if (!points) {
		points = {
			enabled: true,
			color: "red"
		}
	}

	if (!tubes) {
		tubes = {
			enabled: true,
			color: "green"
		}
	}

	return (
		<>
			{tubes.enabled &&
				Object.entries(bike.tubes).map(([name, tube]) => (
					<TubeDisplay
						name={name}
						tube={tube}
						color={tubes.color}
					></TubeDisplay>
				))}

			{points.enabled &&
				Object.entries(bike.points).map(([name, pt]) => (
					<PointDisplay
						name={name}
						point={pt}
						color={points.color}
					></PointDisplay>
				))}
		</>
	)
}

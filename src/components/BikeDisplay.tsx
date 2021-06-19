import React from "react"
import { Bike } from "../types/bike"
import { Point } from "../types/point"
import { Tube } from "../types/tube"
import { PointDisplay } from "./PointDisplay"
import { TubeDisplay } from "./TubeDisplay"

interface Props {
	bike: Bike
	color: string
}

export const BikeDisplay: React.FC<Props> = ({ bike, color }) => {
	return (
		<>
			{Object.entries(bike.tubes).map(([name, tube]: [string, Tube]) => (
				<TubeDisplay name={name} tube={tube} color={color}></TubeDisplay>
			))}

			{Object.entries(bike.points).map(([name, pt]: [string, Point]) => (
				<PointDisplay name={name} point={pt} color={color}></PointDisplay>
			))}
		</>
	)
}

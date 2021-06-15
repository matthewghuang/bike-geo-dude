import { Point } from "./point"
import { Tube } from "./tube"

const dtr = degrees => degrees * (Math.PI / 180)
const rtd = radians => radians * (180 / Math.PI)

export class Bike {
	constructor({ st_length, st_angle, cs_length, bb_drop }) {
		const cs_angle = rtd(Math.acos(bb_drop / cs_length))

		console.log(cs_angle)

		this.points = {
			bottom_bracket: new Point(0, 0),
			st_top: new Point(
				-(st_length * Math.cos(dtr(st_angle))),
				-(st_length * Math.sin(dtr(st_angle)))
			),
			rear_axle: new Point(-(Math.sin(dtr(cs_angle)) * cs_length), -bb_drop)
		}

		this.tubes = {
			seat_tube: new Tube(this.points.bottom_bracket, this.points.st_top),
			chain_stay: new Tube(this.points.bottom_bracket, this.points.rear_axle),
			seat_stay: new Tube(this.points.rear_axle, this.points.st_top)
		}
	}
}

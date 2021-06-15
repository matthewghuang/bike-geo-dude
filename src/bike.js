import { Point } from "./point"
import { Tube } from "./tube"

const dtr = degrees => degrees * (Math.PI / 180)
const rtd = radians => radians * (180 / Math.PI)

export class Bike {
	constructor({
		seat_tube_length,
		seat_tube_angle,
		chainstay_length,
		bottom_bracket_drop
	}) {
		const cs_angle = rtd(Math.acos(bottom_bracket_drop / chainstay_length))

		console.log(cs_angle)

		this.points = {
			bottom_bracket: new Point(0, 0),
			st_top: new Point(
				-(seat_tube_length * Math.cos(dtr(seat_tube_angle))),
				-(seat_tube_length * Math.sin(dtr(seat_tube_angle)))
			),
			rear_axle: new Point(
				-(Math.sin(dtr(cs_angle)) * chainstay_length),
				-bottom_bracket_drop
			)
		}

		this.tubes = {
			seat_tube: new Tube(this.points.bottom_bracket, this.points.st_top),
			chain_stay: new Tube(this.points.bottom_bracket, this.points.rear_axle),
			seat_stay: new Tube(this.points.rear_axle, this.points.st_top)
		}
	}
}

import { Point } from "./point"
import { Tube } from "./tube"

const dtr = degrees => degrees * (Math.PI / 180)
const rtd = radians => radians * (180 / Math.PI)

const pyth = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

export class Bike {
	constructor({
		seat_tube_length,
		seat_tube_angle,
		chainstay_length,
		bottom_bracket_drop,
		stack,
		reach,
		headtube_length,
		headtube_angle,
		fork_length,
		fork_rake
	}) {
		const chain_stay_angle = rtd(
			Math.acos(bottom_bracket_drop / chainstay_length)
		)

		this.points = {}

		this.points.bottom_bracket = new Point(0, 0)

		this.points.seattube_top = new Point(
			-(seat_tube_length * Math.cos(dtr(seat_tube_angle))),
			-(seat_tube_length * Math.sin(dtr(seat_tube_angle)))
		)

		this.points.rear_axle = new Point(
			-(Math.sin(dtr(chain_stay_angle)) * chainstay_length),
			-bottom_bracket_drop
		)

		if (stack && reach) this.points.headtube_top = new Point(reach, -stack)

		this.points.headtube_bottom = new Point(
			this.points.headtube_top.x +
				headtube_length * Math.cos(dtr(headtube_angle)),
			this.points.headtube_top.y +
				headtube_length * Math.sin(dtr(headtube_angle))
		)

		this.points.front_axle = new Point(
			this.points.headtube_bottom.x +
				fork_length * Math.cos(dtr(headtube_angle)) +
				fork_rake,
			this.points.headtube_bottom.y +
				fork_length * Math.sin(dtr(headtube_angle))
		)

		const rotate_points = (points, degrees) => {
			const new_points = {}

			Object.entries(points).forEach(([key, pt]) => {
				const new_point = new Point(
					pt.x * Math.cos(dtr(degrees)) - pt.y * Math.sin(dtr(degrees)),
					pt.y * Math.cos(dtr(degrees)) + pt.x * Math.sin(dtr(degrees))
				)
				new_points[key] = new_point
			})

			return new_points
		}

		const hyp = pyth(this.points.front_axle, this.points.rear_axle)
		console.log("hyp", hyp)
		const opp = this.points.front_axle.x + -this.points.rear_axle.x
		console.log("opp", opp)
		const angle_to_rotate = -(90 - rtd(Math.asin(opp / hyp)))
		console.log("angle", angle_to_rotate)

		this.points = rotate_points(this.points, angle_to_rotate)

		this.tubes = {
			seat_tube: new Tube(this.points.bottom_bracket, this.points.seattube_top),
			chain_stay: new Tube(this.points.bottom_bracket, this.points.rear_axle),
			seat_stay: new Tube(this.points.rear_axle, this.points.seattube_top),
			top_tube: new Tube(this.points.seattube_top, this.points.headtube_top),
			head_tube: new Tube(
				this.points.headtube_top,
				this.points.headtube_bottom
			),
			down_tube: new Tube(
				this.points.bottom_bracket,
				this.points.headtube_bottom
			),
			fork: new Tube(this.points.headtube_bottom, this.points.front_axle)
		}

		console.log(this.points.rear_axle, this.points.front_axle)
	}
}

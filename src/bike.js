import { Point } from "./point"
import { Tube } from "./tube"

const dtr = degrees => degrees * (Math.PI / 180)
const rtd = radians => radians * (180 / Math.PI)

export class Bike {
	constructor({
		wheel_diameter,
		chain_stay_length,
		bottom_bracket_drop,
		seat_tube_angle,
		seat_tube_length,
		wheel_base,
		head_tube_angle,
		head_tube_length,
		fork_length,
		fork_rake,
		seat_post_length
	}) {
		this.points = {}
		this.points.rear_hub = new Point(wheel_diameter / 2, wheel_diameter / 2)

		const chain_stay_angle = Math.asin(bottom_bracket_drop / chain_stay_length)

		this.points.bottom_bracket = new Point(
			this.points.rear_hub.x + chain_stay_length * Math.cos(chain_stay_angle),
			this.points.rear_hub.y + bottom_bracket_drop
		)

		this.points.seat_tube_junction = new Point(
			this.points.bottom_bracket.x -
				seat_tube_length * Math.cos(dtr(seat_tube_angle)),
			this.points.bottom_bracket.y -
				seat_tube_length * Math.sin(dtr(seat_tube_angle))
		)

		this.points.seat_post_top = new Point(
			this.points.seat_tube_junction.x -
				(seat_post_length - seat_tube_length) * Math.cos(dtr(seat_tube_angle)),
			this.points.seat_tube_junction.y -
				(seat_post_length - seat_tube_length) * Math.sin(dtr(seat_tube_angle))
		)

		this.points.front_hub = new Point(
			this.points.rear_hub.x + wheel_base,
			this.points.rear_hub.y
		)

		const rake_point = new Point(
			this.points.front_hub.x - fork_rake * Math.sin(dtr(head_tube_angle)),
			this.points.front_hub.y + fork_rake * Math.cos(dtr(head_tube_angle))
		)

		this.points.head_tube_bottom = new Point(
			rake_point.x - fork_length * Math.cos(dtr(head_tube_angle)),
			rake_point.y - fork_length * Math.sin(dtr(head_tube_angle))
		)

		this.points.head_tube_top = new Point(
			this.points.head_tube_bottom.x -
				head_tube_length * Math.cos(dtr(head_tube_angle)),
			this.points.head_tube_bottom.y -
				head_tube_length * Math.sin(dtr(head_tube_angle))
		)

		this.tubes = {
			chain_stay: new Tube(this.points.rear_hub, this.points.bottom_bracket),
			seat_stay: new Tube(this.points.rear_hub, this.points.seat_tube_junction),
			seat_tube: new Tube(
				this.points.bottom_bracket,
				this.points.seat_tube_junction
			),
			seat_post: new Tube(
				this.points.seat_tube_junction,
				this.points.seat_post_top
			),
			down_tube: new Tube(
				this.points.bottom_bracket,
				this.points.head_tube_bottom
			),
			top_tube: new Tube(
				this.points.seat_tube_junction,
				this.points.head_tube_top
			),
			head_tube: new Tube(
				this.points.head_tube_top,
				this.points.head_tube_bottom
			),
			fork: new Tube(this.points.head_tube_bottom, this.points.front_hub)
		}

		console.log(this.points)
	}
}

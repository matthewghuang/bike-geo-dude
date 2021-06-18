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
		effective_top_tube_length,
		stack,
		reach,
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

		const sin_sta = Math.sin(dtr(seat_tube_angle))
		const cos_sta = Math.cos(dtr(seat_tube_angle))
		const tan_sta = Math.tan(dtr(seat_tube_angle))

		this.points.seat_tube_junction = new Point(
			this.points.bottom_bracket.x - seat_tube_length * cos_sta,
			this.points.bottom_bracket.y - seat_tube_length * sin_sta
		)

		this.points.seat_post_top = new Point(
			this.points.seat_tube_junction.x -
				(seat_post_length - seat_tube_length) * cos_sta,
			this.points.seat_tube_junction.y -
				(seat_post_length - seat_tube_length) * sin_sta
		)

		const sin_hta = Math.sin(dtr(head_tube_angle))
		const cos_hta = Math.cos(dtr(head_tube_angle))

		if (wheel_base) {
			this.points.front_hub = new Point(
				this.points.rear_hub.x + wheel_base,
				this.points.rear_hub.y
			)

			const rake_point = new Point(
				this.points.front_hub.x - fork_rake * sin_hta,
				this.points.front_hub.y + fork_rake * cos_hta
			)

			this.points.head_tube_bottom = new Point(
				rake_point.x - fork_length * cos_hta,
				rake_point.y - fork_length * sin_hta
			)

			this.points.head_tube_top = new Point(
				this.points.head_tube_bottom.x - head_tube_length * cos_hta,
				this.points.head_tube_bottom.y - head_tube_length * sin_hta
			)
		} else if (effective_top_tube_length) {
			const fh_y = this.points.rear_hub.y
			const rake_point_y = fh_y + fork_rake * cos_hta
			const ht_bottom_y = rake_point_y - fork_length * sin_hta
			const ht_top_y = ht_bottom_y - head_tube_length * sin_hta
			const diff_y = this.points.seat_tube_junction.y - ht_top_y
			const ett_x = this.points.seat_tube_junction.x - diff_y / tan_sta
			this.points.head_tube_top = new Point(
				ett_x + effective_top_tube_length,
				ht_top_y
			)
			this.points.head_tube_bottom = new Point(
				this.points.head_tube_top.x + head_tube_length * cos_hta,
				this.points.head_tube_top.y + head_tube_length * sin_hta
			)
			const rake_point = new Point(
				this.points.head_tube_bottom.x + fork_length * cos_hta,
				this.points.head_tube_bottom.y + fork_length * sin_hta
			)
			this.points.front_hub = new Point(
				rake_point.x + fork_rake * sin_hta,
				rake_point.y - fork_rake * cos_hta
			)
		} else if (stack && reach) {
			this.points.head_tube_top = new Point(
				this.points.bottom_bracket.x + reach,
				this.points.bottom_bracket.y - stack
			)
			this.points.head_tube_bottom = new Point(
				this.points.head_tube_top.x + head_tube_length * cos_hta,
				this.points.head_tube_top.y + head_tube_length * sin_hta
			)
			const rake_point = new Point(
				this.points.head_tube_bottom.x + fork_length * cos_hta,
				this.points.head_tube_bottom.y + fork_length * sin_hta
			)
			this.points.front_hub = new Point(
				rake_point.x + fork_rake * sin_hta,
				rake_point.y - fork_rake * cos_hta
			)
		}

		wheel_base = this.points.front_hub.x - this.points.rear_hub.x
		stack = this.points.bottom_bracket.y - this.points.head_tube_top.y
		reach = this.points.head_tube_top.x - this.points.bottom_bracket.x

		const diff_y =
			this.points.seat_tube_junction.y - this.points.head_tube_top.y
		const ett_x = this.points.seat_tube_junction.x - diff_y / tan_sta
		effective_top_tube_length = this.points.head_tube_top.x - ett_x

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
	}
}

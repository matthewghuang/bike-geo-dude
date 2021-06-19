import { Point } from "./point"
import { Tube } from "./tube"
import { Measurement } from "./measurement"

const dtr = (degrees: number): number => degrees * (Math.PI / 180)

const hyp = (p1: Point, p2: Point): number =>
	Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

interface BikeParameters {
	wheel_diameter: number
	chain_stay_length: number
	bottom_bracket_drop: number
	seat_tube_angle: number
	seat_tube_length: number
	wheel_base: number
	effective_top_tube_length: number
	stack: number
	reach: number
	head_tube_angle: number
	head_tube_length: number
	fork_length: number
	fork_rake: number
	seat_post_length: number
}

interface Points {
	rear_hub: Point
	bottom_bracket: Point
	seat_tube_junction: Point
	seat_post_top: Point
	front_hub: Point
	head_tube_bottom: Point
	head_tube_top: Point
}

interface Tubes {
	chain_stay: Tube
	seat_stay: Tube
	seat_tube: Tube
	seat_post: Tube
	down_tube: Tube
	top_tube: Tube
	head_tube: Tube
	fork: Tube
}

interface Measurements {
	wheelbase: Measurement
	front_center: Measurement
	stack: Measurement
	reach: Measurement
	effective_top_tube: Measurement
}

export class Bike {
	points: Points
	tubes: Tubes
	measurements: Measurements

	constructor({
		wheel_diameter,
		bottom_bracket_drop,
		chain_stay_length,
		seat_tube_angle,
		seat_tube_length,
		seat_post_length,
		head_tube_angle,
		wheel_base,
		fork_rake,
		fork_length,
		head_tube_length,
		effective_top_tube_length,
		stack,
		reach
	}: BikeParameters) {
		this.points = {} as Points
		this.tubes = {} as Tubes
		this.measurements = {} as Measurements

		this.points.rear_hub = { x: wheel_diameter / 2, y: wheel_diameter / 2 }

		const chain_stay_angle = Math.asin(bottom_bracket_drop / chain_stay_length)

		this.points.bottom_bracket = {
			x:
				this.points.rear_hub.x + chain_stay_length * Math.cos(chain_stay_angle),
			y: this.points.rear_hub.y + bottom_bracket_drop
		}

		const sin_sta = Math.sin(dtr(seat_tube_angle))
		const cos_sta = Math.cos(dtr(seat_tube_angle))
		const tan_sta = Math.tan(dtr(seat_tube_angle))

		this.points.seat_tube_junction = {
			x: this.points.bottom_bracket.x - seat_tube_length * cos_sta,
			y: this.points.bottom_bracket.y - seat_tube_length * sin_sta
		}

		this.points.seat_post_top = {
			x:
				this.points.seat_tube_junction.x -
				(seat_post_length - seat_tube_length) * cos_sta,
			y:
				this.points.seat_tube_junction.y -
				(seat_post_length - seat_tube_length) * sin_sta
		}

		const sin_hta = Math.sin(dtr(head_tube_angle))
		const cos_hta = Math.cos(dtr(head_tube_angle))

		if (wheel_base) {
			this.points.front_hub = {
				x: this.points.rear_hub.x + wheel_base,
				y: this.points.rear_hub.y
			}

			const rake_point = {
				x: this.points.front_hub.x - fork_rake * sin_hta,
				y: this.points.front_hub.y + fork_rake * cos_hta
			}

			this.points.head_tube_bottom = {
				x: rake_point.x - fork_length * cos_hta,
				y: rake_point.y - fork_length * sin_hta
			}

			this.points.head_tube_top = {
				x: this.points.head_tube_bottom.x - head_tube_length * cos_hta,
				y: this.points.head_tube_bottom.y - head_tube_length * sin_hta
			}
		} else if (effective_top_tube_length) {
			const fh_y = this.points.rear_hub.y
			const rake_point_y = fh_y + fork_rake * cos_hta
			const ht_bottom_y = rake_point_y - fork_length * sin_hta
			const ht_top_y = ht_bottom_y - head_tube_length * sin_hta
			const diff_y = this.points.seat_tube_junction.y - ht_top_y
			const ett_x = this.points.seat_tube_junction.x - diff_y / tan_sta
			this.points.head_tube_top = {
				x: ett_x + effective_top_tube_length,
				y: ht_top_y
			}
			this.points.head_tube_bottom = {
				x: this.points.head_tube_top.x + head_tube_length * cos_hta,
				y: this.points.head_tube_top.y + head_tube_length * sin_hta
			}
			const rake_point = {
				x: this.points.head_tube_bottom.x + fork_length * cos_hta,
				y: this.points.head_tube_bottom.y + fork_length * sin_hta
			}
			this.points.front_hub = {
				x: rake_point.x + fork_rake * sin_hta,
				y: rake_point.y - fork_rake * cos_hta
			}
		} else if (stack && reach) {
			this.points.head_tube_top = {
				x: this.points.bottom_bracket.x + reach,
				y: this.points.bottom_bracket.y - stack
			}
			this.points.head_tube_bottom = {
				x: this.points.head_tube_top.x + head_tube_length * cos_hta,
				y: this.points.head_tube_top.y + head_tube_length * sin_hta
			}
			const rake_point = {
				x: this.points.head_tube_bottom.x + fork_length * cos_hta,
				y: this.points.head_tube_bottom.y + fork_length * sin_hta
			}
			this.points.front_hub = {
				x: rake_point.x + fork_rake * sin_hta,
				y: rake_point.y - fork_rake * cos_hta
			}
		}

		const diff_y =
			this.points.seat_tube_junction.y - this.points.head_tube_top.y
		const ett_x = this.points.seat_tube_junction.x - diff_y / tan_sta
		const ett_point = {
			x: this.points.head_tube_top.x - ett_x,
			y: this.points.seat_tube_junction.y - diff_y
		}

		this.tubes = {
			chain_stay: {
				start: this.points.rear_hub,
				end: this.points.bottom_bracket
			},
			seat_stay: {
				start: this.points.rear_hub,
				end: this.points.seat_tube_junction
			},
			seat_tube: {
				start: this.points.bottom_bracket,
				end: this.points.seat_tube_junction
			},
			seat_post: {
				start: this.points.seat_tube_junction,
				end: this.points.seat_post_top
			},
			down_tube: {
				start: this.points.bottom_bracket,
				end: this.points.head_tube_bottom
			},
			top_tube: {
				start: this.points.seat_tube_junction,
				end: this.points.head_tube_top
			},
			head_tube: {
				start: this.points.head_tube_top,
				end: this.points.head_tube_bottom
			},
			fork: { start: this.points.head_tube_bottom, end: this.points.front_hub }
		}

		const create_measurement = (p1: Point, p2: Point): Measurement => ({
			start: p1,
			end: p2,
			length: hyp(p1, p2)
		})

		this.measurements = {
			wheelbase: create_measurement(
				this.points.front_hub,
				this.points.rear_hub
			),
			front_center: create_measurement(
				this.points.bottom_bracket,
				this.points.front_hub
			),
			stack: create_measurement(
				this.points.head_tube_top,
				this.points.bottom_bracket
			),
			reach: create_measurement(
				this.points.bottom_bracket,
				this.points.head_tube_top
			),
			effective_top_tube: create_measurement(
				ett_point,
				this.points.head_tube_top
			)
		}
	}
}

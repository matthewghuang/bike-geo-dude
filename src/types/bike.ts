import { Point } from "./point"
import { Tube } from "./tube"
import { Measurement } from "./measurement"

const dtr = (degrees: number): number => degrees * (Math.PI / 180)

const hyp = (p1: Point, p2: Point): number =>
	Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

export interface BikeParameters {
	wheel_diameter: number
	chain_stay_length: number
	bottom_bracket_drop: number
	seat_tube_angle: number
	seat_tube_length: number
	head_tube_angle: number
	head_tube_length: number
	fork_length: number
	fork_rake: number
	wheel_base: number
	effective_top_tube_length: number
	stack: number
	reach: number
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
	down_tube: Tube
	top_tube: Tube
	head_tube: Tube
	fork: Tube
}

interface Measurements {
	wheel_base: Measurement
	front_center: Measurement
	stack: Measurement
	reach: Measurement
	effective_top_tube: Measurement
}

export class Bike {
	name: string
	color: string
	parameters: BikeParameters
	points: Points
	tubes: Tubes
	measurements: Measurements
	offset: number

	constructor(name: string, color: string, parameters: BikeParameters) {
		this.name = name
		this.color = color
		this.parameters = parameters
		this.points = {} as Points
		this.tubes = {} as Tubes
		this.measurements = {} as Measurements
		this.offset = 0

		this.points.rear_hub = {
			x: parameters.wheel_diameter / 2,
			y: parameters.wheel_diameter / 2
		}

		const chain_stay_angle = Math.asin(
			parameters.bottom_bracket_drop / parameters.chain_stay_length
		)

		this.points.bottom_bracket = {
			x:
				this.points.rear_hub.x +
				parameters.chain_stay_length * Math.cos(chain_stay_angle),
			y: this.points.rear_hub.y + parameters.bottom_bracket_drop
		}

		const sin_sta = Math.sin(dtr(parameters.seat_tube_angle))
		const cos_sta = Math.cos(dtr(parameters.seat_tube_angle))
		const tan_sta = Math.tan(dtr(parameters.seat_tube_angle))

		this.points.seat_tube_junction = {
			x: this.points.bottom_bracket.x - parameters.seat_tube_length * cos_sta,
			y: this.points.bottom_bracket.y - parameters.seat_tube_length * sin_sta
		}

		const sin_hta = Math.sin(dtr(parameters.head_tube_angle))
		const cos_hta = Math.cos(dtr(parameters.head_tube_angle))

		if (parameters.wheel_base != undefined) {
			this.points.front_hub = {
				x: this.points.rear_hub.x + parameters.wheel_base,
				y: this.points.rear_hub.y
			}

			const rake_point = {
				x: this.points.front_hub.x - parameters.fork_rake * sin_hta,
				y: this.points.front_hub.y + parameters.fork_rake * cos_hta
			}

			this.points.head_tube_bottom = {
				x: rake_point.x - parameters.fork_length * cos_hta,
				y: rake_point.y - parameters.fork_length * sin_hta
			}

			this.points.head_tube_top = {
				x:
					this.points.head_tube_bottom.x -
					parameters.head_tube_length * cos_hta,
				y:
					this.points.head_tube_bottom.y - parameters.head_tube_length * sin_hta
			}
		} else if (parameters.effective_top_tube_length != undefined) {
			const fh_y = this.points.rear_hub.y
			const rake_point_y = fh_y + parameters.fork_rake * cos_hta
			const ht_bottom_y = rake_point_y - parameters.fork_length * sin_hta
			const ht_top_y = ht_bottom_y - parameters.head_tube_length * sin_hta
			const diff_y = this.points.seat_tube_junction.y - ht_top_y
			const ett_x = this.points.seat_tube_junction.x - diff_y / tan_sta
			this.points.head_tube_top = {
				x: ett_x + parameters.effective_top_tube_length,
				y: ht_top_y
			}
			this.points.head_tube_bottom = {
				x: this.points.head_tube_top.x + parameters.head_tube_length * cos_hta,
				y: this.points.head_tube_top.y + parameters.head_tube_length * sin_hta
			}
			const rake_point = {
				x: this.points.head_tube_bottom.x + parameters.fork_length * cos_hta,
				y: this.points.head_tube_bottom.y + parameters.fork_length * sin_hta
			}
			this.points.front_hub = {
				x: rake_point.x + parameters.fork_rake * sin_hta,
				y: rake_point.y - parameters.fork_rake * cos_hta
			}
		} else if (parameters.stack != undefined && parameters.reach != undefined) {
			this.points.head_tube_top = {
				x: this.points.bottom_bracket.x + parameters.reach,
				y: this.points.bottom_bracket.y - parameters.stack
			}
			this.points.head_tube_bottom = {
				x: this.points.head_tube_top.x + parameters.head_tube_length * cos_hta,
				y: this.points.head_tube_top.y + parameters.head_tube_length * sin_hta
			}
			const rake_point = {
				x: this.points.head_tube_bottom.x + parameters.fork_length * cos_hta,
				y: this.points.head_tube_bottom.y + parameters.fork_length * sin_hta
			}
			this.points.front_hub = {
				x: rake_point.x + parameters.fork_rake * sin_hta,
				y: rake_point.y - parameters.fork_rake * cos_hta
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

		this.measurements = {
			wheel_base: {
				start: this.points.front_hub,
				end: this.points.rear_hub,
				length: this.points.front_hub.x - this.points.rear_hub.x
			},
			front_center: {
				start: this.points.bottom_bracket,
				end: this.points.front_hub,
				length: hyp(this.points.bottom_bracket, this.points.front_hub)
			},
			stack: {
				start: this.points.head_tube_top,
				end: this.points.bottom_bracket,
				length: this.points.bottom_bracket.y - this.points.head_tube_top.y
			},
			reach: {
				start: this.points.bottom_bracket,
				end: this.points.head_tube_top,
				length: this.points.head_tube_top.x - this.points.bottom_bracket.x
			},
			effective_top_tube: {
				start: ett_point,
				end: this.points.head_tube_top,
				length: this.points.head_tube_top.x - ett_point.x
			}
		}
	}
}

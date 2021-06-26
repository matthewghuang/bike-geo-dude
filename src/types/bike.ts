const dtr = (degrees: number): number => degrees * (Math.PI / 180)

const hyp = (p1: Point, p2: Point): number =>
	Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

export interface BikeParameters {
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
	wheel_diameter: number
	tire_width: number
	stem_length: number
	stem_angle: number
	spacers: number
	saddle_height: number
}

interface Point {
	x: number
	y: number
}

interface Measurement {
	name: string
	length: number
}

interface Tube {
	name: string
	start: Point
	end: Point
}

interface Points {
	rear_hub: Point
	bottom_bracket: Point
	seat_tube_junction: Point
	seat_post_top: Point
	front_hub: Point
	head_tube_bottom: Point
	head_tube_top: Point
	ett_point: Point
	rake_point: Point
	trail_point: Point
	stem_start: Point
	stem_end: Point
}

interface Tubes {
	chain_stay: Tube
	seat_stay: Tube
	seat_tube: Tube
	down_tube: Tube
	top_tube: Tube
	head_tube: Tube
	fork: Tube
	seat_post: Tube
}

interface Measurements {
	wheel_base: Measurement
	front_center: Measurement
	stack: Measurement
	reach: Measurement
	effective_top_tube: Measurement
	trail: Measurement
}

export class Bike {
	name: string
	color: string
	parameters: BikeParameters
	hidden: boolean
	points: Points
	tubes: Tubes
	measurements: Measurements

	constructor(name: string, color: string, parameters: BikeParameters) {
		this.name = name
		this.color = color
		this.parameters = parameters
		this.hidden = false
		this.points = {} as Points
		this.tubes = {} as Tubes
		this.measurements = {} as Measurements

		this.points.bottom_bracket = {
			x: 0,
			y: 0
		}

		const chain_stay_angle = Math.asin(
			parameters.bottom_bracket_drop / parameters.chain_stay_length
		)

		this.points.rear_hub = {
			x: -(parameters.chain_stay_length * Math.cos(chain_stay_angle)),
			y: -(parameters.chain_stay_length * Math.sin(chain_stay_angle))
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

			this.points.rake_point = {
				x: this.points.front_hub.x - parameters.fork_rake * sin_hta,
				y: this.points.front_hub.y + parameters.fork_rake * cos_hta
			}

			this.points.head_tube_bottom = {
				x: this.points.rake_point.x - parameters.fork_length * cos_hta,
				y: this.points.rake_point.y - parameters.fork_length * sin_hta
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
			this.points.rake_point = {
				x: this.points.head_tube_bottom.x + parameters.fork_length * cos_hta,
				y: this.points.head_tube_bottom.y + parameters.fork_length * sin_hta
			}
			this.points.front_hub = {
				x: this.points.rake_point.x + parameters.fork_rake * sin_hta,
				y: this.points.rake_point.y - parameters.fork_rake * cos_hta
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
			this.points.rake_point = {
				x: this.points.head_tube_bottom.x + parameters.fork_length * cos_hta,
				y: this.points.head_tube_bottom.y + parameters.fork_length * sin_hta
			}
			this.points.front_hub = {
				x: this.points.rake_point.x + parameters.fork_rake * sin_hta,
				y: this.points.rake_point.y - parameters.fork_rake * cos_hta
			}
		}

		this.points.stem_start = {
			x:
				this.points.head_tube_top.x -
				cos_hta * (parameters.spacers ? parameters.spacers + 20 : 20),
			y:
				this.points.head_tube_top.y -
				sin_hta * (parameters.spacers ? parameters.spacers + 20 : 20)
		}

		this.points.stem_end = {
			x:
				this.points.stem_start.x +
				Math.sin(dtr(parameters.head_tube_angle - parameters.stem_angle)) *
					parameters.stem_length,
			y:
				this.points.stem_start.y -
				Math.cos(dtr(parameters.head_tube_angle - parameters.stem_angle)) *
					parameters.stem_length
		}

		this.points.seat_post_top = {
			x:
				this.points.seat_tube_junction.x -
				cos_sta * (parameters.saddle_height - parameters.seat_tube_length),
			y:
				this.points.seat_tube_junction.y -
				sin_sta * (parameters.saddle_height - parameters.seat_tube_length)
		}

		const diff_y =
			this.points.seat_tube_junction.y - this.points.head_tube_top.y
		const ett_x = this.points.seat_tube_junction.x - diff_y / tan_sta
		this.points.ett_point = {
			x: ett_x,
			y: this.points.seat_tube_junction.y - diff_y
		}

		this.tubes = {
			chain_stay: {
				name: "Chain Stay",
				start: this.points.rear_hub,
				end: this.points.bottom_bracket
			},
			seat_stay: {
				name: "Seat Stay",
				start: this.points.rear_hub,
				end: this.points.seat_tube_junction
			},
			seat_tube: {
				name: "Seat Tube",
				start: this.points.bottom_bracket,
				end: this.points.seat_tube_junction
			},
			down_tube: {
				name: "Down Tube",
				start: this.points.bottom_bracket,
				end: this.points.head_tube_bottom
			},
			top_tube: {
				name: "Top Tube",
				start: this.points.seat_tube_junction,
				end: this.points.head_tube_top
			},
			head_tube: {
				name: "Head Tube",
				start: this.points.head_tube_top,
				end: this.points.head_tube_bottom
			},
			fork: {
				name: "Fork",
				start: this.points.head_tube_bottom,
				end: this.points.front_hub
			},
			seat_post: {
				name: "Seat Post",
				start: this.points.seat_post_top,
				end: this.points.seat_tube_junction
			}
		}

		const ground =
			this.points.front_hub.y +
			this.parameters.wheel_diameter / 2 +
			this.parameters.tire_width / 2
		const rake_to_ground = ground - this.points.rake_point.y
		this.points.trail_point = {
			x:
				this.points.rake_point.x +
				rake_to_ground / Math.tan(dtr(this.parameters.head_tube_angle)),
			y: ground
		}
		const trail = this.points.trail_point.x - this.points.front_hub.x

		this.measurements = {
			wheel_base: {
				name: "Wheel Base",
				length: this.points.front_hub.x - this.points.rear_hub.x
			},
			front_center: {
				name: "Front Center",
				length: hyp(this.points.bottom_bracket, this.points.front_hub)
			},
			stack: {
				name: "Stack",
				length: this.points.bottom_bracket.y - this.points.head_tube_top.y
			},
			reach: {
				name: "Reach",
				length: this.points.head_tube_top.x - this.points.bottom_bracket.x
			},
			effective_top_tube: {
				name: "Effective Top Tube",
				length: this.points.head_tube_top.x - this.points.ett_point.x
			},
			trail: {
				name: "Trail",
				length: trail
			}
		}
	}
}

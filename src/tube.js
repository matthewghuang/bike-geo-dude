/**
 * The tube connecting 2 points
 */
export class Tube {
	/**
	 * Tube constructor
	 * @param {Point} start
	 * @param {Point} end
	 */
	constructor(start = { x: 0, y: 0 }, end = { x: 0, y: 0 }) {
		this.start = start
		this.end = end
	}
}

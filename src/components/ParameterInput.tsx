import React from "react"

import { TextField } from "@material-ui/core"

interface Props {
	name: string
	value: number
	setter: (parameter_name: string, n: number) => void
}

export const ParameterInput: React.FC<Props> = ({ name, value, setter }) => {
	return (
		<TextField
			type="number"
			label={name}
			value={value}
			fullWidth
			inputProps={{ min: 0 }}
			onChange={ev => setter(name, Number(ev.target.value))}
		></TextField>
	)
}

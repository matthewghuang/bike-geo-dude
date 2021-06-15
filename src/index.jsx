import React from "react"
import ReactDOM from "react-dom"
import "./tailwind.css"
import { App } from "./App"

ReactDOM.render(
	<React.StrictMode>
		<App></App>
	</React.StrictMode>,
	document.getElementById("root")
)

if (import.meta.hot) import.meta.hot.accept()

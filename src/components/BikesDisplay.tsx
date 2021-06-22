import React, { useCallback } from "react"
import { Bike, BikeParameters } from "../types/bike"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { BikeDisplay } from "./BikeDisplay"

export const BikesDisplay: React.FC<{
	bikes: Bike[]
	edit_bike_name: (index: number, name: string) => void
	edit_bike_color: (index: number, color: string) => void
	edit_bike_parameters: (index: number, parameters: BikeParameters) => void
	delete_bike: (index: number) => void
	hide_bike: (index: number) => void
	drag_end: (result: any) => void
}> = ({
	bikes,
	edit_bike_name,
	edit_bike_color,
	edit_bike_parameters,
	drag_end,
	delete_bike,
	hide_bike
}) => {
	return (
		<DragDropContext onDragEnd={drag_end}>
			<Droppable droppableId="bike-list">
				{(provided, snapshot) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{Object.values(bikes).map((bike, i) => (
							<Draggable key={i} draggableId={`${i}`} index={i}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<BikeDisplay
											bike={bike}
											set_name={name => {
												edit_bike_name(i, name)
											}}
											set_color={color => {
												edit_bike_color(i, color)
											}}
											set_parameters={parameters => {
												edit_bike_parameters(i, parameters)
											}}
											delete_bike={() => delete_bike(i)}
											hide_bike={() => hide_bike(i)}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

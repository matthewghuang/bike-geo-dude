import React, { useCallback } from "react"
import { Bike } from "../types/bike"
import { Box, Paper, Button } from "@material-ui/core"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export const BikesDisplay: React.FC<{
	bikes: Bike[]
	edit_handler: (index: number) => void
	delete_handler: (index: number) => void
	on_drag_end: (result: any) => void
}> = ({ bikes, edit_handler, delete_handler, on_drag_end }) => {
	return (
		<DragDropContext onDragEnd={on_drag_end}>
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
										<Box component={Paper} mb={1}>
											<Box
												p={1}
												display="flex"
												style={{ alignItems: "center" }}
											>
												<Box
													component={Paper}
													color="white"
													bgcolor={bike.color}
													p={1}
												>
													{bike.name}
												</Box>
												<Box ml="auto">
													<Box mr={1} display="inline">
														<Button
															variant="outlined"
															color="secondary"
															onClick={() => edit_handler(i)}
														>
															Edit
														</Button>
													</Box>

													<Button
														variant="outlined"
														color="secondary"
														onClick={() => delete_handler(i)}
													>
														Delete
													</Button>
												</Box>
											</Box>
										</Box>
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

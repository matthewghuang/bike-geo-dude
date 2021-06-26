import React from "../../_snowpack/pkg/react.js";
import {DragDropContext, Droppable, Draggable} from "../../_snowpack/pkg/react-beautiful-dnd.js";
import {BikeDisplay} from "./BikeDisplay.js";
export const BikesDisplay = ({
  bikes,
  edit_bike_name,
  edit_bike_color,
  edit_bike_parameters,
  drag_end,
  delete_bike,
  hide_bike
}) => {
  return /* @__PURE__ */ React.createElement(DragDropContext, {
    onDragEnd: drag_end
  }, /* @__PURE__ */ React.createElement(Droppable, {
    droppableId: "bike-list"
  }, (provided, snapshot) => /* @__PURE__ */ React.createElement("div", {
    ...provided.droppableProps,
    ref: provided.innerRef
  }, Object.values(bikes).map((bike, i) => /* @__PURE__ */ React.createElement(Draggable, {
    key: i,
    draggableId: `${i}`,
    index: i
  }, (provided2, snapshot2) => /* @__PURE__ */ React.createElement("div", {
    ref: provided2.innerRef,
    ...provided2.draggableProps,
    ...provided2.dragHandleProps
  }, /* @__PURE__ */ React.createElement(BikeDisplay, {
    bike,
    set_name: (name) => {
      edit_bike_name(i, name);
    },
    set_color: (color) => {
      edit_bike_color(i, color);
    },
    set_parameters: (parameters) => {
      edit_bike_parameters(i, parameters);
    },
    delete_bike: () => delete_bike(i),
    hide_bike: () => hide_bike(i)
  })))), provided.placeholder)));
};

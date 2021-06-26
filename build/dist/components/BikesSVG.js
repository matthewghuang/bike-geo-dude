import React, {Fragment} from "../../_snowpack/pkg/react.js";
import {MeasurementsSVG} from "./MeasurementsSVG.js";
const TubeSVG = ({x1, y1, x2, y2, color}) => {
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("line", {
    x1,
    y1,
    x2,
    y2,
    stroke: color,
    strokeWidth: "20",
    strokeLinecap: "round"
  }));
};
const WheelSVG = ({bike}) => {
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("circle", {
    cx: bike.points.front_hub.x,
    cy: bike.points.front_hub.y,
    r: bike.parameters.wheel_diameter / 2 + bike.parameters.tire_width / 2,
    fill: "none",
    stroke: bike.color,
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: bike.points.rear_hub.x,
    cy: bike.points.rear_hub.y,
    r: bike.parameters.wheel_diameter / 2 + bike.parameters.tire_width / 2,
    fill: "none",
    stroke: bike.color,
    strokeDasharray: "4"
  }));
};
const StemSVG = ({bike}) => {
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("line", {
    x1: bike.points.stem_start.x,
    y1: bike.points.stem_start.y,
    x2: bike.points.head_tube_top.x,
    y2: bike.points.head_tube_top.y,
    stroke: bike.color,
    strokeWidth: "20",
    opacity: "0.5"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: bike.points.stem_start.x,
    y1: bike.points.stem_start.y,
    x2: bike.points.stem_end.x,
    y2: bike.points.stem_end.y,
    stroke: bike.color,
    strokeWidth: "20",
    strokeLinecap: "round"
  }), /* @__PURE__ */ React.createElement("circle", {
    cx: bike.points.stem_end.x,
    cy: bike.points.stem_end.y,
    r: 31.8 / 2,
    fill: "white",
    stroke: bike.color
  }));
};
export const BikesSVG = ({bikes}) => {
  return /* @__PURE__ */ React.createElement(Fragment, null, bikes.slice().reverse().filter((bike) => !bike.hidden).map((bike, i, arr) => /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("g", {
    style: {opacity: 0.8}
  }, /* @__PURE__ */ React.createElement(StemSVG, {
    bike
  }), /* @__PURE__ */ React.createElement(WheelSVG, {
    bike
  }), Object.values(bike.tubes).map((tube, i2) => /* @__PURE__ */ React.createElement(TubeSVG, {
    key: i2,
    x1: tube.start.x,
    y1: tube.start.y,
    x2: tube.end.x,
    y2: tube.end.y,
    color: bike.color
  }))), i == arr.length - 1 && /* @__PURE__ */ React.createElement(MeasurementsSVG, {
    bike
  }))));
};

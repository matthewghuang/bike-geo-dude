import React, {Fragment} from "../../_snowpack/pkg/react.js";
const Reach = ({bike, pos}) => {
  const bb = bike.points.bottom_bracket;
  const htt = bike.points.head_tube_top;
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("line", {
    x1: bb.x,
    y1: bb.y,
    x2: bb.x,
    y2: htt.y * pos,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: htt.x,
    y1: htt.y * pos,
    x2: htt.x,
    y2: htt.y,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: bb.x,
    y1: htt.y * pos,
    x2: htt.x,
    y2: htt.y * pos,
    stroke: "grey"
  }), /* @__PURE__ */ React.createElement("text", {
    x: (bb.x + htt.x) * 0.5,
    y: (bb.y + htt.y) * pos,
    textAnchor: "middle"
  }, bike.measurements.reach.name, ":", " ", Math.floor(bike.measurements.reach.length + 0.5)));
};
const Stack = ({bike, pos}) => {
  const bb = bike.points.bottom_bracket;
  const htt = bike.points.head_tube_top;
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("line", {
    x1: bb.x,
    y1: bb.y,
    x2: htt.x * pos,
    y2: bb.y,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: htt.x * pos,
    y1: htt.y,
    x2: htt.x,
    y2: htt.y,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: htt.x * pos,
    y1: bb.y,
    x2: htt.x * pos,
    y2: htt.y,
    stroke: "grey"
  }), /* @__PURE__ */ React.createElement("text", {
    x: htt.x * pos,
    y: htt.y * 0.5
  }, bike.measurements.stack.name, ":", " ", Math.floor(bike.measurements.stack.length + 0.5)));
};
const EffectiveTopTube = ({
  bike,
  offset
}) => {
  const ett = bike.points.ett_point;
  const htt = bike.points.head_tube_top;
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("line", {
    x1: htt.x,
    y1: htt.y,
    x2: htt.x,
    y2: htt.y - offset,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: ett.x,
    y1: ett.y,
    x2: ett.x,
    y2: ett.y - offset,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: ett.x,
    y1: ett.y - offset,
    x2: htt.x,
    y2: htt.y - offset,
    stroke: "grey"
  }), /* @__PURE__ */ React.createElement("text", {
    x: (htt.x + ett.x) * 0.5,
    y: ett.y - offset,
    textAnchor: "middle"
  }, bike.measurements.effective_top_tube.name, ":", " ", bike.measurements.effective_top_tube.length));
};
const Trail = ({bike}) => {
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement("line", {
    x1: bike.points.head_tube_top.x,
    y1: bike.points.head_tube_top.y,
    x2: bike.points.trail_point.x,
    y2: bike.points.trail_point.y,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: bike.points.front_hub.x,
    y1: bike.points.front_hub.y,
    x2: bike.points.front_hub.x,
    y2: bike.points.trail_point.y,
    stroke: "grey",
    strokeDasharray: "4"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: bike.points.front_hub.x,
    y1: bike.points.trail_point.y,
    x2: bike.points.trail_point.x,
    y2: bike.points.trail_point.y,
    stroke: "grey"
  }), /* @__PURE__ */ React.createElement("text", {
    x: (bike.points.front_hub.x + bike.points.trail_point.x) / 2,
    y: bike.points.trail_point.y,
    textAnchor: "middle"
  }, bike.measurements.trail.name, ":", " ", Math.floor(bike.measurements.trail.length + 0.5)));
};
export const MeasurementsSVG = ({bike}) => {
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(Reach, {
    bike,
    pos: 0.2
  }), /* @__PURE__ */ React.createElement(Stack, {
    bike,
    pos: 0.2
  }), /* @__PURE__ */ React.createElement(EffectiveTopTube, {
    bike,
    offset: 50
  }), /* @__PURE__ */ React.createElement(Trail, {
    bike
  }));
};

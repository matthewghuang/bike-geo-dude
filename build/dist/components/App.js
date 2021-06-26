import React, {useState, useEffect, useRef, Fragment} from "../../_snowpack/pkg/react.js";
import {Bike} from "../types/bike.js";
import {BikesSVG} from "./BikesSVG.js";
import {
  Button,
  Box,
  ThemeProvider,
  Divider,
  CssBaseline,
  responsiveFontSizes,
  createMuiTheme
} from "../../_snowpack/pkg/@material-ui/core.js";
import {BikeParameterForm} from "./BikeParameterForm.js";
import {BikesDisplay} from "./BikesDisplay.js";
import localforage from "../../_snowpack/pkg/localforage.js";
const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontFamily: "Roboto, sans-serif"
  },
  spacing: 12
}));
const reorder = (list, start_index, end_index) => {
  const result = Array.from(list);
  const [removed] = result.splice(start_index, 1);
  result.splice(end_index, 0, removed);
  return result;
};
export const App = () => {
  const svg = useRef();
  const [view_box, set_view_box] = useState("");
  const [bikes, set_bikes] = useState([]);
  const [adding_bike, set_adding_bike] = useState(false);
  const [new_bike_name, set_new_bike_name] = useState("SuperSix EVO 51");
  const [new_bike_color, set_new_bike_color] = useState("red");
  const [new_bike_parameters, set_new_bike_parameters] = useState({
    seat_tube_length: 477,
    head_tube_angle: 71.2,
    seat_tube_angle: 74.3,
    head_tube_length: 130,
    chain_stay_length: 408,
    bottom_bracket_drop: 74,
    fork_rake: 55,
    effective_top_tube_length: 528,
    wheel_base: void 0,
    stack: void 0,
    reach: void 0,
    fork_length: 375,
    wheel_diameter: 622,
    tire_width: 25,
    stem_length: 90,
    stem_angle: -7,
    spacers: 20,
    saddle_height: 700
  });
  const add_bike = () => {
    set_bikes([
      ...bikes,
      new Bike(new_bike_name, new_bike_color, new_bike_parameters)
    ]);
    set_adding_bike(false);
  };
  const edit_bike_name = (index, name) => {
    const new_bikes = [...bikes];
    new_bikes[index].name = name;
    set_bikes(new_bikes);
  };
  const edit_bike_color = (index, color) => {
    const new_bikes = [...bikes];
    new_bikes[index].color = color;
    set_bikes(new_bikes);
  };
  const edit_bike_parameters = (index, parameters) => {
    const new_bikes = [...bikes];
    const name = new_bikes[index].name;
    const color = new_bikes[index].color;
    new_bikes[index] = new Bike(name, color, parameters);
    set_bikes(new_bikes);
  };
  const delete_bike = (index) => {
    set_bikes(bikes.filter((_, i) => i != index));
  };
  const hide_bike = (index) => {
    const new_bikes = [...bikes];
    new_bikes[index].hidden = !new_bikes[index].hidden;
    set_bikes(new_bikes);
  };
  const on_drag_end = (result) => {
    if (!result.destination)
      return;
    const items = reorder(bikes, result.source.index, result.destination.index);
    set_bikes(items);
  };
  useEffect(() => {
    const bbox = svg.current.getBBox();
    set_view_box(`${bbox.x - svg.current.clientWidth / 2 + bbox.width / 2} ${bbox.y - svg.current.clientHeight / 2 + bbox.height / 2} ${svg.current.clientWidth} ${svg.current.clientHeight}`);
  }, [bikes]);
  useEffect(() => {
    const save_data = async () => {
      await localforage.setItem("bikes", bikes);
    };
    save_data();
  }, [bikes]);
  useEffect(() => {
    const sync_data = async () => {
      const bikes2 = await localforage.getItem("bikes");
      if (bikes2)
        set_bikes(bikes2);
    };
    sync_data();
  }, []);
  return /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme
  }, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement(Box, {
    height: "100vh",
    display: "flex"
  }, /* @__PURE__ */ React.createElement(Box, {
    width: "25%",
    style: {maxHeight: "100%", overflow: "auto"}
  }, /* @__PURE__ */ React.createElement(Box, {
    p: 1,
    bgcolor: "orange",
    color: "white",
    fontSize: "h4.fontSize"
  }, "Bike Geo Dude"), /* @__PURE__ */ React.createElement(Divider, {
    orientation: "horizontal"
  }), /* @__PURE__ */ React.createElement(Box, {
    p: 1
  }, !adding_bike && /* @__PURE__ */ React.createElement(Button, {
    variant: "outlined",
    color: "primary",
    fullWidth: true,
    onClick: () => set_adding_bike(true)
  }, "Add Bike"), adding_bike && /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(Box, {
    mb: 1
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: () => add_bike()
  }, "Add Bike")), /* @__PURE__ */ React.createElement(Box, {
    mb: 1
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "secondary",
    fullWidth: true,
    onClick: () => set_adding_bike(false)
  }, "Cancel")), /* @__PURE__ */ React.createElement(BikeParameterForm, {
    name: new_bike_name,
    color: new_bike_color,
    parameters: new_bike_parameters,
    set_name: set_new_bike_name,
    set_color: set_new_bike_color,
    set_parameters: set_new_bike_parameters
  }))), /* @__PURE__ */ React.createElement(Divider, {
    orientation: "horizontal"
  }), /* @__PURE__ */ React.createElement(Box, {
    p: 1
  }, /* @__PURE__ */ React.createElement(BikesDisplay, {
    bikes,
    drag_end: on_drag_end,
    edit_bike_name,
    edit_bike_color,
    edit_bike_parameters,
    delete_bike,
    hide_bike
  }))), /* @__PURE__ */ React.createElement(Divider, {
    orientation: "vertical"
  }), /* @__PURE__ */ React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: view_box,
    ref: svg
  }, /* @__PURE__ */ React.createElement(BikesSVG, {
    bikes
  }))));
};

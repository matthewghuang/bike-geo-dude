import React, {Fragment, useState} from "../../_snowpack/pkg/react.js";
import {Box, Paper, Button, Divider} from "../../_snowpack/pkg/@material-ui/core.js";
import {BikeParameterForm} from "./BikeParameterForm.js";
export const BikeDisplay = ({
  bike,
  set_name,
  set_color,
  set_parameters,
  delete_bike,
  hide_bike
}) => {
  const [editing, set_editing] = useState(false);
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(Box, {
    component: Paper,
    mb: 1
  }, /* @__PURE__ */ React.createElement(Box, {
    p: 1,
    display: "flex",
    style: {alignItems: "center"}
  }, /* @__PURE__ */ React.createElement(Box, {
    component: !bike.hidden && Paper,
    color: bike.hidden ? "black" : "white",
    bgcolor: !bike.hidden && bike.color,
    p: 1,
    onClick: hide_bike
  }, bike.name), /* @__PURE__ */ React.createElement(Box, {
    ml: "auto"
  }, /* @__PURE__ */ React.createElement(Box, {
    mr: 1,
    display: "inline"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: editing ? "contained" : "outlined",
    color: "secondary",
    onClick: () => set_editing(!editing)
  }, "Edit")), /* @__PURE__ */ React.createElement(Button, {
    variant: "outlined",
    color: "secondary",
    onClick: delete_bike
  }, "Delete"))), editing && /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(Divider, {
    orientation: "horizontal"
  }), /* @__PURE__ */ React.createElement(Box, {
    p: 1
  }, /* @__PURE__ */ React.createElement(BikeParameterForm, {
    name: bike.name,
    color: bike.color,
    parameters: bike.parameters,
    set_name,
    set_color,
    set_parameters
  })))));
};

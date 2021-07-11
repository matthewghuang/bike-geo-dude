import React, {Fragment} from "../../_snowpack/pkg/react.js";
import {Grid, TextField} from "../../_snowpack/pkg/@material-ui/core.js";
const GridInput = (props) => {
  return /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 6
  }, /* @__PURE__ */ React.createElement(TextField, {
    fullWidth: true,
    label: props.label,
    value: props.value,
    onChange: (ev) => props.handler(ev.target.value),
    ...props.input_props
  }));
};
export const BikeParameterForm = (props) => {
  return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 1
  }, /* @__PURE__ */ React.createElement(GridInput, {
    label: "name",
    value: props.name,
    handler: props.set_name
  }), /* @__PURE__ */ React.createElement(GridInput, {
    label: "color",
    value: props.color,
    handler: props.set_color
  }), Object.entries(props.parameters).map(([name, parameter]) => /* @__PURE__ */ React.createElement(GridInput, {
    label: name,
    value: parameter,
    handler: (new_value) => {
      const obj = {...props.parameters};
      obj[name] = new_value == "0" ? void 0 : Number(new_value);
      props.set_parameters(obj);
    },
    input_props: {type: "number"}
  }))));
};

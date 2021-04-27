import React from "react";
import Select from "react-select";
import { propTypes } from "react-bootstrap/esm/Image";

function BaseFilter({
  options,
  value,
  onChange = () => {},
  placeholder = "Select..",
  isLoading = false,
  ...props
}) {
  return (
    <div
      style={{
        minWidth: "200px",
      }}
    >
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isLoading={isLoading}
        {...props}
        getOptionValue={(r) => r?.id}
      />
    </div>
  );
}

export default BaseFilter;

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import "./visibility-filter-input.scss";

import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="filter movies"
    />
  );
}

VisibilityFilterInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string
};

export default connect(null, { setFilter })(VisibilityFilterInput);

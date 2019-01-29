import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CaseItem extends Component {
  render() {
    return (
      <div className="col m4">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{this.props.case.title}</span>
             <p>{this.props.case.description}</p>
          </div>
          <div className="card-action">
            <Link to={'/case/' + this.props.case.id}>Details</Link>
          </div>
        </div>
      </div>
    )
  }
}

CaseItem.propTypes = {
  case     : PropTypes.object.isRequired
}

export default CaseItem

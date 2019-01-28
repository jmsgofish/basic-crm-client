import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class CaseItem extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.case.title} {this.props.case.description} {this.props.case.value} {this.props.case.courtdate} <Link to={'/case/' + this.props.case.id}>details</Link>
        </div>
      </div>
    )
  }
}

export default CaseItem

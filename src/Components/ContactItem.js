import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo'
import Mutations from 'Utils/Mutations'

class ContactItem extends Component {
  render() {

    let remove = '';
    let contactid = this.props.contact.id;

    if (this.props.onRemove) {
      remove = <Mutation mutation={Mutations.ASSIGN_CONTACT} variables={{ contactid }}>
                {postMutation => <span style={{ cursor: 'pointer' }} className="secondary-content" onClick={() => {
                  postMutation().then(() => { this.props.onRemove() }, error => { console.log(error); });
                }}><i className="material-icons">remove_circle_outline</i></span>}
              </Mutation>
    }

    return (
      <li className="collection-item">
        <div>
          <span><Link to={'/contact/' + contactid}>{this.props.contact.firstname} {this.props.contact.lastname}</Link>{remove}</span>
        </div>
      </li>
    )
  }
}


ContactItem.propTypes = {
  contact     : PropTypes.object.isRequired,
  onRemove  : PropTypes.func
}

export default ContactItem

// {this.props.contact.email} {this.props.contact.caserole}
//
// <Link to={'/contact/' + contactid}>details</Link> {remove}

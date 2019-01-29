import React, { Component } from 'react'
import CaseItem from 'Components/CaseItem'
import { Query } from 'react-apollo'
import Queries from 'Utils/Queries'
import { Link } from 'react-router-dom';

class CaseList extends Component {
  render() {
    return (
      <div>
        <div>
          <Link className="waves-effect waves-light btn" to='/casecreate'>Create Case</Link>
          <Link className="waves-effect waves-light btn" to='/casecreate/1'>Create Case with Contact</Link>
        </div>
        <h4>Cases</h4>
        <div className="row">
          <Query query={Queries.CASE_QUERY} fetchPolicy={'network-only'}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const casesToRender = data.allCases;

              return (
                <div>
                  {casesToRender.map(c => <CaseItem key={c.id} case={c} />)}
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default CaseList

import gql from 'graphql-tag'

class Queries  {

  static CONTACT_QUERY = gql`
    {
      allContacts {
        id
        firstname
        lastname
        email
        case {
          id
          title
          description
          value
          courtdate
        }
      }
    }
  `

  static CONTACT_GET = gql`
    query Contact($id: String!) {
      contact(id: $id) {
        id
        firstname
        lastname
        email
        caserole
        case {
          id
          title
          description
          value
          courtdate
        }
      }
    }
  `

  static CASE_QUERY = gql`
    {
      allCases {
        id
        title
        description
        value
        courtdate
      }
    }
  `

  static CASE_GET = gql`
    query Case($id: String!) {
      case(id: $id) {
        id
        title
        description
        value
        courtdate
        contacts {
          id
          firstname
          lastname
          email
          caserole
        }
      }
    }
  `
}

export default Queries;

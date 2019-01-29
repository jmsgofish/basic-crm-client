import gql from 'graphql-tag'

class Mutations  {

  static CREATE_CONTACT = gql`
    mutation CreateContact($firstname: String!, $lastname: String!, $email: String!, $caserole: String!, $caseId: String!) {
      createContact(firstname: $firstname, lastname: $lastname, email: $email, caserole: $caserole, caseId: $caseId) {
        contact {
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
        errors
      }
    }
  `

  static CREATE_CASE = gql`
    mutation CreateCase($title: String!, $description: String!, $value: Float!, $courtdate: DateTime!, $contactFirstname: String, $contactLastname: String, $contactEmail: String, $contactCaserole: String) {
      createCase(title: $title, description: $description, value: $value, courtdate: $courtdate, contactFirstname: $contactFirstname, contactLastname: $contactLastname, contactEmail: $contactEmail, contactCaserole: $contactCaserole) {
        case {
          id
          title
          description
          value
          courtdate
        }
        errors
      }
    }
  `

  static ASSIGN_CONTACT = gql`
  mutation AssignContact($contactid: String!, $caseid: String) {
    AssignContact(contactid: $contactid, caseid: $caseid) {
      case {
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
      errors
    }
  }
  `
}

export default Mutations;

import React, { Component } from 'react'
import { client } from '../network/apollo-client'
import GetCompanies from '../gql/companies.gql'

export function withCompanies (HocComponent) {
  return class WithCompanies extends Component {
    constructor (props) {
      super(props)
      this.state = {
        companies: []
      }
    }

    componentDidMount () {
      client.query({
        query: GetCompanies
      }).then(response => {
        this.setState({
          companies: response.data.companies.data
        })
      })
    }

    render () {
      return (
        <HocComponent {...this.props} companies={this.state.companies} />
      )
    }
  }
}

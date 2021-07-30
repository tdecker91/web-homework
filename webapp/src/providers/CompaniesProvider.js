import React, { Component } from 'react'
import { client } from '../network/apollo-client'
import GetCompanies from '../gql/companies.gql'
import { message } from 'antd'

export function withCompanies (HocComponent) {
  return class WithCompanies extends Component {
    constructor (props) {
      super(props)
      this.state = {
        companies: [],
        error: null
      }
    }

    componentDidMount () {
      client.query({
        query: GetCompanies
      }).then(response => {
        this.setState({
          companies: response.data.companies.data
        })
      }).catch(e => {
        this.setState({
          error: e
        })
        message.error('Error getting companies')
      })
    }

    render () {
      return (
        <HocComponent {...this.props} companies={this.state.companies} error={this.state.error} />
      )
    }
  }
}

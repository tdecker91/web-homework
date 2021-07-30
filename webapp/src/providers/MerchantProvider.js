import React, { Component } from 'react'
import { client } from '../network/apollo-client'
import GetMerchants from '../gql/merchants.gql'

export function withMerchants (HocComponent) {
  return class WithMerchants extends Component {
    constructor (props) {
      super(props)
      this.state = {
        merchants: []
      }
    }

    componentDidMount () {
      client.query({
        query: GetMerchants
      }).then(response => {
        this.setState({
          merchants: response.data.merchants.data
        })
      })
    }

    render () {
      return (
        <HocComponent {...this.props} merchants={this.state.merchants} />
      )
    }
  }
}

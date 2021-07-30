import React, { Component } from 'react'
import { client } from '../network/apollo-client'
import GetUsers from '../gql/users.gql'
import { message } from 'antd'

export function withUsers (HocComponent) {
  return class WithUsers extends Component {
    constructor (props) {
      super(props)
      this.state = {
        users: []
      }
    }

    componentDidMount () {
      client.query({
        query: GetUsers
      }).then(response => {
        this.setState({
          users: response.data.users.data
        })
      }).catch(e => message.error('Error getting users'))
    }

    render () {
      return (
        <HocComponent {...this.props} users={this.state.users} />
      )
    }
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import 'antd/dist/antd.css'
import './index.css'
import { App } from './components/app/App'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)

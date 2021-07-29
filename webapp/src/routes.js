import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Home } from './components/home/Home'
import { Transactions } from './components/transactions/Transactions'

function AppRouter () {
  return (
    <Fragment>
      <Route component={Home} exact path='/' />
      <Route component={Transactions} exact path='/transactions' />
    </Fragment>
  )
}

export default AppRouter

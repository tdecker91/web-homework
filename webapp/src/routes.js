import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Companies } from './components/company/Companies'
import { Home } from './components/home/Home'
import { Transactions } from './components/transactions/Transactions'

function AppRouter () {
  return (
    <Fragment>
      <Route component={Home} exact path='/' />
      <Route component={Transactions} exact path='/transactions' />
      <Route component={Companies} exact path='/companies' />
    </Fragment>
  )
}

export default AppRouter

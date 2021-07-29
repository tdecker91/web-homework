import React from 'react'
import { PageHeader } from 'antd'
import { Nav } from '../nav/Nav'
import { css } from '@emotion/core'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from '../../routes'

export function App () {
  return (
    <Router>
      <PageHeader
        avatar={{ icon: ('🔷'), size: 'large', style: { backgroundColor: '#bae1ff' } }}
        className='site-page-header'
        extra={[
          <Nav key='1' />
        ]}
        title='WebApp'
      />
      <div css={layoutStyle}>
        <div className='main-content' css={contentStyle}>
          <AppRouter />
        </div>
      </div>
    </Router>
  )
}

const layoutStyle = css`
  display: grid;
  grid-row-gap: 24px;
  padding: 8px;
`

const contentStyle = css`
  grid-row: 2;
`

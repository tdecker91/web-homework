import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'

export function Nav () {
  return (
    <nav css={navStyle}>
      <ul >
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/transactions'>Transactions</Link>
        </li>
        <li>
          <Link to='/companies'>Companies</Link>
        </li>
      </ul>
    </nav>
  )
}

const navStyle = css`
  grid-row: 1;
  font-size: 18px;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

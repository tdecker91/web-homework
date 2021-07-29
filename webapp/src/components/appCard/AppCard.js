import { css } from '@emotion/core'
import { Card } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'

export function AppCard ({ children }) {
  return (
    <Card css={cardStyle}>
      { children }
    </Card>
  )
}

const cardStyle = css`
  border-radius: 16px;
  padding: 10px;
  margin: 25px;
  box-shadow: 2px 6px 6px #ddd;
`

AppCard.propTypes = {
  children: PropTypes.node.isRequired
}

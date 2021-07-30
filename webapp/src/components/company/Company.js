import { Avatar, Col, Row, Typography } from 'antd'
import { shape, string } from 'prop-types'
import React, { useState } from 'react'
import { AppCard } from '../appCard/AppCard'

const catan = ['🧱', '🪵', '🐑', '🪨', '🌾']
const colors = {
  '🧱': '#b56f0d77',
  '🪵': '#83d47477',
  '🐑': '#ededed77',
  '🪨': '#80808077',
  '🌾': '#e6d86077'
}

export function Company ({ company }) {
  const [logo] = useState(catan[Math.floor(Math.random() * catan.length)])

  return (
    <AppCard>
      <Row>
        <Col span={16}>
          <Typography.Title level={3}>{company.name}</Typography.Title>
        </Col>
        <Col span={8}>
          <Avatar icon={logo} size={64} style={{ backgroundColor: colors[logo] }} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          Credit Line: {company.credit_line}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          Available Credit: {company.available_credit}
        </Col>
      </Row>
    </AppCard>
  )
}

Company.propTypes = {
  company: shape({
    name: string
  })
}

import React from 'react'
import { any } from 'prop-types'
import { Column } from '@ant-design/charts'

export function BarChart ({ txMerchants }) {
  var chartValues = txMerchants.map(value => ({
    type: value.merchant.name,
    value: value.transactions_sum
  }))

  var config = {
    data: chartValues,
    xField: 'type',
    yField: 'value',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: { alias: 'merchant' },
      value: { alias: 'spend' }
    }
  }

  return (
    <Column {...config} />
  )
}

BarChart.propTypes = {
  txMerchants: any
}

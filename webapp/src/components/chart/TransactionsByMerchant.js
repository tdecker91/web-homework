import React from 'react'
import { Pie } from '@ant-design/charts'
import { any } from 'prop-types'

export function TransactionsByMerchant ({ txMerchants }) {
  var chartValues = txMerchants.map(value => ({
    type: value.merchant.name,
    value: value.transactions_sum
  }))

  var config = {
    appendPadding: 10,
    data: chartValues,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14
      }
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
        content: ''
      }
    }
  }

  return (
    <Pie {...config} />
  )
}

TransactionsByMerchant.propTypes = {
  txMerchants: any
}

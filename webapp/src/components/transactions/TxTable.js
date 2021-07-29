import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { Table } from 'antd'

export function TxTable ({ data }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 530 }}
      size='middle' />
  )
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'User',
    dataIndex: ['user', 'first_name'],
    key: 'user'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'desc'
  },
  {
    title: 'Merchant',
    dataIndex: ['merchant', 'name'],
    key: 'merchant'
  },
  {
    title: 'Type',
    dataIndex: 'debit',
    render: value => value ? 'debit' : 'credit',
    key: 'type'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
  }
]

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    key: number,
    user: shape({
      id: string,
      first_name: string,
      last_name: string
    }),
    description: string,
    merchant: shape({
      id: string,
      name: string
    }),
    debit: bool,
    credit: bool,
    amount: number
  }))
}

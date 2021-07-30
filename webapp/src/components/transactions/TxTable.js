import React, { Fragment } from 'react'
import { arrayOf, string, bool, number, shape, func } from 'prop-types'
import { Button, Table } from 'antd'

export function TxTable ({ data, onEdit, onDelete }) {
  const onClickEdit = (row) => {
    if (typeof onEdit === 'function') {
      onEdit(row)
    }
  }

  const onClickDelete = (row) => {
    if (typeof onDelete === 'function') {
      onDelete(row.id)
    }
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
    },
    {
      title: 'Action',
      key: 'action',
      render: function tableActions (text, row, index) {
        return (
          <Fragment>
            <Button onClick={() => onClickEdit(row)} type='link'>Edit</Button>
            <Button onClick={() => onClickDelete(row)} type='link'>Delete</Button>
          </Fragment>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 530 }}
      size='middle' />
  )
}

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
  })),
  onDelete: func,
  onEdit: func
}

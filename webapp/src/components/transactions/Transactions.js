import { useMutation, useQuery } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import UpdateTransaction from '../../gql/UpdateTransaction.gql'
import CreateTransaction from '../../gql/createTransaction.gql'
import DeleteTransaction from '../../gql/deleteTransaction.gql'
import React, { Fragment, useState } from 'react'
import { Spin, Pagination, Row, Col, message } from 'antd'
import { TxTable } from './TxTable'
import { AppCard } from '../appCard/AppCard'
import { css } from '@emotion/core'
import { TxForm } from './TxForm'
import { client } from '../../network/apollo-client'

const limit = 25

export function Transactions () {
  const [page, setPage] = useState(1)
  const [totalRows, setTotalRows] = useState(0)
  const [selectedTx, setSelectedTx] = useState(null)

  const { loading, error, data = {} } = useQuery(GetTransactions, {
    variables: {
      limit,
      skip: limit * (page - 1)
    }
  })

  const [createTransaction, createTransactionResult] = useMutation(CreateTransaction, {
    onCompleted: (data) => {
      client.resetStore()
      message.info('Transaction created')
    },
    onError: () => {
      message.error('Error creating transaction')
    }
  })

  const [deleteTransaction, deleteTransactionResult] = useMutation(DeleteTransaction, {
    onCompleted: (data) => {
      client.resetStore()
      message.info('Transaction deleted')
    },
    onError: () => {
      message.error('Error deleting transaction')
    }
  })

  const [updateTransaction, updateTransactionResult] = useMutation(UpdateTransaction, {
    onCompleted: (data) => {
      client.resetStore()
      message.info('Transaction updated')
      setSelectedTx(null)
    },
    onError: () => {
      message.error('Error updating transaction')
    }
  })

  const handleFormSave = (values) => {
    const variables = {
      userId: values.user,
      merchantId: values.merchant,
      companyId: values.company,
      description: values.description,
      debit: values.type === 'debit',
      credit: values.type === 'credit',
      amount: parseInt(values.amount)
    }
    if (selectedTx) {
      updateTransaction({
        variables: {
          ...variables,
          id: selectedTx.id
        }
      })
    } else {
      createTransaction({
        variables
      })
    }
  }

  const handleDelete = (id) => {
    deleteTransaction({
      variables: {
        id: id
      }
    })
  }

  const handleEdit = (tx) => {
    setSelectedTx(tx)
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  if (data && data.transactions && totalRows !== data.transactions.total_rows) {
    setTotalRows(data.transactions.total_rows)
  }

  return (
    <Row>
      <Col span={12}>
        <AppCard>
          <div css={tableStyle}>
            <Spin spinning={loading || deleteTransactionResult.loading || updateTransactionResult.loading}>
              {data && data.transactions
                ? (
                  <TxTable
                    data={data.transactions.data.map((row, i) => ({ key: i, ...row }))}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                )
                : null }
            </Spin>
          </div>
          <Pagination
            current={page}
            defaultPageSize={limit}
            onChange={(page, pageSize) => setPage(page)}
            pageSizeOptions={['25']}
            total={totalRows} />
        </AppCard>
      </Col>
      <Col span={12}>
        <AppCard>
          <Spin spinning={createTransactionResult.loading}>
            <TxForm onCancel={() => setSelectedTx(null)} onSave={handleFormSave} tx={selectedTx} />
          </Spin>
        </AppCard>
      </Col>
    </Row>
  )
}

const tableStyle = css`
  min-height: 625px;
`

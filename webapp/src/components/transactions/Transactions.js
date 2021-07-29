import { useMutation, useQuery } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import CreateTransaction from '../../gql/createTransaction.gql'
import React, { Fragment, useState } from 'react'
import { Spin, Pagination, Row, Col, Button } from 'antd'
import { TxTable } from './TxTable'
import { AppCard } from '../appCard/AppCard'
import { css } from '@emotion/core'
import { TxForm } from './TxForm'

const limit = 25

export function Transactions () {
  const [page, setPage] = useState(1)
  const [totalRows, setTotalRows] = useState(0)

  const { loading, error, data = {} } = useQuery(GetTransactions, {
    variables: {
      limit,
      skip: limit * (page - 1)
    }
  })

  const [mutateFunction, mutateResults] = useMutation(CreateTransaction)

  if (mutateResults) {
    //
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
            {loading
              ? <Spin />
              : <TxTable data={data.transactions.data.map((row, i) => ({ key: i, ...row }))} />
            }
          </div>
          <Pagination
            current={page}
            defaultPageSize={limit}
            onChange={setPage}
            pageSizeOptions={['25']}
            total={totalRows} />
        </AppCard>
      </Col>
      <Col span={12}>
        <AppCard>
          <TxForm />
          <Button onClick={() => mutateFunction({ variables: {
            userId: '4cf9d55f-31ce-4c0e-9ec9-0f5c7e53dc31',
            merchantId: 'ed2c1904-6f79-4ab2-9b32-0db7dedb7b14',
            companyId: '5adc1fd4-d1f9-4f64-90cf-299095e4fdf5',
            description: 'Test',
            debit: false,
            credit: false,
            amount: 1000
          } })} >Test</Button>
        </AppCard>
      </Col>
    </Row>
  )
}

const tableStyle = css`
  min-height: 625px;
`

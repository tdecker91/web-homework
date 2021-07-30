import { Col, message, PageHeader, Row, Spin, Table } from 'antd'
import React, { Fragment, useState } from 'react'
import { AppCard } from '../appCard/AppCard'
import { TransactionsByMerchant } from '../chart/TransactionsByMerchant'
import GetMerchantTransactions from '../../gql/merchantTransactions.gql'
import { useQuery } from '@apollo/client'
import { BarChart } from '../chart/BarChart'

export function Home () {
  const [txMerchants, setTxMerchants] = useState([])
  const { loading, error } = useQuery(GetMerchantTransactions, {
    onCompleted: (data) => setTxMerchants(data.tx_merchants.map((merchant, i) => ({ ...merchant, key: i }))),
    onError: () => message.error('Error getting chart data')
  })

  if (error) {
    return '(´･_･`)'
  }

  const columns = [
    {
      title: 'Merchant ID',
      dataIndex: ['merchant', 'id'],
      key: 'id'
    },
    {
      title: 'Merchant Name',
      dataIndex: ['merchant', 'name'],
      key: 'name'
    },
    {
      title: 'Amount',
      dataIndex: 'transactions_sum',
      key: 'sum'
    }
  ]

  return (
    <Fragment>
      <Row>
        <Col span={16}>
          <AppCard>
            <Spin spinning={loading}>
              <PageHeader title='Transactions by merchant' />
              <BarChart txMerchants={txMerchants} />
            </Spin>
          </AppCard>
        </Col>
        <Col span={8}>
          <AppCard>
            <Spin spinning={loading}>
              <PageHeader title='Same thing but in pie form' />
              <TransactionsByMerchant txMerchants={txMerchants} />
            </Spin>
          </AppCard>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AppCard>
            <PageHeader title='Same thing again, but a table' />
            <Table
              columns={columns}
              dataSource={txMerchants}
              pagination={false}
              scroll={{ y: 530 }}
              size='middle' />
          </AppCard>
        </Col>
      </Row>
    </Fragment>
  )
}

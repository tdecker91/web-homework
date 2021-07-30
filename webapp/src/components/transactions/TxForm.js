import { Button, Input, Select, Form, PageHeader } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { withCompanies } from '../../providers/CompaniesProvider'
import { withMerchants } from '../../providers/MerchantProvider'
import { withUsers } from '../../providers/UserProvider'

const { Option } = Select

const withTxFormData = (component) => withUsers(withMerchants(withCompanies(component)))

export const TxForm = withTxFormData(function TxForm ({ users, merchants, companies, onSave, tx, onCancel }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (tx) {
      form.setFieldsValue({
        user: tx.user.id,
        type: tx.credit ? 'credit' : 'debit',
        description: tx.description,
        amount: tx.amount,
        company: tx.company_id,
        merchant: tx.merchant.id
      })
    } else {
      form.resetFields()
    }
  }, [tx])

  const saveForm = (values) => {
    if (typeof onSave === 'function') {
      onSave(values)
    }

    form.resetFields()
  }

  return (
    <Fragment>

      { tx ? (
        <PageHeader
          onBack={onCancel}
          subTitle={tx.id}
          title='Edit' />
      )
        : null }
      <Form
        form={form}
        initialValues={{
          user: '',
          type: 'debit',
          description: '',
          amount: 0,
          company: '',
          merchant: ''
        }}
        labelCol={{ span: 4 }}
        name='transaction'
        onFinish={saveForm}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item label='Type' name='type' wrapperCol={{ span: 5 }}>
          <Select>
            <Option value='debit'>Debit</Option>
            <Option value='credit'>Credit</Option>
          </Select>
        </Form.Item>

        <Form.Item label='User' name='user' wrapperCol={{ span: 5 }}>
          <Select>
            {users.map((user, i) => <Option key={i} value={user.id}>{user.first_name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label='Company' name='company' wrapperCol={{ span: 5 }}>
          <Select>
            {companies.map((company, i) => <Option key={i} value={company.id}>{company.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label='Merchant' name='merchant' wrapperCol={{ span: 5 }}>
          <Select>
            {merchants.map((merchant, i) => <Option key={i} value={merchant.id}>{merchant.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label='Amount' name='amount'>
          <Input type='number' />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button htmlType='submit' type='primary'>{ tx ? 'Update' : 'Create'}</Button>
        </Form.Item>
      </Form>
    </Fragment>
  )
})

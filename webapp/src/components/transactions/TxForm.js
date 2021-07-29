import { Button, Input, Select } from 'antd'
import Form from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'
import React from 'react'

const { Option } = Select

export function TxForm () {
  return (
    <Form
      labelCol={{ span: 3 }}
      name='transaction'
      wrapperCol={{ span: 12 }}
    >
      <FormItem label='description'>
        <Input />
      </FormItem>
      <FormItem label='amount'>
        <Input type='number' />
      </FormItem>

      <FormItem label='type' wrapperCol={{ span: 3 }}>
        <Select defaultvalue='debit'>
          <Option value='debit'>Debit</Option>
          <Option value='credit'>Credit</Option>
        </Select>
      </FormItem>

      <FormItem wrapperCol={{ offset: 3 }}>
        <Button htmlType='submit' type='primary'>Save</Button>
      </FormItem>
    </Form>
  )
}

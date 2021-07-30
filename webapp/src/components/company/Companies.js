import { css } from '@emotion/core'
import { Spin } from 'antd'
import React from 'react'
import { withCompanies } from '../../providers/CompaniesProvider'
import { Company } from '../company/Company'

export const Companies = withCompanies(function Companies ({ companies, error }) {
  return (
    <Spin spinning={companies.length === 0 && !error}>
      <div css={companiesStyle}>
        {companies.map((company, i) =>
          (<Company company={company} key={i} />))}
      </div>
    </Spin>
  )
})

const companiesStyle = css`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 400px);
`

'use client';
import React from 'react';
import styled from 'styled-components';

import CustomTitle, { MainTitle } from '@/components/custom/custom-title';
import { DefaultFont } from '@/constants/style/default-font';
import { LayoutStyle } from '@/constants/style/layout';
import { Colors } from '@/constants/share/colors';

import IconGreenChecked from '@/images/icon/icon-status-green-check.inline.svg';

const PricingFrame = styled.div`
  position: relative;
  width: 100%;
`;

const PricingWrapper = styled.div`
  ${LayoutStyle}
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  box-sizing: border-box;
  padding-top: 3.313rem;
  padding-bottom: 1.625rem;
`;

const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  align-items: center;

  @media (max-width: 1280px) {
    align-items: flex-start;
    overflow: scroll;
  }
`;

const PriceTableHead = styled.div`
  width: 100%;
  height: 1.75rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;

  > div {
    flex: 0 0 18.75rem;

    & + div {
      margin-left: 0.188rem;
    }
  }
  @media (max-width: 1280px) {
    width: 40rem;

    > div:first-child {
      flex: 0 0 14.438rem;
    }
  }
`;

const PriceTableDatas = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -0.094rem;

  @media (max-width: 1280px) {
    width: 40rem;
    align-items: flex-start;
  }
`;

const PriceTableDataRow = styled.div`
  flex: 0 0 3.125rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.094rem;
  ${DefaultFont}
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.22;

  &:first-child > div {
    font-size: 0.875rem;
    font-weight: 500;
    background-color: ${Colors.WHITE};

    &:first-child {
      font-size: 1.125rem;
      font-weight: bold;
      color: ${Colors.SECONDARY};
    }
  }
  &:last-child > div:first-child {
    color: ${Colors.SECONDARY};
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18.75rem;
    background-color: ${Colors.BLUE_LIGHT};

    &:first-child {
      width: 14.438rem;
      justify-content: flex-start;
      background-color: ${Colors.WHITE};
      white-space: pre-wrap;

      > span {
        color: ${Colors.RED};
      }
    }
    & + div {
      margin-left: 0.188rem;
    }
  }
`;

const TableComment = styled.div`
  width: 72rem;
  margin-top: 1.563rem;
  font-size: 0.813rem;
  font-weight: 500;
  color: ${Colors.GRAY9};

  @media (max-width: 1280px) {
    margin-bottom: 0.875rem;
  }
`;

const PricingSection = () => {
  return (
    <PricingFrame>
      <PricingWrapper>
        <MainTitle marginBottom="3.875rem">
          PRICING FOR THE BLUEX WHITE-LABEL E-COMMERCE SOLUTION
        </MainTitle>
        <TableWrapper>
          <PriceTableHead>
            <div></div>
            {['Domestic', 'Regional', 'Global'].map((data, index) => (
              <div key={`table-header-${index}`}>
                <CustomTitle fontSize="1.5rem" color={Colors.SECONDARY}>
                  {data}
                </CustomTitle>
              </div>
            ))}
          </PriceTableHead>
          <PriceTableDatas>
            {[
              {
                header: 'Features',
                cells: [
                  '10,001 - 25,000 TEU',
                  '25,001-150,000 TEU',
                  '150,001+ TEU',
                ],
              },
              {
                header: 'White-Label User Portal',
                cells: [
                  'yes',
                  'yes',
                  'yes',
                ],
              },
              {
                header: 'Admin Portal',
                cells: [
                  'yes',
                  'yes',
                  'yes',
                ],
              },
              {
                header: 'Reporting & Analytics',
                cells: [
                  'yes',
                  'yes',
                  'yes',
                ],
              },
              {
                header: 'Hosting',
                cells: [
                  'yes',
                  'yes',
                  'yes',
                ],
              },
              {
                header: 'Spot Rates',
                cells: [
                  'yes',
                  'yes',
                  'yes',
                ],
              },
              {
                header: 'Contract Rates',
                cells: [
                  'yes',
                  'yes',
                  'yes',
                ],
              },
              {
                header: 'Transshipment /  Feeder Schedules',
                cells: [
                  'no',
                  'yes',
                  'yes',
                ],
              },
              {
                header: 'Inland Schedules',
                cells: [
                  'no',
                  'no',
                  'yes',
                ],
              },
              {
                header: 'Dynamic Pricing',
                cells: [
                  'no',
                  'no',
                  'yes',
                ],
              },
              {
                header: 'Starts At Per Month',
                cells: [
                  '$10,000',
                  '$25,000',
                  '$50,000',
                ],
              },
            ].map(({ header, cells }, index) => (
              <PriceTableDataRow key={`table-row-header-${index}`}>
                <div>
                  {header}
                  {header === 'Dynamic Pricing' ? <span>&nbsp;*</span> : null}
                </div>
                {cells.map((data , index) => (
                  <div key={`table-row-${header}-${index}`}>
                    {data === 'yes' && <IconGreenChecked />}
                    {data !== 'yes' && data !== 'no' && <div>{data}</div>}
                  </div>
                ))}
              </PriceTableDataRow>
            ))}
            <TableComment>
              * Please contact us for more information
            </TableComment>
          </PriceTableDatas>
        </TableWrapper>
      </PricingWrapper>
    </PricingFrame>
  );
};

export default PricingSection;

'use client';
import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

import CustomTitle, { MainTitle } from '@/components/custom/custom-title';
import { LayoutStyle, WindowSize } from '@/constants/style/layout';
import { DefaultFont } from '@/constants/style/default-font';
import { Colors } from '@/constants/share/colors';

const FeatureSectionFrame = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: ${Colors.WHITE};
`;

const FeatureSectionWrapper = styled.div`
  ${LayoutStyle}
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rem;
  box-sizing: border-box;
  padding-top: 4.375rem;
  padding-bottom: 5rem;

  > div:first-child {
    width: 30rem;
    margin-bottom: 4rem;
  }
  @media (max-width: ${WindowSize.mobileL}) {
    > div:first-child {
      width: 100%;
      margin-bottom: 4rem;
    }
  }
`;

const FeatureListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  @media (max-width: ${WindowSize.mobileL}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureItem = styled.div`
  flex: 0 1 14.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${DefaultFont}
  text-transform: uppercase;

  & + div {
    margin-right: 2rem;
  }
  @media (max-width: ${WindowSize.mobileL}) {
    flex: 1 1 auto;

    & + div {
      margin-right: 0rem;
      margin-top: 2rem;
    }
  }
`;

export default function FeatureSection() {
  return (
    <FeatureSectionFrame>
      <FeatureSectionWrapper>
        <MainTitle>
          {'POWERFUL E-COMMERCE TOOLS TO INCREASE REVENUES'}
        </MainTitle>
        <FeatureListWrapper>
          {[
            {
              image:
                'https://www.bluextrade.com/static/d32cd45f33b7cf420ffa0dd4f052fd67/time_1_dd6a1d55a1.svg',
              description: 'THE READY-TO-GO SOLUTION FOR OCEAN CARRIERS',
            },
            {
              image:
                'https://www.bluextrade.com/static/600b8a0d0a4e62a0f6c7573337785a24/boat_1_c945aba570.svg',
              description: 'WORLD-CLASS DIGITAL SHIPPER EXPERIENCE',
            },
            {
              image:
                'https://www.bluextrade.com/static/5f1a754aea81f0067e0315916051b4ed/aggregate_c36ec54fa5.svg',
              description: 'AI-DRIVEN DYNAMIC PRICING',
            },
            {
              image:
                'https://www.bluextrade.com/static/dd8968e208d6566a11ce8f344672aeb1/group_35e1f6d463.svg',
              description: 'ENTERPRISE-CLASS INFORMATION SECURITY',
            },
          ].map(({ image, description }, index) => (
            <FeatureItem key={`attribute-${index}`}>
              <Box height="5rem" mb="1.125rem">
                {
                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                  <img src={image} alt={""} />
                }
              </Box>
              <CustomTitle
                lineHeight="1.563rem"
                whiteSpace="wrap"
                fontFamily="Roboto-Medium, serif"
                fontSize="1rem"
                fontWeight="500"
                color={Colors.SECONDARY}
              >
                {description}
              </CustomTitle>
            </FeatureItem>
          ))}
        </FeatureListWrapper>
      </FeatureSectionWrapper>
    </FeatureSectionFrame>
  );
};

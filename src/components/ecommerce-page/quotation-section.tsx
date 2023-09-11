'use client';
import React from 'react';
import styled from 'styled-components';

import CustomTitle from '@/components/custom/custom-title';
import Paragraph from '@/components/custom/paragraph';
import { LayoutStyle, WindowSize } from '@/constants/style/layout';
import { Colors } from '@/constants/share/colors';

import { LocalizedContent } from '@/cms/ecommerce';

const QuotationFrame = styled.div`
  position: relative;
  background-image: url(${(props) => props.$url});
  width: 100%;
  height: fit-content;
  background-size: cover;
  background-position: center;
`;

const QuotationWrapper = styled.div`
  ${LayoutStyle}
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 3.625rem;
  padding-bottom: 3.563rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 70rem;
  padding: 3.25rem 5rem 1.875rem;
  background-color: rgba(256, 256, 256, 0.1);

  img {
    width: 26rem;
    margin-right: 3rem;
  }
  > div {
    flex: 0 1 29.75rem;
  }
  @media (max-width: ${WindowSize.laptopS}) {
    flex-direction: column;
    width: 100%;
    padding: 1.875rem;

    img {
      width: 100%;
      margin-right: 0rem;
      margin-bottom: 1.25rem;
    }
    > div {
      flex: 1 1 auto;
    }
  }
`;

const QuotationSection = ({ content }: { content: LocalizedContent }) => {
  return (
    <QuotationFrame
      $url={
        process.env.NEXT_PUBLIC_STRAPI_URL +
        content.Section_4_Bg.data.attributes.url.substring(1)
      }
    >
      <QuotationWrapper>
        <ContentWrapper>
          <img
            src={
              process.env.NEXT_PUBLIC_STRAPI_URL +
              content.Section_4_Image.data.attributes.url.substring(1)
            }
            alt={content.Section_4_Content}
          />
          <div>
            <CustomTitle
              marginBottom="1.25rem"
              textAlign="left"
              whiteSpace="wrap"
              color={Colors.WHITE}
              fontSize="1rem"
              fontWeight="normal"
            >
              {content.Section_4_Content}
            </CustomTitle>
            <Paragraph
              title={content.Section_4_Speaker_Paragraph.title}
              titleColor={Colors.SECONDARY}
              alignItems="flex-start"
              titleFontSize="1.25rem"
              contentFontSize="0.875rem"
              contentColor={Colors.GRAY8}
              gap="0.25rem"
            >
              {content.Section_4_Speaker_Paragraph.content}
            </Paragraph>
          </div>
        </ContentWrapper>
      </QuotationWrapper>
    </QuotationFrame>
  );
};

export default QuotationSection;

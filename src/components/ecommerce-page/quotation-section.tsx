'use client';
import React from "react";
import styled from "styled-components";

import CustomTitle from "@/components/custom/custom-title";
import Paragraph from "@/components/custom/paragraph";
import { LayoutStyle, WindowSize } from "@/constants/style/layout";
import { Colors } from "@/constants/share/colors";

const QuotationFrame = styled.div`
  position: relative;
  background-image: url(${props => props.$url});
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

const QuotationSection = ({ }) => {
  return (
    <QuotationFrame $url={"https://www.bluextrade.com/static/23749308ab1069a2770880053285ef54/ecommerce_quotation_bg_d680688d3a.png"}>
      <QuotationWrapper>
        <ContentWrapper>
          <img
            src={"https://www.bluextrade.com/static/41a203b5c61d5ad7ec6abb3e1ef8ca83/evergreen_logo_7fc8739e72.svg"}
            alt={""}
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
              “Evergreen Marine joined the CarrierX Initiative and will launch with the platform because the solution has the potential to be the most effective monetization channel for all of our space, globally.”
            </CustomTitle>
            <Paragraph
              title={"Eric Wang"}
              titleColor={Colors.SECONDARY}
              alignItems="flex-start"
              titleFontSize="1.25rem"
              contentFontSize="0.875rem"
              contentColor={Colors.GRAY8}
              gap="0.25rem"
            >
              Head of Marketing and Sales, Evergreen Maritime Corporation
            </Paragraph>
          </div>
        </ContentWrapper>
      </QuotationWrapper>
    </QuotationFrame>
  );
};

export default QuotationSection;

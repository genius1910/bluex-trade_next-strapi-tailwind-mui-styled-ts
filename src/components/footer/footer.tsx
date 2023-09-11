'use client';
import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, FormControl } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { AvailableLocaleType } from '@/cms/types';
// import ImageLoader from '../utils/image-loader';

import CustomButton from '@/components/custom/custom-button';
import CustomModal from '@/components/custom/custom-modal';
import CustomTitle from '@/components/custom/custom-title';
import { DefaultFont } from '@/constants/style/default-font';
import { Colors } from '@/constants/share/colors';
import { LayoutStyle, WindowSize } from '@/constants/style/layout';
import { LinkType, BeianInfo } from '@/constants/page/layout';
import LayoutContents from '@/constants/mockup/layout-contents';

import PrimaryLogo from '@/images/logo/logo-bluexpay.inline.svg';
import WhiteLogo from '@/images/logo/bluex-logo.inline.svg';
import IconFB from '@/images/icon/icon-fb-3.inline.svg';
import IconYT from '@/images/icon/icon-youtube-3.inline.svg';
import IconTwitter from '@/images/icon/icon-twitter-3.inline.svg';
import IconLinkedin from '@/images/icon/icon-linkedin-3.inline.svg';

const FooterFrame = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: ${Colors.BG_BLUE_DARK};
`;

const FooterWrapper = styled.div`
  ${LayoutStyle}
`;

const SiteMapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;

  @media (max-width: ${WindowSize.mobileL}) {
    flex-direction: column;
  }
`;

const SocialMediaIconList = styled.div`
  display: flex;
  flex-direction: row;

  > a {
    display: flex;
    align-items: center;

    & + a {
      margin-left: 0.688rem;
    }
  }
  @media (max-width: ${WindowSize.mobileL}) {
    position: relative;
    width: 100%;
    justify-content: center;
    margin-top: 3.125rem;
  }
`;

const LinkBtn = styled(Button)`
  justify-content: flex-start;
  padding: 0rem;
  text-transform: none;
`;

const SiteMapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.125rem 0rem 1.875rem 0rem;

  @media (max-width: ${WindowSize.mobileL}) {
    > div {
      text-align: center;
    }
  }
`;

const SiteMapBody = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${WindowSize.laptopS}) {
    flex-direction: column;
    align-items: center;
  }
`;

const SiteMapLinkList = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -1rem 0rem;

  @media (max-width: ${WindowSize.laptopS}) {
    margin: -1rem 0rem 2rem;
  }
`;

const SiteMapItem = styled.div`
  ${DefaultFont}
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  margin: 1rem 0rem;
  line-height: 1.5rem;
  font-size: 0.875rem;

  & > * + * {
    margin-top: 0.625rem;
  }
  > div {
    color: ${Colors.GRAY};
  }
  span {
    & > * {
      justify-content: flex-start;
      min-width: 5rem;
      color: ${Colors.WHITE};
    }
    & > button {
      padding: 0rem;
    }
  }

  @media (max-width: ${WindowSize.mobileL}) {
    flex: 1 1 100%;
    width: 100%;

    & + & {
      margin-left: 0rem;
      margin-top: 3.125rem;
    }
    span > button {
      justify-content: center;
    }
  }
`;

const SiteMapFormWrapper = styled.form`
  width: 25.625rem;

  > div:first-child {
    opacity: 0.7;
    text-align: left;
  }
  .MuiFormControl-root {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: ${WindowSize.mobileL}) {
    width: 100%;

    > div:first-child {
      text-align: center;
    }
    .MuiFormControl-root {
      flex-direction: column;
    }
  }
`;

const CustomInput = styled.input`
  flex: 1 1 auto;
  height: 2.25rem;
  box-sizing: border-box;
  padding: 10px 12px;
  border: none;
  border-radius: 0.25rem;
  margin-top: 0.625rem;
  background-color: ${Colors.BG_BLUE_DARK2};
  color: ${Colors.WHITE};
  font-size: 0.75rem;
  font-weight: 500;

  & + input {
    margin-left: 0.625rem;
  }
  &::placeholder {
    color: ${Colors.GRAY6};
  }
  &:focus-visible {
    outline: ${Colors.SECONDARY} auto 1px;
  }
  &.illegal {
    outline: ${Colors.RED} auto 1px;
  }
  @media (max-width: ${WindowSize.mobileL}) {
    & + input {
      margin-left: 0rem;
    }
  }
`;

const FormSubmitBtn = styled(CustomButton)`
  width: 100%;
  height: 2.25rem;
  margin-top: 0.625rem;

  > span {
    margin-top: -0.5rem;
    font-size: 0.875rem;
    font-weight: normal;

    svg {
      transform: scale(0.7);
    }
  }
`;

const InfoBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 1.875rem 0rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  ${DefaultFont}
  font-family: Roboto;
  font-size: 0.75rem;
  font-weight: bold;

  @media (max-width: ${WindowSize.mobileL}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const InfoBarLink = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${Colors.WHITE};

  > a {
    display: inline-flex;
    align-items: center;
    text-align: center;
    color: ${Colors.WHITE};
  }
  & + & {
    margin-left: 1.25rem;
  }
  @media (max-width: ${WindowSize.mobileL}) {
    flex: 1 1 100%;
    justify-content: center;

    & + & {
      margin-top: 1.25rem;
      margin-left: 0rem;
    }
  }
`;

const ModalWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  padding: 1.875rem 1.25rem;
`;

const ModalButton = styled(CustomButton)`
  margin-top: 2.5rem;
  height: 3rem;
  font-family: inter;
  font-size: 0.75rem;
  font-weight: bold;
`;

const Footer = () => {

  const router = useRouter();

  //   const locale = useSelector((state) => state.global.locale);
  const locale = 'en';
  //   const defaultSearch = useSelector((state) => state.global.defaultSearch);
  const beianList =
    process.env.GATSBY_BEIAN_TYPE === 'bluexpay'
      ? BeianInfo.bluexpay
      : BeianInfo.bluextrade;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [firstCheck, setFirstCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setCompany('');
    setFirstCheck(false);
  }, []);

  const navigateLocalUrl = (url) => {
    router.push(`/${locale}/${url}`);
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    setFirstCheck(true);
    if (!firstName || !lastName || !email || !company) {
      return;
    }

    setLoading(true);
    // if (defaultSearch) {
    //   window.gtag('event', 'subscribe-form-submit', { ...defaultSearch });
    // }

    try {
      // send bluex analytics
      window.bxt &&
        window.bxt('subscribeForm', {
          username: firstName + lastName,
          email: email,
          company: company,
        });

      var _hsq = (window._hsq = window._hsq || []);
      _hsq.push([
        'identify',
        {
          name: firstName + lastName,
          email: email,
          company: company,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      await setTimeout(() => {
        setShowModal(true);
        setLoading(false);
      }, 750);
    }
  };

  const getTimeYear = () => {
    return new Date().getFullYear();
  };

  const socialMediaIconListTemplate = () => {
    return (
      <SocialMediaIconList>
        <a
          href="https://www.facebook.com/bluextrade/"
          target="_blank"
          title="facebook"
          rel="noreferrer"
        >
          <IconFB />
        </a>
        <a
          href="https://www.youtube.com/channel/UCeCS7zsN-p5GluHThlPawaQ"
          target="_blank"
          title="youtube"
          rel="noreferrer"
        >
          <IconYT />
        </a>
        <a
          href="https://mobile.twitter.com/BluexTrade"
          target="_blank"
          title="twitter"
          rel="noreferrer"
        >
          <IconTwitter />
        </a>
        <a
          href="https://www.linkedin.com/company/bluex-trade"
          target="_blank"
          title="linkedin"
          rel="noreferrer"
        >
          <IconLinkedin />
        </a>
      </SocialMediaIconList>
    );
  };

  return (
    <footer>
      <FooterFrame>
        <FooterWrapper>
          <SiteMapWrapper>
            <SiteMapHeader>
              <LinkBtn aria-label="Logo" onClick={() => navigateLocalUrl('')}>
                <WhiteLogo />
              </LinkBtn>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {socialMediaIconListTemplate()}
              </Box>
            </SiteMapHeader>

            <SiteMapBody>
              <SiteMapLinkList>
                {[
                  {
                    title: 'Products',
                    links: [
                      {
                        label: 'BlueX e-Commerce',
                        url: '/ecommerce/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'For Vendors',
                        url: '/vendor/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'For Payers',
                        url: '/pay-it-later/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'For Developers',
                        url: '/for-developer/',
                        type: 'INTERIOR',
                      },
                    ],
                  },
                  {
                    title: 'Company',
                    links: [
                      {
                        label: 'ABOUT US',
                        url: '/about-us/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'PRESS',
                        url: '/in-the-news/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'CAREERS',
                        url: '/careers/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'Security',
                        url: '/security/',
                        type: 'INTERIOR',
                      },
                    ],
                  },
                  {
                    title: 'Resources',
                    links: [
                      {
                        label: 'FAQ',
                        url: 'https://support.bluexpay.com/en/knowledge',
                        type: 'EXTERIOR',
                      },
                      {
                        label: 'BLOG',
                        url: '/blog/',
                        type: 'INTERIOR',
                      },
                      {
                        label: 'PRODUCT STATUS',
                        url: 'https://status.bluexpay.com/#/past_30_days',
                        type: 'EXTERIOR',
                      },
                    ],
                  },
                  {
                    title: 'Keep in Touch',
                    links: [
                      {
                        label: 'US: +1-855-832-BLUE',
                        url: '',
                        type: 'TEXT',
                      },
                      {
                        label: 'ASIA: +886-2-2500-7833',
                        url: '',
                        type: 'TEXT',
                      },
                      {
                        label: 'info@bluextrade.com',
                        url: '',
                        type: 'TEXT',
                      },
                    ],
                  },
                ].map(({ title, links }, index) => (
                  <SiteMapItem key={`sitemap-${index}`}>
                    <div>{title}</div>
                    {links?.map(({ label, url, type }, linkIndex) => (
                      <span key={`sitemap-${index}-link-${linkIndex}`}>
                        {type === LinkType.INTERIOR && (
                          <LinkBtn onClick={() => navigateLocalUrl(url)}>
                            {label}
                          </LinkBtn>
                        )}
                        {type === LinkType.EXTERIOR && (
                          <a
                            href={url}
                            target="_blank"
                            title="linkedin"
                            rel="noreferrer"
                          >
                            {label}
                          </a>
                        )}
                        {type === LinkType.TEXT && <span>{label}</span>}
                      </span>
                    ))}
                  </SiteMapItem>
                ))}
              </SiteMapLinkList>
              <SiteMapFormWrapper onSubmit={(event) => onHandleSubmit(event)}>
                <CustomTitle
                  color={Colors.WHITE}
                  fontSize="0.875rem"
                  fontWeight="normal"
                  whiteSpace="pre-wrap"
                >
                  Sign up to get the latest news in freight and fintech
                </CustomTitle>
                <FormControl>
                  <CustomInput
                    type="text"
                    value={firstName}
                    className={firstCheck && !firstName ? 'illegal' : ''}
                    placeholder={'first name'}
                    onInput={(event) => setFirstName(event.target.value)}
                  />
                  <CustomInput
                    type="text"
                    value={lastName}
                    className={firstCheck && !lastName ? 'illegal' : ''}
                    placeholder={'last name'}
                    onInput={(event) => setLastName(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <CustomInput
                    type="email"
                    value={email}
                    className={firstCheck && !email ? 'illegal' : ''}
                    placeholder={'email'}
                    onInput={(event) => setEmail(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <CustomInput
                    type="text"
                    value={company}
                    className={firstCheck && !company ? 'illegal' : ''}
                    placeholder={'campany'}
                    onInput={(event) => setCompany(event.target.value)}
                  />
                </FormControl>
                <FormSubmitBtn
                  type="submit"
                  borderRadius="none"
                  disabled={loading}
                >
                  {loading ? <CircularProgress /> : <>{'Subscribe'}</>}
                </FormSubmitBtn>
              </SiteMapFormWrapper>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {socialMediaIconListTemplate()}
              </Box>
            </SiteMapBody>
          </SiteMapWrapper>
          <InfoBar>
            {process.env.GATSBY_CN_SITE &&
              process.env.GATSBY_CN_SITE === '1' &&
              beianList.map(({ label, url, icon }, index) => (
                <InfoBarLink key={`beian-${index}`} display="inline-flex">
                  <a href={url} target="_blank" title={label} rel="noreferrer">
                    {icon && (
                      <Box mr="0.25rem">
                        <img
                          // src={ImageLoader('icon/备案图标.png')}
                          alt="BeianIcon"
                        />
                      </Box>
                    )}
                    {label}
                  </a>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }} ml={1.25}>
                    |
                  </Box>
                </InfoBarLink>
              ))}
            {[
              {
                label: 'BlueX Trade Terms of Service',
                url: '/bluextrade-terms-of-service',
              },
              {
                label: 'BlueX Trade Privacy Policy',
                url: '/bluextrade-terms-of-service',
              },
              { label: 'Cookie Policy', url: '/bluextrade-terms-of-service' },
            ].map(({ label, url }, index) => (
              <InfoBarLink key={`infobar-${index}`} display="inline-flex">
                <a href={url}>{label}</a>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }} ml={1.25}>
                  |
                </Box>
              </InfoBarLink>
            ))}
            <InfoBarLink>
              {`©  ${getTimeYear()} ${'2023'} ${'BlueX Trade, All Rights Reserved.'}`}
            </InfoBarLink>
          </InfoBar>
        </FooterWrapper>
        <CustomModal
          width="22.5rem"
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <ModalWrapper>
            <Box mb="6.875rem">
              <PrimaryLogo />
            </Box>
            <Box mb="3.125rem">
              <CustomTitle fontSize="1rem" whiteSpace="pre-wrap">
                Thank you for subscribing.
              </CustomTitle>
            </Box>
            <ModalButton
              type="button"
              borderRadius="0.25rem"
              onClick={() => setShowModal(false)}
            >
              Finish
            </ModalButton>
          </ModalWrapper>
        </CustomModal>
      </FooterFrame>
    </footer>
  );
};

export default Footer;

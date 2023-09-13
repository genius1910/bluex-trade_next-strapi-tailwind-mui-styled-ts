'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@mui/material';
import Button from "@/components/common/ripple-button";
import CircularProgress from '@mui/material/CircularProgress';
import { LinkType } from '@/constants/page/layout';
import PrimaryLogo from '@/images/logo/logo-bluexpay.inline.svg';
import WhiteLogo from '@/images/logo/bluex-logo.inline.svg';
import IconFB from '@/images/icon/icon-fb-3.inline.svg';
import IconYT from '@/images/icon/icon-youtube-3.inline.svg';
import IconTwitter from '@/images/icon/icon-twitter-3.inline.svg';
import IconLinkedin from '@/images/icon/icon-linkedin-3.inline.svg';

const FooterMainSection = () => {
  const router = useRouter();
  const locale = 'en';
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

    try {
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
      <div
        className="relative mt-[3.125rem] flex w-full flex-row
      justify-center gap-3"
      >
        <a
          className="ml-[0.688rem] flex items-center"
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
      </div>
    );
  };

  return (
    <footer>
      <div className="box-border w-full bg-[#11243b]">
        <div className="mx-auto my-0 box-border w-full px-5 lg:w-[60rem]">
          <div className="flex flex-col py-[3.125rem] pb-[1.875rem] text-center md:text-start">
            <div className="mb-[2.5rem] flex flex-col items-center justify-center md:flex-row md:justify-between">
              <Button
                className="text-lowercase justify-start p-0"
                aria-label="Logo"
                onClick={() => navigateLocalUrl('')}
              >
                <WhiteLogo />
              </Button>
              <div className='hidden lg:block'>
                {socialMediaIconListTemplate()}
              </div>
            </div>

            <div className="flex flex-col items-center justify-between lg:flex-row lg:items-start">
              <div className="relative mb-[2rem] mt-[-1rem] flex flex-col flex-wrap md:flex-row lg:mb-0">
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
                  <div
                    className={`flex-[0 0 50%] my-[1rem] flex flex-col font-[lato] text-[0.875rem] text-base font-normal leading-[1.5rem] tracking-normal md:w-1/2 ${
                      index === 0 ? null : 'mt-[3.125rem] md:mt-[1rem]'
                    }`}
                    key={`sitemap-${index}`}
                  >
                    <div className="text-[#d7d7d7]">{title}</div>
                    {links?.map(({ label, url, type }, linkIndex) => (
                      <span
                        className="mt-[0.625rem] flex min-w-[5rem] justify-center text-white md:justify-start"
                        key={`sitemap-${index}-link-${linkIndex}`}
                      >
                        {type === LinkType.INTERIOR && (
                          <Button
                            className="justify-center p-0 font-semibold uppercase text-white md:justify-start"
                            onClick={() => navigateLocalUrl(url)}
                          >
                            {label}
                          </Button>
                        )}
                        {type === LinkType.EXTERIOR && (
                          <a
                            className="font-semibold text-white"
                            href={url}
                            target="_blank"
                            title="linkedin"
                            rel="noreferrer"
                          >
                            {label}
                          </a>
                        )}
                        {type === LinkType.TEXT && (
                          <span className=" font-semibold">{label}</span>
                        )}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <form
                className=" w-full md:w-[25.625rem]"
                onSubmit={(event) => onHandleSubmit(event)}
              >
                <div className=" font-lato whitespace-pre-wrap text-center text-[0.875rem] font-normal leading-normal tracking-normal text-white opacity-70 md:text-start">
                  Sign up to get the latest news in freight and fintech
                </div>
                <div className="relative m-0 flex w-full min-w-[0] flex-col border-0 p-0 align-top md:flex-row">
                  <input
                    className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded-[0.25rem] border-none bg-[#1b314c] px-[10px] py-[12px] text-[0.75rem] font-medium text-white ${
                      firstCheck && !firstName ? 'illegal' : ''
                    }`}
                    type="text"
                    value={firstName}
                    placeholder={'first name'}
                    onInput={(event) => setFirstName(event.target.value)}
                  />
                  <input
                    className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded-[0.25rem] border-none bg-[#1b314c] px-[10px] py-[12px] text-[0.75rem] font-medium text-white md:ml-[0.625rem] ${
                      firstCheck && !firstName ? 'illegal' : ''
                    }`}
                    type="text"
                    value={lastName}
                    placeholder={'last name'}
                    onInput={(event) => setLastName(event.target.value)}
                  />
                </div>
                <div className="relative m-0 flex w-full min-w-[0] flex-row border-0 p-0 align-top">
                  <input
                    className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded-[0.25rem] border-none bg-[#1b314c] px-[10px] py-[12px] text-[0.75rem] font-medium text-white ${
                      firstCheck && !firstName ? 'illegal' : ''
                    }`}
                    type="email"
                    value={email}
                    placeholder={'email'}
                    onInput={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="relative m-0 flex w-full min-w-[0] flex-row border-0 p-0 align-top">
                  <input
                    className={`mt-[0.625rem] box-border h-[2.25rem] flex-1 rounded-[0.25rem] border-none bg-[#1b314c] px-[10px] py-[12px] text-[0.75rem] font-medium text-white ${
                      firstCheck && !firstName ? 'illegal' : ''
                    }`}
                    type="text"
                    value={company}
                    placeholder={'campany'}
                    onInput={(event) => setCompany(event.target.value)}
                  />
                </div>
                <button
                  className="mt-[0.625rem] h-[2.25rem] w-full cursor-pointer border-none bg-[#009bd2] p-[0.375rem] px-[0.5rem] text-center font-[lato] text-[1rem] font-bold capitalize leading-normal text-white"
                  type="submit"
                  borderRadius="none"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress className="!h-6 !w-6" />
                  ) : (
                    <>{'Subscribe'}</>
                  )}
                </button>
              </form>
              <div className='block lg:hidden'>
                {socialMediaIconListTemplate()}
              </div>
            </div>
          </div>
          <div className="font-roboto flex flex-col items-center justify-end gap-4 border-t-[1px] border-[#ffffff33] py-[1.875rem] text-[0.75rem] font-bold leading-normal tracking-normal md:flex-row">
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
              <div
                className="ml-[1.25rem] inline-flex items-center text-white"
                key={`infobar-${index}`}
                display="inline-flex"
              >
                <a className="font-semibold text-white" href={url}>
                  {label}
                </a>
                <div className='hidden md:block ml-[1.25rem]'>
                  |
                </div>
              </div>
            ))}
            <div className="ml-[1.25rem] inline-flex items-center text-white">
              {`©  ${getTimeYear()} ${'2023'} ${'BlueX Trade, All Rights Reserved.'}`}
            </div>
          </div>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div
            className={`w-[calc(100vw - 2.5rem)] shadow-[0 0 20px 0 rgba(0, 0, 0, 0.1)] max-h-max-content absolute left-1/2 top-1/2 h-auto -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded-[0.625rem] bg-white !outline-none lg:w-[22.5rem] lg:overflow-hidden`}
          >
            <div className="relative box-border flex h-full flex-col overflow-hidden px-[1.25rem] py-[1.875rem]">
              <div className='mb-[6.875rem]'>
                <PrimaryLogo />
              </div>
              <div className='mb-[3.125rem]'>
                <div className="whitespace-pre-wrap text-center font-[lato] text-[1rem] font-bold leading-normal tracking-normal text-[#18335e]">
                  Thank you for subscribing.
                </div>
              </div>
              <button
                className="font-inter mt-[2.5rem] h-[3rem] cursor-pointer rounded-[0.25rem] border-none bg-[#009bd2] p-[0.375rem] px-[0.5rem] text-center text-[0.75rem] font-bold capitalize leading-normal tracking-normal text-white"
                onClick={() => setShowModal(false)}
              >
                Finish
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </footer>
  );
};

export default FooterMainSection;

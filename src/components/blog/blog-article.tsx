'use client'
import Image from 'next/image';
import { buildCmsUrl } from '@/cms/base';
import { LocalizedContent } from '@/cms/blog-page';
import { formatBlogDate } from '@/lib/format';
import { BlogEntry } from '@/cms/blog-search';
import ShareButton from "./share-button";
import IconArticle from "@/images/icon/icon-article.inline.svg";
import Link from "next/link";
import { MarkDownTranslator } from "@/utils/MarkDownTranslator";

const BlogArticle = ({ localizedContent, blog, blogs }: { blog: BlogEntry, blogs: BlogEntry[], localizedContent: LocalizedContent }) => {

  return (
    <div className='relative w-full h-fit scroll-smooth'>
      <div className='relative w-full box-border px-5 min-h-[30rem] h-fit mx-auto my-0 pt-[5.875rem] lg:w-[60rem] lg:px-0'>
        <div className='mx-[-1.25rem] mt-0 mb-[2.375rem] lg:mx-0 lg:mb-[1.875rem]'>
          <Image
            className='w-full lg:min-h-[30rem]'
            src={buildCmsUrl(blog.Image.url)}
            alt={blog.Image.alternativeText || 'image'}
            width="960"
            height="650"
            priority={true}
          />
        </div>
        <div className='text-primary text-4xl font-title font-bold leading-[3.375rem] tracking-normal whitespace-pre-wrap text-left'>
          {blog.Title}
        </div>
        <div  // ArticleSub
          className='flex flex-col justify-between my-[1.313rem] items-end lg:flex-row lg:items-baseline'
        >
          <div // ArticleInfo
            className='tracking-[normal] text-sm leading-[1.375rem] font-bold font-title uppercase'
          >
            <div>
              <span
                className='text-secondary'
              >
                {blog.Author}
              </span>
              {blog.Type ? (
                <span
                  className='text-[#11af94] ml-5'
                >
                  {
                    localizedContent.Blog_Type_List.find(type => type.link === blog.Type)
                      ?.text
                  }
                </span>
              ) : null}
              {blog.Category ? (
                <span
                  className='text-[#F4781F] ml-5'
                >
                  {
                    localizedContent.Category_Type_List.find(
                      category => category.link === blog.Category
                    )?.text
                  }
                </span>
              ) : null}
            </div>
            <div
              className='text-[#8497b9] mt-1'
            >
              {`Created on ${formatBlogDate(blog.createdAt)}`}
            </div>
            <div
              className='text-[#8497b9] mt-1'
            >
              {`Updated on ${formatBlogDate(blog.UpdateDate)}`}
            </div>
          </div>
          <ShareButton url={typeof window !== 'undefined' ? window.location.href.substring(0, window.location.href.length - 1) : ''} title={blog.Title} />
        </div>

        <div className='flex mb-[3.125rem] text-primary font-normal text-base leading-normal tracking-normal font-title scroll-smooth'>
          <div className='hidden md:block flex-none w-[13.75rem]'>
            <div className='mr-5'>
              <div className='flex items-center w-full h-9 pl-2.5 bg-[#ecf3fa] leading-6 text-[0.875rem] text-primary font-bold box-border font-title'>
                {localizedContent.Template_Sidebar_Section_1_Title}
              </div>
              <div className='mt-[1rem] mb-[1.5rem]'>
                <ol className='list-none pl-0'>
                  <nav className="scroll-smooth">
                    {blog.ContentList?.map(
                      ({ title }, index) => title && (
                        <li key={`content-subtitle-${index}`} className='flex mt-[0.5rem]'>
                          <span className='pt-0.5 mr-2 text-base'>{`${index}.`}</span>
                          <a className="scroll-smooth font-[Roboto-medium] tracking-[0.02857em] leading-7 text-[0.875rem] items-start p-0 text-left text-[#5b77ab] notranslate font-medium"
                            href={`#${title}`}
                          >
                            {title}

                          </a>
                        </li>
                      )
                    )}
                  </nav>
                </ol>
              </div>

              <div className='flex items-center w-full h-9 pl-2.5 bg-[#ecf3fa] leading-6 text-[0.875rem] text-primary font-bold box-border font-title'>
                {localizedContent.Template_Sidebar_Section_2_Title}
              </div>
              <div className="mt-4 mb-6">
                {blogs.map((blog, index) => (
                  <div key={`recent-blog-${index}`} className="inline-flex items-center w-full mt-5 ">
                    <IconArticle className='w-[1.875rem] flex-none mr-[0.625rem]' />
                    <Link href={`/${blog.locale}/blog/${blog.Url}`} className="flex-1 leading-[1.375rem] text-sm text-[#5b77ab]">{blog.Title}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 text-primary">
            {blog.ContentList.map(({ title, titleSize, content }, index) => (
              <section
                id={title as string}
                key={`content-paragraph-${index}`}
                className="mb-[3.125rem]"
              >
                <div className={`text-2xl font-bold leading-[1.875rem] tracking-normal whitespace-pre-wrap text-left`}
                >
                  {title}
                </div>
                <div className="list-p">
                  {MarkDownTranslator(content as string)}
                </div>
              </section>
            ))}
          </div>
        </div>
        <div className="flex flex-row-reverse mb-[6.25rem] gap-[0.688rem]">
          <ShareButton url={typeof window !== 'undefined' ? window.location.href.substring(0, window.location.href.length - 1) : ''} title={blog.Title} />
        </div>
      </div>
    </div>
  )
}

export default BlogArticle;

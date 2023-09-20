import { fetchContent } from '@/cms/blog-page';
import { fetchBySlug, fetchLatest } from '@/cms/blog-search';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import BlogArticle from '@/components/blog/blog-article';
// import dynamic from 'next/dynamic';
// const BlogArticle = dynamic(() => import('@/components/blog/blog-article').then(), { ssr: false });

export default async function Page({ params }: { params: { lang: string, slug: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType)
  const pageContent = await fetchContent()
  const localizedContent = pageContent[locale] || pageContent[defaultLocale]
  const blog = await fetchBySlug(params.slug)
  const blogs = await fetchLatest(6);
  if (!blog) {
    return false
  }

  return (
    <>
      <BlogArticle
        blog={blog}
        blogs={blogs}
        localizedContent={localizedContent}
      />

      {/* use white background header in this page */}
      <style>{`
        div { --header-text: #18335e; }
        header .dark-logo { display: block; }
        header .white-logo { display: none; }
      `}</style>
    </>
  )
}

import { fetchContent } from '@/cms/blog-page';
import { fetchBySlug } from '@/cms/blog-search';
import { AvailableLangType, defaultLocale, mapLangToLocale } from '@/cms/types';
import BlogArticle from '@/components/blog/blog-article';

export default async function Page({ params }: { params: { lang: string, slug: string } }) {
  const locale = mapLangToLocale(params.lang as AvailableLangType)
  const pageContent = await fetchContent()
  const localizedContent = pageContent[locale] || pageContent[defaultLocale]
  const blog = await fetchBySlug(params.slug)
  if (!blog) {
    return false
  }

  return (
    <>
      <BlogArticle
        blog={blog}
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

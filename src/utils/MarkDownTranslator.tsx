import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw';

export const MarkDownTranslator = (origin: string | null) => {
  const imgDeUrl = '/uploads/';
  const content = origin?.replaceAll(
    imgDeUrl,
    `${process.env.NEXT_PUBLIC_STRAPI_URL?.substring(0, process.env.NEXT_PUBLIC_STRAPI_URL?.length - 1)}${imgDeUrl}`,
  );

  return (
    content && (
      <ReactMarkdown
        // rehypePlugins={[rehypeRaw]}
        linkTarget="_blank"
      >
        {content}
      </ReactMarkdown>
    )
  );
};

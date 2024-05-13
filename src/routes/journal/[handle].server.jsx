import {
  useLocalization,
  useShopQuery,
  Seo,
  gql,
  Image,
  CacheLong,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {CustomFont, PageHeader} from '~/components';
import {Layout, NotFound} from '~/components/index.server';
import {ATTR_LOADING_EAGER} from '~/lib/const';

const BLOG_HANDLE = 'journal';

export default function Post({params, response}) {
  response.cache(CacheLong());
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {handle} = params;
  const {data} = useShopQuery({
    query: ARTICLE_QUERY,
    variables: {
      language: languageCode,
      blogHandle: BLOG_HANDLE,
      articleHandle: handle,
    },
  });

  useServerAnalytics({
    shopify: {
      canonicalPath: `/${BLOG_HANDLE}/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.article,
    },
  });

  if (!data?.blog?.articleByHandle) {
    return <NotFound />;
  }

  const {title, publishedAt, contentHtml, author} = data.blog.articleByHandle;
  const formattedDate = new Intl.DateTimeFormat(
    `${languageCode}-${countryCode}`,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  ).format(new Date(publishedAt));

  return (
    <Layout>
      {/* Loads Fraunces custom font only on articles */}
      <CustomFont />
      <Suspense>
        {/* @ts-expect-error Blog article types are not supported in TS */}
        <Seo type="page" data={data.blog.articleByHandle} />
      </Suspense>
      {/* Title - Date Format */}
      {/* <PageHeader heading={title}>
        <span>
          {formattedDate} &middot; {author.name}
        </span>
      </PageHeader> */}
      <div className="w-full mx-auto mt-8 md:mt-16 max-w-7xl xs:px-10">
        {/* Image */}
        {data.blog.articleByHandle.image && (
          <Image
            data={data.blog.articleByHandle.image}
            className="w-full mx-auto mt-8 md:mt-16 max-w-9xl"
            sizes="90vw"
            widths={[400, 800, 1200]}
            width="100px"
            loading={ATTR_LOADING_EAGER}
            loaderOptions={{
              scale: 2,
              crop: 'center',
            }}
          />
        )}
        {/* Title - Date Format */}
        <PageHeader heading={title}>
          <span>
            {formattedDate} &middot; {author.name}
          </span>
        </PageHeader>
        {/* Descriptions */}
        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="article py-10"
        />
      </div>
    </Layout>
  );
}

const ARTICLE_QUERY = gql`
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
      }
    }
  }
`;

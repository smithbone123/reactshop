import {Suspense} from 'react';
import {
  useShopQuery,
  useLocalization,
  gql,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';

import {PageHeader, Section, Grid} from '~/components';
import {Layout, CollectionCard} from '~/components/index.server';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

export default function Collections() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'All Collections'}} />
      <PageHeader heading="Collections" />
      <Section>
        <Suspense>
          <CollectionGrid />
        </Suspense>
      </Section>
    </Layout>
  );
}

function CollectionGrid() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: COLLECTIONS_QUERY,
    variables: {
      pageBy: PAGINATION_SIZE,
      country: countryCode,
      language: languageCode,
    },
    preload: true,
  });

  useServerAnalytics({
    shopify: {
      canonicalPath: '/collections',
      pageType: ShopifyAnalyticsConstants.pageType.listCollections,
    },
  });

  const collections = data.collections.nodes;

  return (
    <div className="px-4 md:px-8 lg:px-8">
      <div className="grid-flow-row grid gap-4 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {collections // Desc sorting
          ?.slice(0)
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          // Desc sorting
          .map((collection, i) => (
            <CollectionCard
              collection={collection}
              key={collection.id}
              loading={getImageLoadingPriority(i, 2)}
            />
          ))}
      </div>
    </div>
  );
}

const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
      }
    }
  }
`;

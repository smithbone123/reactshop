// HomePage

import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
// Placeholders
import {getHeroPlaceholder} from '~/lib/placeholders';
// FeaturedCollections, Hero
import {
  SwiperCollection,
  CollectionSlider,
  FeaturedCollections,
  FeaturedArticles,
  Hero,
} from '~/components';
// Layout, ProductSwimlane
import {Layout, ProductSwimlane, NewProduct} from '~/components/index.server';

export default function Homepage() {
  useServerAnalytics({
    shopify: {
      canonicalPath: '/',
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  // HomepageContent
  return (
    <Layout>
      <Suspense>
        <SeoForHomepage />
      </Suspense>
      <Suspense>
        <HomepageContent />
      </Suspense>
    </Layout>
  );
}

function HomepageContent() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: HOMEPAGE_CONTENT_QUERY,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });

  const {
    swiperCollections,
    sliderCollections,
    newProducts,
    featuredProducts,
    featuredCollections,
    featuredArticles,
    heroBanners,
  } = data;

  // fill in the hero banners with placeholders if they're missing
  const [primaryHero, secondaryHero, tertiaryHero] = getHeroPlaceholder(
    heroBanners.nodes,
  );

  // Layout
  return (
    <>
      {/* SWIPER COLLECTION */}
      <SwiperCollection data={swiperCollections.nodes} title="Collections" />

      {/* COLLECTION SLIDER */}
      {/* <CollectionSlider data={sliderCollections.nodes} title="Collections" /> */}

      {/* NEW PRODUCTS */}
      <NewProduct data={newProducts.nodes} />

      {/* PRODUCT SWIMLANE*/}
      {/* <ProductSwimlane data={featuredProducts.nodes} /> */}

      {/* FEATURED COLLECTIONS */}
      <FeaturedCollections
        data={featuredCollections.nodes}
        title="Collections"
      />

      {/* FEATURED BLOGS */}
      {/* <FeaturedArticles data={featuredArticles.nodes} title="Blogs" /> */}

      {/* FIRST HERO */}
      {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )}

      {/* SECOND HERO*/}
      {secondaryHero && <Hero {...secondaryHero} />}

      {/* THIRD HERO */}
      {tertiaryHero && <Hero {...tertiaryHero} />}
    </>
  );
}

// SeoForHomepage
function SeoForHomepage() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: HOMEPAGE_SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: name,
        description,
        titleTemplate: '%s',
      }}
    />
  );
}

// GraphQL
const HOMEPAGE_CONTENT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    # SWIPER COLLECTIONS
    swiperCollections: collections(first: 3) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }

    # SLIDER COLLECTIONS
    # sliderCollections: collections(first: 3) {
    #   nodes {
    #     id
    #     title
    #     handle
    #     image {
    #       altText
    #       width
    #       height
    #       url
    #     }
    #   }
    # }

    # HERO BANNERS
    heroBanners: collections(first: 1, query: "title:Summer") {
      nodes {
        id
        handle
        title
        descriptionHtml
        heading: metafield(namespace: "hero", key: "title") {
          value
        }
        byline: metafield(namespace: "hero", key: "byline") {
          value
        }
        cta: metafield(namespace: "hero", key: "cta") {
          value
        }
        spread: metafield(namespace: "hero", key: "spread") {
          reference {
            ...Media
          }
        }
        spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
          reference {
            ...Media
          }
        }
      }
    }

    # HERO BANNERS
    # heroBanners: collections(first: 3 query: "collection_type:custom" sortKey: UPDATED_AT) {
    #   nodes {
    #     id
    #     handle
    #     title
    #     descriptionHtml
    #     heading: metafield(namespace: "hero", key: "title") {
    #       value
    #     }
    #     byline: metafield(namespace: "hero", key: "byline") {
    #       value
    #     }
    #     cta: metafield(namespace: "hero", key: "cta") {
    #       value
    #     }
    #     spread: metafield(namespace: "hero", key: "spread") {
    #       reference {
    #         ...Media
    #       }
    #     }
    #     spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
    #       reference {
    #         ...Media
    #       }
    #     }
    #   }
    # }

    # NEW PRODUCTS
    newProducts: products(first: 8) {
      nodes {
        ...ProductCard
      }
    }

    # PRODUCT SWIMLANE
    # featuredProducts: products(first: 8) {
    #   nodes {
    #     ...ProductCard
    #   }
    # }

    # FEATURED COLLECTIONS
    featuredCollections: collections(first: 3) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }

    # BLOG
    # featuredArticles: articles(first: 4) {
    #   nodes {
    #     id
    #     title
    #     handle
    #     image {
    #       altText
    #       width
    #       height
    #       url
    #     }
    #   }
    # }
  }
`;

const HOMEPAGE_SEO_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;

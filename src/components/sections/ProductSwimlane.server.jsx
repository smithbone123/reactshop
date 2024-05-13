// New Arrivals // Related Products

import {Suspense, useMemo} from 'react';
import {gql, useShopQuery, useLocalization, Link} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductCard, Section} from '~/components';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'New Arrivals',
  data = mockProducts,
  count = 12,
  ...props
}) {
  const productCardsMarkup = useMemo(() => {
    // New Arrivals => HomePage
    // Result Page => src/components/search/NoResultRecommendation.server.jsx
    if (typeof data === 'object') {
      return <ProductCards products={data} />;
    }

    // Related Products
    if (typeof data === 'string') {
      return (
        <Suspense>
          <RecommendedProducts productId={data} count={count} />
        </Suspense>
      );
    }

    // If no data is provided, we'll go and query the top products
    return <TopProducts count={count} />;
  }, [count, data]);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        {/* button */}
        <div className="flex justify-between items-end gap-4 mb-6">
          <Section heading={title} {...props}></Section>
          <Link
            to="/products"
            className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3"
          >
            Show more
          </Link>
        </div>
        {/* featured products */}
        <div className="grid-flow-row grid gap-4 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-4 mt-8 pt-0">
          {productCardsMarkup}
        </div>
      </div>
    </div>
  );
}

// PRODUCT CARD = src/components/cards/ProductCard.client.jsx
function ProductCards({products}) {
  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
}

function RecommendedProducts({productId, count}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data: products} = useShopQuery({
    query: RECOMMENDED_PRODUCTS_QUERY,
    variables: {
      count,
      productId,
      languageCode,
      countryCode,
    },
  });

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);

  return <ProductCards products={mergedProducts} />;
}

function TopProducts({count}) {
  const {
    data: {products},
  } = useShopQuery({
    query: TOP_PRODUCTS_QUERY,
    variables: {
      count,
    },
  });

  return <ProductCards products={products.nodes} />;
}

const RECOMMENDED_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

const TOP_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query topProducts(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

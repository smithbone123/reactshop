// HomePage > New Products > Related Products
// import {Swiper, SwiperSlide} from 'swiper/react';
import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';

import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function NewProductCard({product, label, loading, onClick}) {
  let cardLabel;

  const cardData = product?.variants ? product : getProductPlaceholder();

  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(cardData?.variants)[0] || {};

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  // product card start
  return (
    <>
      <div>
        {/* <!-- product - start --> */}
        <Link
          onClick={onClick}
          to={`/products/${product.handle}`}
          className="group block bg-gray-100 border overflow-hidden relative mb-2 lg:mb-3"
        >
          {image && (
            <Image
              data={image}
              alt={image.altText || `${product.title}`}
              loading={loading}
              className="w-full object-cover object-center group-hover:scale-110 transition duration-200"
            />
          )}
          <span className="text-red-500 text-md font-medium absolute left-0 top-0 px-5 py-3">
            {cardLabel}
          </span>
        </Link>

        <div>
          <Link
            onClick={onClick}
            to={`/products/${product.handle}`}
            className="text-gray-500 hover:gray-800 lg:text-lg transition duration-100 mb-1"
          >
            {product.title}
          </Link>

          <div className="flex items-end gap-2">
            <span className="text-gray-800 lg:text-lg font-bold">
              <Money withoutTrailingZeros data={price} />
            </span>
            <span className="text-red-500 line-through mb-0.5">
              {isDiscounted(price, compareAtPrice) && (
                <CompareAtPrice
                  className={'opacity-50'}
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
        {/* <!-- product - end --> */}
      </div>
    </>
  );
  // product card end
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}

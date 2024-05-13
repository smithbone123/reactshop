import {useState, useRef, useEffect, useCallback} from 'react';
import {Link, flattenConnection} from '@shopify/hydrogen';

import {Button, ProductCard, Section} from '~/components';
import {getImageLoadingPriority} from '~/lib/const';

export function ProductGrid({url, collection}) {
  const nextButtonRef = useRef(null);
  const initialProducts = collection?.products?.nodes || [];
  const {hasNextPage, endCursor} = collection?.products?.pageInfo ?? {};
  const [products, setProducts] = useState(initialProducts);
  const [cursor, setCursor] = useState(endCursor ?? '');
  const [nextPage, setNextPage] = useState(hasNextPage);
  const [pending, setPending] = useState(false);
  const haveProducts = initialProducts.length > 0;

  const fetchProducts = useCallback(async () => {
    setPending(true);
    const postUrl = new URL(window.location.origin + url);
    postUrl.searchParams.set('cursor', cursor);

    const response = await fetch(postUrl, {
      method: 'POST',
    });
    const {data} = await response.json();

    // ProductGrid can paginate collection, products and search routes
    // @ts-ignore TODO: Fix types
    const newProducts = flattenConnection(
      data?.collection?.products || data?.products || [],
    );
    const {endCursor, hasNextPage} = data?.collection?.products?.pageInfo ||
      data?.products?.pageInfo || {endCursor: '', hasNextPage: false};

    setProducts([...products, ...newProducts]);
    setCursor(endCursor);
    setNextPage(hasNextPage);
    setPending(false);
  }, [cursor, url, products]);

  const handleIntersect = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchProducts();
        }
      });
    },
    [fetchProducts],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '100%',
    });

    const nextButton = nextButtonRef.current;

    if (nextButton) observer.observe(nextButton);

    return () => {
      if (nextButton) observer.unobserve(nextButton);
    };
  }, [nextButtonRef, cursor, handleIntersect]);

  if (!haveProducts) {
    // Products Not Found
    return (
      <>
        <Section className="p-6 md:p-8 lg:p-12">
          <p>No products found on this collection</p>
          <Link to="/products">
            <p className="underline">Browse catalog</p>
          </Link>
        </Section>
      </>
    );
  }

  // products, collections & pagination start
  return (
    <>
      <div className="px-4 md:px-8 lg:px-8">
        <div className="grid-flow-row grid gap-4 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-4">
          {/* ProductCard start */}
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={getImageLoadingPriority(i)}
            />
          ))}
          {/* ProductCard end */}
        </div>
      </div>

      {/* pagination */}
      {nextPage && (
        <div
          className="flex items-center justify-center mt-14"
          // ref={nextButtonRef}
        >
          <Button
            variant="secondary"
            disabled={pending}
            onClick={fetchProducts}
            // width="full"
          >
            {pending ? 'Loading...' : 'Load more products'}
          </Button>
        </div>
      )}
    </>
  );
  // products, collections & pagination start
}

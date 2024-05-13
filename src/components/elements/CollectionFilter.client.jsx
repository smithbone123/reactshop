import {useState, useRef} from 'react';
import {Section} from '~/components';
import {FiChevronDown, FiChevronUp} from 'react-icons/fi';

export function CollectionFilter({minPrice, maxPrice}) {
  const [filter_, setFilter_] = useState(false);
  const [availability_, setAvailability_] = useState(false);
  const [price_, setPrice_] = useState(false);
  const [sortby_, setSortby_] = useState(false);

  const [minPriceRange, setminPriceRange] = useState(minPrice);
  const [maxPriceRange, setmaxPriceRange] = useState(maxPrice);
  const OnClickSort = (event) => {
    if (event.target.closest('.sort-title')) {
      event.target
        .closest('.collection-sorting-container')
        .classList.toggle('show');
    }
  };

  const OnClickFilter = (event) => {
    if (event.target.closest('.filter-title')) {
      event.target
        .closest('.collection-filter-container')
        .classList.toggle('show');
    }
  };

  const onSortParam = (event) => {
    const url = new URL(window.location.href);
    url.searchParams.set(
      'sortkey',
      event.target.closest('li').getAttribute('data-sort-key'),
    );
    url.searchParams.set(
      'reverse',
      event.target.closest('li').getAttribute('data-sort-reverse'),
    );
    if (
      event.target
        .closest('.collection-sorting-container')
        .classList.contains('show')
    ) {
      window.location.href = url.toString();
    }
  };

  const onFilterParam = (event) => {
    event.target.closest('.nested-list').classList.toggle('show');
  };

  const onFilterAvailabilityParam = (event) => {
    const url = new URL(window.location.href);
    url.searchParams.delete('price');
    url.searchParams.delete('min');
    url.searchParams.delete('max');
    url.searchParams.set(
      'availability',
      event.target.closest('li').getAttribute('data-filter-value'),
    );
    if (event.target.closest('.nested-list').classList.contains('show')) {
      window.location.href = url.toString();
    }
  };

  const onChangeMin = (event) => {
    event.target.value = setminPriceRange(event.target.value);
  };

  const onChangeMax = (event) => {
    event.target.value = setmaxPriceRange(event.target.value);
  };

  const onFilterPriceParam = (event) => {
    if (event.target.closest('.filter-price')) {
      event.target
        .closest('.collection-price-container')
        .classList.toggle('show');
    }
  };

  const onSubmitFilter = (event) => {
    const url = new URL(window.location.href);
    url.searchParams.delete('availability');
    url.searchParams.set('price', true);
    url.searchParams.set(
      'min',
      event.target
        .closest('.price-range-container')
        .querySelector('#mininputrange').value,
    );
    url.searchParams.set(
      'max',
      event.target
        .closest('.price-range-container')
        .querySelector('#maxinputrange').value,
    );
    if (
      event.target
        .closest('.collection-price-container')
        .classList.contains('show')
    ) {
      window.location.href = url.toString();
    }
  };

  return (
    <Section className="p-4 md:p-8 lg:p-8">
      {/* button */}
      <div className="flex justify-between items-end gap-4 mb-6 z-40">
        <div className="collection-filter-sorting-container flex items-center gap-5">
          {/* filter */}
          <div
            className="relative collection-filter-container"
            onClick={OnClickFilter}
          >
            <button
              onClick={() => setFilter_(!filter_)}
              className="flex items-center justify-between gap-4 border text-gray-500 text-sm md:text-base font-semibold px-4 md:px-8 py-2 md:py-3"
            >
              Filter
              {!filter_ ? <FiChevronDown /> : <FiChevronUp />}
            </button>
            {filter_ && (
              <div className="absolute w-[222px] bg-white top-11 md:top-14 px-8 py-10 border z-30">
                {/* availability / nested-list */}
                <div
                  className="nested-list mb-3"
                  data-filter-key="STOCK"
                  onClick={onFilterParam}
                >
                  <button
                    onClick={() => setAvailability_(!availability_)}
                    className="flex items-center justify-between gap-4 text-gray-900 text-base font-semibold"
                  >
                    Availability
                    {!availability_ ? <FiChevronDown /> : <FiChevronUp />}
                  </button>
                  {availability_ && (
                    <ul className="py-2">
                      <li
                        className="flex w-full"
                        data-filter-value="true"
                        onClick={onFilterAvailabilityParam}
                      >
                        <button className="py-1 px-2">In Stock</button>
                      </li>
                      <li
                        className="flex w-full"
                        data-filter-value="false"
                        onClick={onFilterAvailabilityParam}
                      >
                        <button className="py-1 px-2">Out of Stock</button>
                      </li>
                      <li
                        className="flex w-full"
                        data-filter-value="both"
                        onClick={onFilterAvailabilityParam}
                      >
                        <button className="py-1 px-2">Both</button>
                      </li>
                    </ul>
                  )}
                </div>
                {/* price / collection-price-container */}
                <div
                  className="collection-price-container"
                  onClick={onFilterPriceParam}
                >
                  {/* filter-price */}
                  <button
                    onClick={() => setPrice_(!price_)}
                    className="filter-price flex items-center justify-between gap-4 text-gray-900 text-base font-semibold"
                  >
                    Price
                    {!price_ ? <FiChevronDown /> : <FiChevronUp />}
                  </button>
                  {price_ && (
                    // price-range-container
                    <div className="price-range-container py-3">
                      <div>
                        <label htmlFor="mininputrange">
                          Min (between 0 and 2000)
                        </label>
                        <input
                          className="appearance-none h-2 mt-2 bg-slate-200 border border-slate-800 rounded-full focus:outline-none"
                          type="range"
                          id="mininputrange"
                          name="mininputrange"
                          min="0"
                          value={minPriceRange}
                          // value="200"
                          max="2000"
                          step={1}
                          onChange={onChangeMin}
                        />
                        <p>{minPriceRange}</p>
                      </div>
                      <div className="mt-2">
                        <label htmlFor="maxinputrange">
                          Max (between 0 and 10000)
                        </label>
                        <input
                          className="appearance-none h-2 mt-2 bg-slate-200 border border-slate-800 rounded-full focus:outline-none"
                          type="range"
                          id="maxinputrange"
                          name="maxinputrange"
                          min="0"
                          value={maxPriceRange}
                          // value="2000"
                          max="10000"
                          step={1}
                          onChange={onChangeMax}
                        />
                        <p>{maxPriceRange}</p>
                      </div>
                      <div className="mt-4">
                        <button type="button" onClick={onSubmitFilter}>
                          <span className="inline-block text-white bg-primary font-medium text-center py-3 px-6 w-full">
                            Send
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* sortby collection-sorting-container  */}
        <div
          className="collection-sorting-container relative"
          onClick={OnClickSort}
        >
          {/* sort-title */}
          <button
            onClick={() => setSortby_(!sortby_)}
            className="sort-title flex items-center justify-between gap-4 border text-gray-500 text-sm md:text-base font-semibold px-4 md:px-8 py-2 md:py-3"
          >
            Sort By
            {!sortby_ ? <FiChevronDown /> : <FiChevronUp />}
          </button>
          {sortby_ && (
            <div className="absolute w-[230px] bg-white top-11 md:top-14 right-0 px-8 py-10 border z-30">
              <ul>
                <li
                  className="flex w-full"
                  data-sort-key="MANUAL"
                  data-sort-reverse="false"
                  onClick={onSortParam}
                >
                  <button className="py-1">Featured</button>
                </li>

                <li
                  className="flex w-full"
                  data-sort-key="TITLE"
                  data-sort-reverse="false"
                  onClick={onSortParam}
                >
                  <button className="py-1">Alphabetically : A - Z</button>
                </li>
                <li
                  className="flex w-full"
                  data-sort-key="PRICE"
                  data-sort-reverse="false"
                  onClick={onSortParam}
                >
                  <button className="py-1">Price : Low - High</button>
                </li>
                <li
                  className="flex w-full"
                  data-sort-key="PRICE"
                  data-sort-reverse="true"
                  onClick={onSortParam}
                >
                  <button className="py-1">Price : High - Low</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

import {Link, Image} from '@shopify/hydrogen';

export function FeaturedCollections({data, title = 'Collections', ...props}) {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 0;

  if (!haveCollections) return null;

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        {/* button */}
        <div className="flex justify-between items-end gap-4 mb-6">
          {/* <Section heading={title} {...props}></Section> */}
          <h5 class="text-gray-800 text-base md:text-xl font-bold">
            Collections
          </h5>
          <Link
            to="/collections"
            className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3"
          >
            Show more
          </Link>
        </div>

        {/*  */}
        <div className="grid-flow-row grid gap-4 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data
            ?.slice(0)
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .map((collection) => {
              if (!collection?.image) {
                return null;
              }
              // TODO: Refactor to use CollectionCard
              return (
                <div key={collection.id}>
                  <div>
                    <Link
                      to={`/collections/${collection.handle}`}
                      className="group block bg-gray-100 border overflow-hidden relative mb-2 lg:mb-3"
                    >
                      <Image
                        className="w-full object-cover object-center group-hover:scale-110 transition duration-200"
                        alt={`Image of ${collection.title}`}
                        data={collection.image}
                        data-config-id="image2"
                      />
                      {/* title */}
                      <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2">
                        <div className="py-2">
                          <div className="text-lg font-bold w-[60%] font-heading">
                            {collection.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

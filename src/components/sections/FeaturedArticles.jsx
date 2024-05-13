import {Link, Image} from '@shopify/hydrogen';
import {Section} from '~/components';

export function FeaturedArticles({
  data,
  title = 'New Blogs',
  onClick,
  ...props
}) {
  const items = data.filter((item) => item.image).length;
  const haveArticles = data.length > 0;

  if (!haveArticles) return null;

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        {/* button */}
        <div className="flex justify-between items-end gap-4 mb-6">
          {/* <Section heading={title} {...props}></Section> */}
          <h5 class="text-gray-800 text-base md:text-xl font-bold">
            New Blogs
          </h5>
          <Link
            to="/journal"
            className="inline-block bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3"
          >
            Show more
          </Link>
        </div>

        {/*  */}
        <div className="grid-flow-row grid gap-4 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data
            // Desc sorting
            // ?.slice(0)
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            // Desc sorting
            .map((article) => {
              if (!article?.image) {
                return null;
              }
              // TODO: Refactor to use CollectionCard
              return (
                <div key={article.id}>
                  {/* Image */}
                  <div>
                    <Link
                      to={`/journal/${article.handle}`}
                      className="group block bg-gray-100 border overflow-hidden relative mb-2 lg:mb-3"
                    >
                      <Image
                        className="w-full object-cover object-center group-hover:scale-110 transition duration-200"
                        alt={`Image of ${article.title}`}
                        data={article.image}
                        data-config-id="image2"
                      />
                    </Link>
                  </div>
                  {/* Title */}
                  <Link
                    to={`/journal/${article.handle}`}
                    class="text-gray-500 hover:gray-800 lg:text-base font-medium transition duration-100 mb-1"
                    data-config-id="title2"
                  >
                    <h2>{article.title.substring(0, 54)} ...</h2>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

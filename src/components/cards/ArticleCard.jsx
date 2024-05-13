import {Image, Link} from '@shopify/hydrogen';

export function ArticleCard({blogHandle, article}) {
  return (
    <div key={article.id} className="mt-4">
      <div className="flex mb-0">
        <Link
          to={`/${blogHandle}/${article.handle}`}
          className="group block bg-gray-100 border overflow-hidden relative mb-2 lg:mb-3"
        >
          {article.image && (
            <Image
              className="w-full object-cover object-center group-hover:scale-110 transition duration-200"
              alt={`Image of ${article.title}`}
              data={article.image}
              data-config-id="image2"
            />
          )}
        </Link>
      </div>
      <Link
        to={`/${blogHandle}/${article.handle}`}
        class="text-gray-500 hover:gray-800 lg:text-base font-medium transition duration-100 mb-1"
        data-config-id="title2"
      >
        <h2>{article.title.substring(0, 68)} ...</h2>
        <span className="block mt-1 font-bold">{article.publishedAt}</span>
      </Link>
    </div>
  );
}

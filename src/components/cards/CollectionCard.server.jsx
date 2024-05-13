import {Image, Link} from '@shopify/hydrogen';

import {Heading} from '~/components';

export function CollectionCard({collection, loading}) {
  return (
    <>
      <Link
        to={`/collections/${collection.handle}`}
        key={collection.id}
        className="group block bg-gray-100 border overflow-hidden relative mb-2 lg:mb-3"
      >
        {collection.image && (
          <Image
            alt={collection.image.altText || collection.title}
            className="w-full object-cover object-center group-hover:scale-110 transition duration-200"
            data={collection.image}
            height={400}
            loading={loading}
            sizes="(min-width: 768px) 50vw, 100vw"
            width={600}
            loaderOptions={{
              scale: 2,
              crop: 'center',
            }}
          />
        )}
        {/* title */}
        <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2">
          <div className="py-2">
            <div className="text-lg font-bold w-[60%] font-heading">
              {collection.title}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

// import {Image, Link} from '@shopify/hydrogen';

// import {Heading} from '~/components';

// export function CollectionCard({collection, loading}) {
//   return (
//     <Link to={`/collections/${collection.handle}`} className="grid gap-4">
//       <div className="card-image bg-primary/5 aspect-[3/2]">
//         {collection?.image && (
//           <Image
//             alt={`Image of ${collection.title}`}
//             data={collection.image}
//             height={400}
//             sizes="(max-width: 32em) 100vw, 33vw"
//             width={600}
//             widths={[400, 500, 600, 700, 800, 900]}
//             loaderOptions={{
//               scale: 2,
//               crop: 'center',
//             }}
//           />
//         )}
//       </div>
//       <Heading as="h3" size="copy">
//         {collection.title}
//       </Heading>
//     </Link>
//   );
// }

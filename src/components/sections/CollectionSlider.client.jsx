import {Link, Image} from '@shopify/hydrogen';
import {useState} from 'react';

export const CollectionSlider = ({data, title = 'Collections', ...props}) => {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 0;

  if (!haveCollections) return null;

  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(data.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === data.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="mx-auto w-full p-5">
      <div {...props} className="overflow-hidden relative">
        <div
          items={items}
          className={`flex`}
          // className={`flex transition ease-out duration-400`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {data.map((collection) => {
            if (!collection?.image) {
              return null;
            }
            return (
              <>
                {collection?.image && (
                  <Image
                    key={collection.id}
                    className="w-full block"
                    alt={`${collection.title}`}
                    data={collection.image}
                  />
                )}
              </>
            );
          })}
        </div>
        {/* navigate button */}
        <div className="absolute top-0 h-full w-full justify-between items-center flex px-5 md:px-7">
          {/* left */}
          <button onClick={previousSlide}>
            <svg
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              className="icon font-bold"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                fill="#000000"
              />
            </svg>
          </button>
          {/* right */}
          <button onClick={nextSlide}>
            <svg
              width="21px"
              height="21px"
              viewBox="0 0 1024 1024"
              className="icon font-bold"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                fill="#000000"
              />
            </svg>
          </button>
        </div>
        {/* title */}
        <div className="absolute top-[35%] left-[15%] w-fit lg:gap-3">
          {data.map((collection, i) => {
            return (
              <Link
                to={`/collections/${collection.handle}`}
                key={'circle' + i}
                className={`flex flex-col font-bold text-3xl sm:text-4xl md:text-6xl ${
                  i == current ? 'block' : 'hidden'
                }`}
              >
                {collection.title}
                <span className="font-medium text-base sm:text-xl lg:text-xl">
                  Shop Now
                </span>
              </Link>
            );
          })}
        </div>
        {/* dots */}
        <div className="absolute bottom-0 py-10 flex justify-center gap-3 w-full">
          {data.map((collection, i) => {
            return (
              <button
                onClick={() => {
                  setCurrent(i);
                }}
                key={'circle' + i}
                className={`rounded-full w-2 h-2  ${
                  i == current ? 'bg-slate-800' : 'bg-slate-300'
                }`}
              ></button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

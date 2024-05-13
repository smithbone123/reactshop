import {Link, Image} from '@shopify/hydrogen';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Heading, Text} from '~/components';

import './css/custom-section.css';
// import './css/custom.css';
import {Navigation, Pagination} from 'swiper/modules';

export const SwiperCollection = ({data, title = 'Collections', ...props}) => {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 0;

  if (!haveCollections) return null;
  return (
    <div className="mx-auto w-full">
      <div className="">
        {/* Desktop */}
        <div {...props} className="custom-section bg-[#fff]">
          {/* <Heading>Custom Section</Heading> */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{clickable: true}}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {data
              // Desc sorting
              // ?.slice(0)
              .sort((a, b) => (a.id < b.id ? 1 : -1))
              // Desc sorting
              .map((collection) => {
                if (!collection?.image) {
                  return null;
                }
                // TODO: Refactor to use CollectionCard
                return (
                  <SwiperSlide key={collection.id}>
                    <Image
                      className="w-full rounded-none hidden md:block"
                      alt={`${collection.title}`}
                      data={collection.image}
                    />
                    <div className="absolute top-1/2 xl:left-[30%] lg:left-[40%] md:left-[40%] -translate-x-1/2 -translate-y-1/2 hidden md:block">
                      {/* Title */}
                      <div className="">
                        <Heading format as="h2" size="display">
                          <Link
                            className="text-5xl text-black font-bold"
                            to={`/collections/${collection.handle}`}
                          >
                            {collection.title}
                          </Link>
                        </Heading>
                      </div>
                      {/* CTA */}
                      <div className="">
                        <Text size="lead" className="">
                          <Link to={`/collections/${collection.handle}`}>
                            Shop Now →
                          </Link>
                        </Text>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>

        {/* Mobile */}
        <div {...props} className="custom-section">
          {/* <Heading>Custom Section</Heading> */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{clickable: true}}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {data
              // Desc sorting
              // ?.slice(0)
              .sort((a, b) => (a.id < b.id ? 1 : -1))
              // Desc sorting
              .map((collection) => {
                if (!collection?.image) {
                  return null;
                }
                // TODO: Refactor to use CollectionCard
                return (
                  <SwiperSlide key={collection.id}>
                    <div className=" bg-[#5b9be9] py-20 rounded-none block md:hidden">
                      {/* Title */}
                      <div className="flex items-center justify-center">
                        <Heading format as="h2" size="display">
                          <Link
                            className="text-4xl text-white font-bold"
                            to={`/collections/${collection.handle}`}
                          >
                            {collection.title}
                          </Link>
                        </Heading>
                      </div>
                      {/* CTA */}
                      <div className="flex items-center justify-center">
                        <Text
                          size="lead"
                          className="text-1xl w-[60%] text-center font-semibold"
                        >
                          <Link to={`/collections/${collection.handle}`}>
                            Shop Now →
                          </Link>
                        </Text>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

// Hero
import {Image, Link, Video} from '@shopify/hydrogen';

import {Heading, Text} from '~/components';

export function Hero({
  byline,
  cta,
  handle,
  heading,
  loading,
  spread,
  spreadSecondary,
}) {
  return (
    <div className="max-w-full w-[96%] mx-auto relative mt-8">
      <Link to={`/collections/${handle}`}>
        {/* Desktop */}
        {spread?.reference && (
          <div className="">
            <SpreadMedia
              scale={2}
              sizes={
                spreadSecondary?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                spreadSecondary?.reference ? [500, 450, 700] : [500, 900, 1400]
              }
              width={spreadSecondary?.reference ? 375 : 750}
              data={spread.reference}
              loading={loading}
            />
            {/* Heading And Description */}
            <div className="absolute top-1/2 xl:left-[40%] lg:left-[40%] md:left-[40%] -translate-x-1/2 -translate-y-1/2 hidden md:block">
              {/* Title */}
              <div className="">
                {heading?.value && (
                  // <Heading
                  //   format
                  //   as="h2"
                  //   size="display"
                  //   className="text-4xl text-black font-bold"
                  // >
                  //   {heading.value}
                  // </Heading>
                  <h2 className="text-4xl text-white font-bold">
                    {heading.value}
                  </h2>
                )}
              </div>
              {/* Description */}
              <div className="py-2 md:hidden lg:block">
                {byline?.value && (
                  <Text
                    format
                    width="narrow"
                    as="p"
                    size="lead"
                    className="text-1xl w-[60%]"
                  >
                    {byline.value}
                  </Text>
                )}
              </div>
              {/* CTA */}
              <div className="">
                {cta?.value && (
                  <Text size="lead" className="font-semibold">
                    {cta.value}
                  </Text>
                )}
              </div>
            </div>
            {/* Heading And Description */}
          </div>
        )}
        {/* Desktop */}
        {/* Mobile */}
        <div className="w-full bg-[#5b9be9]">
          <div className="py-20 rounded-none block md:hidden">
            {/* Title */}
            <div className="flex items-center justify-center">
              <h2 className="text-4xl text-white font-bold">{heading.value}</h2>
            </div>
            {/* Description*/}
            <div className="flex items-center justify-center py-2">
              {byline?.value && (
                <Text
                  format
                  width="narrow"
                  as="p"
                  size="lead"
                  className="text-1xl w-[60%] font-normal text-center"
                >
                  {byline.value}
                </Text>
              )}
            </div>
            {/* CTA*/}
            <div className="flex items-center justify-center">
              {cta?.value && (
                <Text className="text-1xl w-[60%] font-semibold text-center">
                  {cta.value}
                </Text>
              )}
            </div>
          </div>
        </div>
        {/* Mobile */}
      </Link>
    </div>
  );
}

function SpreadMedia({data, loading, scale, sizes, width, widths}) {
  if (data.mediaContentType === 'VIDEO') {
    return (
      <Video
        previewImageOptions={{scale, src: data.previewImage.url}}
        width={scale * width}
        className="block object-cover w-full h-full"
        data={data}
        controls={false}
        muted
        loop
        playsInline
        autoPlay
      />
    );
  }

  if (data.mediaContentType === 'IMAGE') {
    return (
      <Image
        widths={widths}
        sizes={sizes}
        alt={data.alt || 'Marketing Banner Image'}
        className="w-full rounded-none hidden md:block"
        // @ts-ignore
        data={data.image}
        loading={loading}
        width={width}
        loaderOptions={{scale, crop: 'center'}}
      />
    );
  }

  return null;
}

import {Heading} from '~/components';

export function PageHeader({children, heading, ...props}) {
  return (
    <div className="bg-white py-6 sm:py-6 lg:py-6">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div {...props} className="flex justify-between items-end gap-4">
          {heading && <Heading className="inline-block">{heading}</Heading>}
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

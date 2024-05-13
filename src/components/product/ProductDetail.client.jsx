import {Text} from '~/components';
import {Link} from '@shopify/hydrogen';

export function ProductDetail({title, content, learnMore}) {
  return (
    <div key={title} className="grid w-full gap-2">
      <>
        {/* title */}
        <div className="flex justify-between">
          <Text size="lead" as="h4" className="font-bold">
            {title}
          </Text>
        </div>
        <div className="" dangerouslySetInnerHTML={{__html: content}} />
        {/* link */}
        {learnMore && (
          <div className="">
            <Link
              className="pb-px border-b border-primary/30 text-primary/50"
              to={learnMore}
            >
              Learn more
            </Link>
          </div>
        )}
      </>
    </div>
  );
}

import {formatText} from '~/lib/utils';

export function Heading({children, format, ...props}) {
  return (
    <h5 {...props} className="text-gray-800 text-base md:text-xl font-bold">
      {format ? formatText(children) : children}
    </h5>
  );
}

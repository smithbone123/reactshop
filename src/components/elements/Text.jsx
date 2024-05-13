import {formatText} from '~/lib/utils';

export function Text({as: Component = 'span', format, children, ...props}) {
  return (
    <Component {...props}>{format ? formatText(children) : children}</Component>
  );
}

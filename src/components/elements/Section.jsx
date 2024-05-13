import {Heading} from '~/components';

export function Section({
  as: Component = 'section',
  children,
  heading,
  ...props
}) {
  return (
    <Component {...props}>
      {heading && <Heading size="lead">{heading}</Heading>}
      {children}
    </Component>
  );
}

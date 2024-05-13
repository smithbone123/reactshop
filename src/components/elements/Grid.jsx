import clsx from 'clsx';

export function Grid({as: Component = 'div', className, items = 3, ...props}) {
  const styles = clsx(className);

  return <Component {...props} className={styles} />;
}

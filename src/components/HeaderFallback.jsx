export function HeaderFallback({isHome}) {
  const styles = isHome ? '' : '';
  return (
    <header role="banner" className={`${styles} `}>
      <div className="">
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
        <Box isHome={isHome} />
      </div>
      <Box isHome={isHome} wide={true} />
    </header>
  );
}

function Box({wide, isHome}) {
  return <div className={` ${wide ? '' : ''} ${isHome ? '' : ''}`} />;
}

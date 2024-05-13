import {Link, useUrl, useCart} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';
// Icons
import {FiSearch} from 'react-icons/fi';
import {VscAccount} from 'react-icons/vsc';
import {BsBag} from 'react-icons/bs';
// import {Image} from '@shopify/hydrogen';
// import logo from '././assets/logo.png';

import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

/**
 * A client component that specifies the content of the header on the website
 */
export function Header({title, menu}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

// mobile nav
function MobileHeader({countryCode, isHome, openCart, openMenu, title}) {
  const {y} = useWindowScroll();

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
  };

  return (
    <header
      role="banner"
      className="flex lg:hidden items-center h-20 sticky bg-white border-b-2 border-gray-100 z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8"
    >
      <div className="flex items-center justify-start w-full gap-2">
        {/* Menu */}
        <button onClick={openMenu} className={styles.button}>
          <IconMenu />
        </button>
        {/* Search */}
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="items-center gap-2 sm:flex"
        >
          <button type="submit" className={styles.button}>
            <FiSearch />
          </button>
          <Input
            className={isHome ? '' : ''}
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </form>
      </div>

      {/* Logo */}
      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading className="font-bold text-center" as={isHome ? 'h1' : 'h2'}>
          {/* <Image
            src="./images/logo.png"
            width="60"
            height="26"
            loading="lazy"
            alt="logo"
          /> */}
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-2">
        {/* Account */}
        <Link to={'/account'} className={styles.button}>
          <VscAccount />
        </Link>
        {/* Cart */}
        <button onClick={openCart} className={styles.button}>
          <BsBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

// desktop nav
function DesktopHeader({countryCode, isHome, menu, openCart, title}) {
  // function DesktopHeader({countryCode, isHome, menu, openCart, title}) {
  const {y} = useWindowScroll();
  // icons button
  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
  };

  return (
    <header
      role="banner"
      className="hidden h-nav lg:flex items-center sticky transition duration-300 bg-white border-b-2 border-gray-100 z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8"
    >
      <div className="flex gap-12">
        {/* Logo */}
        <Link className="font-bold mt-5 text-xl" to="/">
          {title}
        </Link>

        {/* Menu */}
        <nav className="flex gap-8">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => (
            <div
              className="top-menu px-3 text-left md:cursor-pointer group"
              key={item.id}
            >
              <Link
                key={item.id}
                to={item.to}
                target={item.target}
                className="font-semibold py-7 flex justify-between items-center md:pr-0 pr-5 group"
              >
                {item.title}
              </Link>
              {/* content */}
              {item?.items.length > 0 && (
                <ul
                  className="drop-down absolute top-20 bg-white px-10 py-5 border hidden group-hover:md:block hover:md:block"
                  key={item.id}
                >
                  {(item?.items || []).map((submenu) => (
                    <li
                      className="text-base text-slate-600 py-3"
                      key={submenu.id}
                    >
                      <Link
                        to={submenu.to}
                        target={submenu.target}
                        className="hover:text-slate-600 font-semibold"
                      >
                        {submenu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* Contact Link */}
          <Link
            to="/contact/form"
            className="font-semibold py-7 flex justify-between items-center md:pr-0 pr-5 group"
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="pr-2"
        >
          <div className=" w-fullte xt-white relative">
            <input
              className="bg-white-800 py-3 px-6 w-full rounded-none border border-slate-200"
              type="search"
              variant="minisearch"
              placeholder="Search"
              name="q"
            />
            {/* search icon */}
            <span className="absolute top-4 right-6 text-base font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </div>
        </form>
        {/* Account */}
        <Link to={'/account'} className={styles.button}>
          <VscAccount />
        </Link>
        {/* Cart */}
        <button
          onClick={openCart}
          className={styles.button}
          data-action-drawer="open"
        >
          <BsBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function CartBadge({dark}) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark
          ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
          : 'text-contrast bg-primary'
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}

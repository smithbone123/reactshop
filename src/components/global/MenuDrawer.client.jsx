import {Text} from '~/components';
import {Drawer} from './Drawer.client';
import {Link} from '@shopify/hydrogen';
import {startTransition} from 'react';

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="flex flex-col gap-4 p-11 sm:gap-6 px-12 py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <Link
          className="font-semibold"
          key={item.id}
          to={item.to}
          target={item.target}
          onClick={() => startTransition(onClose)}
        >
          <Text as="span" size="copy">
            {item.title}
          </Text>
        </Link>
      ))}
      {/* Contact Link */}
      <Link
        className="font-semibold"
        to="contact/form"
        onClick={() => startTransition(onClose)}
      >
        <Text as="span" size="copy">
          Contact
        </Text>
      </Link>
    </nav>
  );
}

// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Disclosure} from '@headlessui/react';
import {Link} from '@shopify/hydrogen';

/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({menu}) {
  return (
    <>
      {(menu?.items || []).map((item) => (
        <div key={item.id}>
          <Disclosure>
            <>
              <div className="text-gray-800 text-xl font-bold tracking-widest mb-4">
                {item.title}
              </div>

              {item?.items?.length > 0 && (
                <Disclosure>
                  <nav className="flex flex-col gap-4">
                    {item.items.map((subItem) => (
                      <div key={item.id}>
                        <Link
                          key={subItem.id}
                          to={subItem.to}
                          target={subItem.target}
                        >
                          {subItem.title}
                        </Link>
                      </div>
                    ))}
                  </nav>
                </Disclosure>
              )}
            </>
          </Disclosure>
        </div>
      ))}{' '}
    </>
  );
}

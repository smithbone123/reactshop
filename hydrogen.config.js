import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    defaultCountryCode: 'US',
    defaultLanguageCode: 'EN',

    // hydrogen-shops.myshopify.com
    storeDomain: 'hydrogen-shops.myshopify.com',
    storefrontToken: 'aa99f74700ff6319c18e60e4f4956844',

    // hydrogen-app-shop - ( with Checkout demo )
    // storeDomain: 'hydrogen-app-shop.myshopify.com',
    // storefrontToken: 'f68f12bc3fe5646d4e46fc6cdf1d61d1',

    // shopiprut.myshopify.com
    // storeDomain: 'shopiprut.myshopify.com',
    // storefrontToken: '020d76b2a740524c5150c10143f6a7ab',

    // hydrogen
    // storeDomain: 'hydrogen-preview.myshopify.com',
    // storefrontToken: '3b580e70970c4528da70c98e097c2fa0',

    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});

import {Suspense} from 'react';
import {Seo} from '@shopify/hydrogen';

import {ContactForm} from '~/components';
import {Layout} from '~/components/index.server';

export default function Form() {
  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Contact'}} />
      </Suspense>
      <ContactForm />
    </Layout>
  );
}

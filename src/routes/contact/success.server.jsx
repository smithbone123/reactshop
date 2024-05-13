import {Suspense} from 'react';
import {Seo} from '@shopify/hydrogen';

import {SuccessForm} from '~/components';
import {Layout} from '~/components/index.server';

export default function Success() {
  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Contact'}} />
      </Suspense>
      <SuccessForm />
    </Layout>
  );
}

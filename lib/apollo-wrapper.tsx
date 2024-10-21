'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
  ApolloNextAppProvider,
} from '@apollo/experimental-nextjs-app-support';
import React from 'react';

function makeClient() {
  const httpLink = new HttpLink({
    uri: 'https://stationary-backend-five.vercel.app/graphql',
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Apollo";

type Props = {
  children: React.ReactNode;
};

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return(
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
};

export default Providers;

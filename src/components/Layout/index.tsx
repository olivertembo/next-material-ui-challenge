import React from 'react'
import Navigation from '../Navigation'

type LayoutProps = {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

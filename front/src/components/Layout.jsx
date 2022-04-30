import React from 'react';
import PageAppBar from './Appbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <PageAppBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

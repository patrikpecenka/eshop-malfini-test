import { AppShell, Flex } from '@mantine/core';
import { Navbar } from 'layouts/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { SidePanel } from './SidePanel';
import { useState, useEffect } from 'react';

export const AppShellLayout = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname === "/profile") {
      setVisible(true);
    } else {
      setVisible(false);
    }
    return;
  });
  return (
    <AppShell
      header={{ height: 80 }}
      aside={{
        width: !visible ? 0 : 400,
        breakpoint: "none",
      }}
    >
      <AppShell.Header >
        <Flex
          justify="space-between"
          align="center"
          h="100%"
          mx={40}
        >
          <Navbar />
        </Flex>
      </AppShell.Header>

      <AppShell.Aside
        display={visible ? "block" : "none"}
        hidden={visible ? true : false}
      >
        <SidePanel />
      </AppShell.Aside>

      <AppShell.Main
        mx={10}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
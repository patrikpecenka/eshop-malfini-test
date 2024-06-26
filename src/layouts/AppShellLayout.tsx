import { AppShell, Flex } from '@mantine/core';
import { Navbar } from '@layouts/Navbar';
import { Outlet } from 'react-router-dom';

export const AppShellLayout = () => {
  return (
    <>
      <AppShell
        header={{ height: 80 }}
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

        <AppShell.Main
          mx={10}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};
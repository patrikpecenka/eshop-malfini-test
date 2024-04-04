import { Flex, Image, Loader, Stack } from "@mantine/core";
export const LoadingScreen = () => {
  return (
    <>
      <Flex w="100dvw" h="100dvh" justify="center" align="center" >
        <Stack
          w={350}
          h={350}
          align="center"
          gap={20}
        >
          <Image
            src="/easy-shop.svg"
            fit="contain"
            width="100%"
            height="100%"
          />
          <Loader color="violet" type="dots" size="xl" />
        </Stack>
      </Flex>
    </>
  );
};
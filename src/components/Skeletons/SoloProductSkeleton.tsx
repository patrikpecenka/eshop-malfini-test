import { Card, Skeleton, Group, Box, Flex } from "@mantine/core";


export const SoloProductSkeleton = () => {
  return (
    <>
      <Box>
        <Card
          p={70}
        >
          <Flex justify="center" >
            <Flex direction="column">
              <Box h={550} w={650}>
                <Skeleton h="100%" radius="lg" />
              </Box>
              <Group mt={20} justify="space-between">
                {[...Array(4)].map((_,) => (
                  <Skeleton w={150} h={120} radius="lg" />
                ))}

              </Group>
            </Flex>
            <Flex ml={130} w={450} direction="column" justify="center" gap={40}>
              <Skeleton w={200} h={20} radius="lg" />
              <Skeleton width="100%" h={30} radius="lg" />
              <Skeleton mt={-20} w={100} h={20} radius="lg" />
              <Skeleton mt={-30} h={15} c="dimmed" w={180} radius="lg" />
              <Skeleton w="100%" h={110} radius="lg" />

              <Flex direction="column" gap={20} w="100%">
                <Skeleton w={160} h={40} radius="lg" />

                <Group justify="space-between" w="100%">
                  <Skeleton w={180} h={50} radius="lg" mt={10} />
                  <Skeleton w={250} h={50} radius="lg" mt={10} />
                </Group>
                <Skeleton />
              </Flex>
            </Flex>
          </Flex >
        </Card >
      </Box >
    </>
  );
};
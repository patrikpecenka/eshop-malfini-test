import { Card, Group, Skeleton } from "@mantine/core";

export const ProductCardSkeleton = () => {
  return (
    <>
      <Card
        withBorder
        radius="md"
        shadow="sm"
        padding="md"
      >
        <Skeleton width="100%" height={160} radius="lg" />
        <Group justify="space-between">
          <Skeleton width="50%" height={20} mt={10} radius="lg" />
          <Skeleton width={25} height={25} mt={10} radius="lg" />
        </Group>

        <Skeleton width="100%" height={25} mt={15} radius="lg" />
        <Skeleton width="100%" height={55} mt={15} radius="lg" />

        <Group justify="space-between">
          <Skeleton width="40%" height={25} mt={25} radius="lg" />
          <Skeleton width="40%" height={20} mt={25} radius="lg" />
        </Group>

        <Skeleton width="100%" height={45} mt={25} radius="xl" />

      </Card>
    </>
  );
};
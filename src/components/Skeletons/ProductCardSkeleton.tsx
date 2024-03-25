import { Card, Group, Rating, Skeleton } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";

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

        <Group justify="space-between" mt={10}>
          <Rating value={0} fractions={1} size="xs" readOnly />
          <IconHeartFilled size={25} className="text-gray-200" />
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
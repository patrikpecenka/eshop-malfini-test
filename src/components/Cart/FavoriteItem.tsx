import { useSortable } from "@dnd-kit/sortable";
import { Card, Flex, Title, Image, Group } from "@mantine/core";
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical } from "@tabler/icons-react";


export const FavoriteItem = ({ favoriteItem }: any) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: favoriteItem.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      withBorder
      p={10}
      m={10}
      shadow="lg"
      radius="lg"
    >
      <Flex align="center">
        <Group>
          <IconGripVertical size={20} color="#A9A9A9" />
          <Image
            src={favoriteItem.image}
            fit="contain"
            h={70}
            w={60}
            p={5}
          />
        </Group>
        <Title order={5} ml={10}>{favoriteItem.title}</Title>
      </Flex>
    </Card>
  );
};
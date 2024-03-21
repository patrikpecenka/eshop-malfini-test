import { useSortable } from "@dnd-kit/sortable";
import { Card, Flex, Title, Image } from "@mantine/core";
import { CSS } from '@dnd-kit/utilities';


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
    <Card ref={setNodeRef} {...attributes} {...listeners} style={style} m={5}>
      <Flex align="center">
        <Image
          src={favoriteItem.image}
          fit="contain"
          h={70}
          w={60}
          p={5}
        />
        <Title order={3}>{favoriteItem.title}</Title>
      </Flex>
    </Card>
  );
};
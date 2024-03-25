import { useSortable } from "@dnd-kit/sortable";
import { Card, Flex, Title, Image, Group, Tooltip, ActionIcon } from "@mantine/core";
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical, IconHeartOff } from "@tabler/icons-react";
import { useFavoriteStore } from "store/favorite.store";
import { UseDraggableArguments } from "@dnd-kit/core";
import { openConfirmDeleteModal } from "utils/openConfirmDeleteModal";

export interface FavoriteItem {
  image: string;
  category: string;
  title: string;
  price: number;
  totalPrice: number;
  amount: number;
  id: string;
}

interface FavoriteItemProps extends UseDraggableArguments {
  favoriteItem: FavoriteItem;
}

export const FavoriteItem = ({ favoriteItem }: FavoriteItemProps) => {
  const removeFavoriteItem = useFavoriteStore((state) => state.removeFavoriteItem);
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

  const handleDelete = () => {

    openConfirmDeleteModal({
      onConfirm: () => removeFavoriteItem(favoriteItem.id),
      title: "Are you sure you want to remove favorite item?"
    });
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      style={style}
      withBorder
      className="hover:cursor-auto"
      p={10}
      m={10}
      shadow="lg"
      radius="lg"
    >
      <Flex align="center" justify="space-between" mx="sm">
        <Group>
          <ActionIcon
            variant="transparent"
            {...listeners}
          >
            <IconGripVertical
              size={20}
              color="#A9A9A9"
            />
          </ActionIcon>
          <Image
            src={favoriteItem.image}
            fit="contain"
            h={70}
            w={60}
            p={5}
          />
          <Title order={5} ml={10}>{favoriteItem.title}</Title>
        </Group>
        <Tooltip label="Remove from favorite">
          <ActionIcon
            variant="transparent"
            onClick={handleDelete}
          >
            <IconHeartOff
              className="hover:scale-110 duration-200"
              color="gray"
              size={25}
            />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Card >
  );
};
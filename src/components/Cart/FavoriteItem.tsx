import { Card, Flex, Title, Image, Group, Tooltip, ActionIcon, Button, Text } from "@mantine/core";
import { IconHeartOff } from "@tabler/icons-react";
import { useFavoriteStore } from "store/favorite.store";
import { UseDraggableArguments } from "@dnd-kit/core";
import { notifications, showNotification } from "@mantine/notifications";


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
  const deleteAndSaveToHistory = useFavoriteStore((state) => state.deleteAndSaveToHistory);
  const restoreFromHistory = useFavoriteStore((state) => state.restoreFromHistory);
  const permanentlyDelete = useFavoriteStore((state) => state.permanentlyDelete);


  const handleRestore = () => {
    restoreFromHistory(favoriteItem.id);
    notifications.hide("undo-delete-notification" + favoriteItem.id);
    console.log("undo-delete-notification" + favoriteItem.id);
  };

  const handleDelete = () => {
    showNotification({
      id: "undo-delete-notification" + favoriteItem.id,
      title: "Are you sure you want to delete this item?",
      color: "yellow",
      message: (
        <Flex align="center" justify="space-between">
          <Text>Item will be deleted in 10 seconds</Text>
          <Flex direction="row">
            <Button variant="subtle" onClick={() => handleRestore()}>
              Undo
            </Button>
          </Flex>
        </Flex>
      ),
      onOpen: () => deleteAndSaveToHistory(favoriteItem.id),
      onClose: () => permanentlyDelete(favoriteItem.id),
      autoClose: 10000,
    });
  };

  return (
    <Card
      className="hover:cursor-auto"
      p={10}
      m={5}
    >
      <Flex align="center" justify="space-between" mx="sm">
        <Group>
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
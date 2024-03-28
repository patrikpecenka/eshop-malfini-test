import { Card, Flex, Title, Image, Group, Tooltip, ActionIcon, Button, Text, Anchor } from "@mantine/core";
import { IconHeartOff } from "@tabler/icons-react";
import { useFavoriteStore } from "store/favorite.store";
import { UseDraggableArguments } from "@dnd-kit/core";
import { notifications, showNotification } from "@mantine/notifications";
import { IconShoppingCartFilled, IconCircleCheckFilled } from "@tabler/icons-react";
import { useCartStore } from "store/cart.store";
import { Link } from "react-router-dom";


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
  const { cart } = useCartStore();
  const deleteAndSaveToHistory = useFavoriteStore((state) => state.deleteAndSaveToHistory);
  const restoreFromHistory = useFavoriteStore((state) => state.restoreFromHistory);
  const permanentlyDelete = useFavoriteStore((state) => state.permanentlyDelete);
  const addItem = useCartStore((state) => state.createItem);

  const filterCartItem = cart.find((item) => item.id === favoriteItem.id);

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
        <Flex align="center" justify="space-between" direction="column" gap={0}>
          <Flex direction="row" gap={0}>
            <Image
              src={favoriteItem.image}
              w={30}
              h={30}
              m={10}
            />
            <Text size="sm" lineClamp={1}>{favoriteItem.title}</Text>
            <Button variant="subtle" onClick={() => handleRestore()} w={150}>
              Undo
            </Button>
          </Flex>
          <Text size="xs">Item will be deleted in 10 seconds</Text>
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
      my="xs"
    >
      <Flex align="center" justify="space-between" mx="sm">
        <Group wrap="nowrap">
          <Image
            src={favoriteItem.image}
            fit="contain"
            h={70}
            w={60}
            p={5}
          />
          <Anchor
            component={Link}
            to={`/products/${favoriteItem.id}`}
          >
            <Title order={5} >{favoriteItem.title}</Title>
          </Anchor>
        </Group>
        <Group wrap="nowrap">
          <Tooltip label={filterCartItem ? "In cart" : "Add to cart"}>
            <Button
              size="ms"
              variant="subtle"
              onClick={
                filterCartItem
                  ? () => null
                  : () => addItem(favoriteItem)
              }
            >
              {
                filterCartItem
                  ? <IconCircleCheckFilled />
                  : <IconShoppingCartFilled />
              }

            </Button>
          </Tooltip>
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
        </Group>
      </Flex>
    </Card >
  );
};
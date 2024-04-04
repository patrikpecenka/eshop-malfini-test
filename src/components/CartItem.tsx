import { ActionIcon, Anchor, Box, Card, Flex, Group, Image, NumberInput, Title } from "@mantine/core";
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react";
import { useCartStore } from "@store/cart.store";
import { confirmDeleteModal } from "../utils/confirmDeleteModal";
import { currencyFormatter } from "@utils/number/currencyFormatter";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "@store/cart.store";

interface CartItemProps {
  cartProduct: CartItem;
  disableAnchor?: boolean;
  lineClamp?: number;
  textBoxWidth?: number;
  cardHeight?: number;
}

export const CartProductItem = ({ cardHeight, textBoxWidth, disableAnchor, lineClamp, cartProduct, ...rest }: CartItemProps) => {
  const deleteItem = useCartStore((state) => state.deleteItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const handleDelete = () => {
    deleteItem(cartProduct.id);
  };

  const openModal = () => {
    confirmDeleteModal({
      onConfirm: () => deleteItem(cartProduct.id),
      title: "Are you sure you want to delete this item?"
    });
  };

  useEffect(() => {
    if (cartProduct.amount < 1) {
      openModal();
    }
  }, [cartProduct.amount]);

  return (
    <Card
      padding="xs"
      w="100%"
      mih={cardHeight}
      {...rest}
    >
      <Flex h="100%" px={15} align="center">
        <Image
          src={cartProduct.image}
          fit="contain"
          h={cardHeight}
          w={60}
          p={5}
        >
        </Image>
        <Flex justify="space-between" w="100%">
          <Box maw={textBoxWidth}>
            {
              disableAnchor === false
                ? <Anchor component={Link} to={`/products/${cartProduct.id}`} >
                  <Title order={5} lineClamp={lineClamp}>{cartProduct.title}</Title>
                </Anchor>
                : <Title order={5} lineClamp={lineClamp}> {cartProduct.title}</Title>
            }
          </Box>
          <Group gap={30} wrap="nowrap">
            <Flex direction="row" align="center" justify="space-evenly" >
              <ActionIcon
                variant="light"
                onClick={() => cartProduct.amount < 2 ? openModal() : updateItemQuantity(cartProduct.id, (prev) => prev - 1)}
              >
                <IconMinus size="20" />
              </ActionIcon>
              <NumberInput
                size="xs"
                w={45}
                value={cartProduct.amount}
                onChange={(value) => value === "" ? null : updateItemQuantity(cartProduct.id, () => Number(value))}
                hideControls
                min={1}
                allowNegative={false}
              />
              <ActionIcon
                variant="light"
                onClick={() => updateItemQuantity(cartProduct.id, (prev) => prev + 1)}
              >
                <IconPlus
                  size="20"
                />
              </ActionIcon>
            </Flex>

            <Flex miw={120} align="center" justify="end">
              <Title order={5} className="self-center" >
                {currencyFormatter.format(cartProduct.totalPrice)}
              </Title>
              <ActionIcon variant="light" color="red" onClick={handleDelete}>
                <IconTrash
                  size="20"
                />
              </ActionIcon>
            </Flex>
          </Group>

        </Flex>
      </Flex>
    </Card >
  );
};
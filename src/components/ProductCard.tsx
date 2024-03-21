import { ActionIcon, Badge, Button, Card, CardProps, Flex, Group, Image, NumberInput, Rating, Text, Title, Tooltip, useComputedColorScheme } from "@mantine/core";
import { ProductDto } from "../lib/dto/types";
import { useCartStore } from "../store/cart.store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { currencyFormatter } from "utils/number/currencyFormatter";

interface ProductCardProps extends CardProps {
  product: ProductDto;
}

export const ProductCard = ({ product, ...rest }: ProductCardProps) => {
  const addCartItems = useCartStore((state) => state.createItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const { cart } = useCartStore();

  let itemAmount = cart.find((item) => item.id === product.id)?.amount || 0;
  const computedColorScheme = useComputedColorScheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [itemAddedCheck, setItemAddedCheck] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setItemAddedCheck(true);
      addCartItems({
        ...product, totalPrice: product.price, amount: 1
      });
    }, 400);
  };

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      padding="md"
      {...rest}
    >
      <Link
        to={`/products/${product.id}`}
      >
        <Card.Section className="self-center select-none" p="lg">
          <Image
            className="hover:scale-110 duration-200 "
            src={product.image}
            w="100%"
            h={150}
            fit="contain"
          />
        </Card.Section>
        <Group
          h={100}
          gap={1}
        >
          <Title
            order={4}
            lineClamp={1}
            className="hover:text-violet-600"
          >
            {product.title}
          </Title>
          <Text lineClamp={3} size="xs" mt={10}>{product.description}</Text>
        </Group>
      </Link>

      <Group
        justify="space-between"
        mt={10}
        w="100%"
        h={50}
      >
        <Tooltip label={`Rating ${product.rating.rate} out of 5`}>
          <Rating value={product.rating.rate} fractions={3} readOnly size="xs" />
        </Tooltip>
        <Badge variant="light" color="green.5" size="lg">
          <Title order={4}>
            {currencyFormatter.format(product.price)}
          </Title>
        </Badge>
      </Group>
      {
        itemAddedCheck && itemAmount > 0
          ? (
            <Group align="center" justify="center" w="100%" mt={15}>
              <Flex className="rounded-full" bg={computedColorScheme === "light" ? "gray.1" : "gray.8"} direction="row" align="center" justify="space-evenly" gap={15} px={20}>
                <ActionIcon
                  size="md"
                  variant="transparent"
                  color="violet.6"
                  onClick={() => itemAmount < 2 ? deleteItem(product.id) : updateItemQuantity(product.id, (prev) => prev - 1)}
                >
                  <IconMinus size="23" />
                </ActionIcon>
                <NumberInput
                  size="md"
                  fw={700}
                  w={55}
                  onChange={(value) => updateItemQuantity(product.id, () => Number(value))}
                  value={itemAmount}
                  allowNegative={false}
                  hideControls
                  variant="unstiled"
                />
                <ActionIcon
                  size="md"
                  variant="transparent"
                  color="violet.6"
                  onClick={() => updateItemQuantity(product.id, (prev) => prev + 1)}
                >
                  <IconPlus
                    size="23"
                  />
                </ActionIcon>
              </Flex>
            </Group>
          ) : (
            <Button
              className="hover:opacity-70 duration-200"
              w="100%"
              mt={15}
              variant="gradient"
              loading={loading}
              size="md"
              radius="xl"
              onClick={handleClick}
            >
              Add To Cart
            </Button >
          )
      }
    </Card>
  );
};
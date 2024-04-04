import { ActionIcon, Badge, Button, Card, CardProps, Flex, Group, Image, NumberInput, Rating, Text, Title, Tooltip, useComputedColorScheme } from "@mantine/core";
import { ProductDto } from "@lib/dto/types";
import { useCartStore } from "@store/cart.store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconMinus, IconPlus, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { currencyFormatter } from "@utils/number/currencyFormatter";
import { useHover } from "@mantine/hooks";
import { useFavoriteStore } from "@store/favorite.store";

interface ProductCardProps extends CardProps {
  product: ProductDto;
}

const ProductCard = ({ product, ...rest }: ProductCardProps) => {
  const { cart } = useCartStore();
  const { favoriteItems } = useFavoriteStore();
  const addCartItems = useCartStore((state) => state.createItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const createFavorite = useFavoriteStore((state) => state.createOrUpdateFavorite);

  const { hovered, ref } = useHover();
  const [itemAddedCheck, setItemAddedCheck] = useState(false);

  let itemAmount = cart.find((item) => item.id === product.id)?.amount || 0;
  const computedColorScheme = useComputedColorScheme();
  const productInFavorites = favoriteItems.find((item) => item.id === product.id);


  const handleClick = () => {
    setItemAddedCheck(true);
    addCartItems({
      ...product, totalPrice: product.price, amount: 1
    });
  };

  return (
    <Card
      padding="md"
      {...rest}
    >
      <Link to={`/products/${product.id}`}>
        <Card.Section className="self-center select-none" p="lg">
          <Image
            className="hover:scale-110 duration-200 "
            src={product.image}
            alt={product.title}
            w="100%"
            h={150}
            fit="contain"
          />
        </Card.Section>
      </Link>
      <Group py={10} justify="space-between">
        <Group gap={5}>
          <Tooltip label={`Rating ${product.rating.rate} out of 5`}>
            <Rating value={product.rating.rate} fractions={3} size="xs" readOnly />
          </Tooltip>
          <Text fw={500} size="sm">{product.rating.rate}</Text>
          <Text size="xs" c="dimmed">{product.rating.count}x</Text>
        </Group>
        <Tooltip label={productInFavorites ? "Remove from favorites" : "Add to favorites"}>

          <ActionIcon
            component="div"
            variant="transparent"
            onClick={() => createFavorite({ ...product, amount: 1, totalPrice: product.price })}
            ref={ref}
          >
            {
              productInFavorites
                ? <IconHeartFilled className="text-red-600" />
                : <IconHeart color="gray" />
                  && hovered
                  ? <IconHeart className="text-red-600 hover:scale-110 duration-200" />
                  : <IconHeart color="gray" />
            }
          </ActionIcon>
        </Tooltip>
      </Group>

      <Link to={`/products/${product.id}`} >
        <Group h={100} gap={1}>
          <Title
            order={4}
            lineClamp={1}
            className="hover:text-[var(--mantine-primary-color-filled)]"
          >
            {product.title}
          </Title>
          <Text
            lineClamp={3}
            size="xs"
            mt={10}
            className="hover:text-[var(--mantine-primary-color-filled)]"
          >
            {product.description}
          </Text>
        </Group>
      </Link>

      <Group
        justify="space-between"
        mt={10}
        w="100%"
        h={50}
      >
        <Badge variant="light" color="green.6" size="lg">
          <Title order={4}>
            {currencyFormatter.format(product.price)}
          </Title>
        </Badge>
        <Text fw={700} c="dimmed" size="sm">In stock &gt; 5pcs</Text>
      </Group>
      {
        itemAddedCheck && itemAmount > 0
          ? (
            <Group align="center" justify="center" w="100%" mt={15}>
              <Flex
                className="rounded-full"
                bg={computedColorScheme === "light" ? "gray.1" : "gray.8"}
                direction="row"
                align="center"
                justify="space-evenly"
                px={20}
              >
                <ActionIcon
                  size="md"
                  variant="transparent"
                  onClick={() => itemAmount < 2 ? deleteItem(product.id) : updateItemQuantity(product.id, (prev) => prev - 1)}
                >
                  <IconMinus size="23" />
                </ActionIcon>
                <NumberInput
                  size="md"
                  fw={700}
                  w={55}
                  value={itemAmount}
                  onChange={(value) => value === "" ? deleteItem(product.id) : updateItemQuantity(product.id, () => Number(value))}
                  allowNegative={false}
                  hideControls
                  variant="unstyled"
                />
                <ActionIcon
                  size="md"
                  variant="transparent"
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
              onClick={handleClick}
            >
              Add To Cart
            </Button >
          )
      }
    </Card>
  );
};

export default ProductCard;
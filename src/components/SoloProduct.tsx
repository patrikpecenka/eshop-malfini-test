import { Card, Flex, Image, Title, Group, Text, ActionIcon, NumberInput, Button, Tooltip, Rating, Box, CardProps, useComputedColorScheme } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { ProductDto } from "lib/dto/types";
import { useState } from "react";
import { useCartStore } from "store/cart.store";

interface SoloProductProps extends CardProps {
  product: ProductDto;
}

const SoloProduct = ({ product, ...rest }: SoloProductProps) => {
  const addCartItems = useCartStore((state) => state.createItem);

  const [productInputAmount, setProductInputAmount] = useState<number>(1);

  const computedColorScheme = useComputedColorScheme();
  const increaseAmount = () => {
    setProductInputAmount(prevState => prevState + 1);
  };

  const decreaseAmount = () => {
    productInputAmount === 1 ? setProductInputAmount(1) : setProductInputAmount(prevState => prevState - 1);
  };

  const handleClick = () => {
    addCartItems({
      ...product, totalPrice: product.price, amount: productInputAmount
    });
    setProductInputAmount(1);
  };

  return (
    <>
      <Box>
        <Card
          p={70}
          {...rest}
        >
          <Flex justify="center" >
            <Flex direction="column" >
              <Card h={550} w={650}>
                <Image
                  h="100%"
                  alt="Random unsplash image"
                  fit="contain"
                  src={product.image}
                />
              </Card>
              <Group mt={20} justify="space-between">

                {[...Array(4)].map((_, index) => (
                  <Box
                    p={5}
                    key={index}
                    className="border border-gray-300 rounded-xl shadow-md hover:opacity-70 duration-200 cursor-pointer hover:scale-110"
                    w={150}
                    h={120}
                  >
                    <Image
                      h="100%"
                      alt="Random unsplash image"
                      fit="contain"
                      src={product.image}
                    />
                  </Box>
                ))}
              </Group>
            </Flex>
            <Flex ml={130} w={450} direction="column" justify="center" gap="xl">
              <Text mb={-30} fw={900} c="violet.5" tt="uppercase">{product.category}</Text>
              <Title size={45} >{product.title}</Title>
              <Tooltip label={`Rating ${product.rating.rate} out of 5`}>
                <Rating value={product.rating.rate} fractions={4} readOnly size="xs" mt={-20} />
              </Tooltip>
              <Text mt={-30} size="xs" c="dimmed">Based on {product.rating.count} reviews</Text>
              <Text c="dimmed">{product.description}</Text>

              <Flex direction="column" w="100%">
                <Title order={1} fw={700}>$ {product.price}</Title>
                <Flex direction="row" align="center" justify="space-between" mt={20}>
                  <Group bg={computedColorScheme === "light" ? "gray.1" : "gray.8"} className="rounded-md">
                    <ActionIcon
                      size="xl"
                      variant="transparent"
                      color="violet.6"
                      onClick={decreaseAmount}
                    >
                      <IconMinus size="23" />
                    </ActionIcon>
                    <NumberInput
                      size="md"
                      w={55}
                      min={1}
                      value={productInputAmount}
                      onChange={(value) => setProductInputAmount(Number(value))}
                      hideControls
                      variant="unstiled"
                    />
                    <ActionIcon
                      size="xl"
                      variant="transparent"
                      color="violet.6"
                      onClick={increaseAmount}
                      disabled={productInputAmount === 100}
                    >
                      <IconPlus
                        size="23"
                      />
                    </ActionIcon>
                  </Group>
                  <Button
                    loaderProps={{ type: "oval", color: "white" }}
                    flex={1}
                    onClick={handleClick}
                  >
                    Add to cart
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex >
        </Card >
        <Flex w="100%" justify="center">
        </Flex>
      </Box >

    </>

  );
};

export default SoloProduct;
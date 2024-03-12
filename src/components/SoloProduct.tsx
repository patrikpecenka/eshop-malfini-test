import { Card, Flex, Image, Title, Group, Text, ActionIcon, NumberInput, Button, Tooltip, Rating, Box, CardProps } from "@mantine/core"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { ProductDto } from "lib/dto/types"
import { useState } from "react";
import { useCart } from "store/shopStore"

interface SoloProductProps extends CardProps {
  product: ProductDto;
}

export const SoloProduct = ({ product, ...rest }: SoloProductProps) => {
  const addCartItems = useCart((state) => state.addItem);

  const [productAmount, setProductAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false)

  const increaseAmount = () => {
    setProductAmount(prevState => prevState + 1)
  }

  const decreaseAmount = () => {
    productAmount === 1 ? setProductAmount(1) : setProductAmount(prevState => prevState - 1)
  }
  const handleClick = () => {
    if (productAmount < 2) {
      addCartItems({
        ...product, totalPrice: product.price, amount: productAmount
      })
      setProductAmount(1)
    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        addCartItems({
          ...product, totalPrice: product.price, amount: productAmount
        })
        setProductAmount(1)
      }, 200);
    }
  }

  return (
    <Box>
      <Card
        p={70}
        {...rest}
      >
        <Flex justify="center" >
          <Flex direction="column">
            <Card shadow="xl" h={550} w={650} radius="xl">
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
          <Flex ml={130} w={450} direction="column" justify="center" gap={40}>
            <Text mb={-30} fw={900} c="violet.5" tt="uppercase">{product.category}</Text>
            <Title size={45} >{product.title}</Title>
            <Tooltip label={`Rating ${product.rating.rate} out of 5`}>
              <Rating value={product.rating.rate} fractions={4} readOnly size="xs" mt={-20} />
            </Tooltip>
            <Text mt={-30} size="xs" c="dimmed">Based on {product.rating.count} reviews</Text>
            <Text c="dimmed">{product.description}</Text>

            <Flex direction="column" gap={20} w="100%">
              <Title order={1} c="black" fw={700}>$ {product.price}</Title>
              <Flex direction="row" align="center" justify="space-between" gap={15} mt={20}>
                <Group bg="gray.1" className="rounded-md">
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
                    value={productAmount}
                    onChange={(value) => setProductAmount(Number(value))}
                    hideControls
                    variant="unstiled"
                  />
                  <ActionIcon
                    size="xl"
                    variant="transparent"
                    color="violet.6"
                    onClick={increaseAmount}
                    disabled={productAmount === 100}
                  >
                    <IconPlus
                      size="23"
                    />
                  </ActionIcon>
                </Group>
                <Button
                  loading={loading}
                  loaderProps={{ type: "oval", color: "white" }}
                  size="md"
                  flex={1}
                  variant="gradient"
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

  )
}
import { Card, Flex, Image, Title, Group, Text, ActionIcon, NumberInput, Button, Tooltip, Rating, Box } from "@mantine/core"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { ProductDto } from "lib/dto/types"

export const SoloProduct = ({ id, title, image, price, description, rating, category }: ProductDto) => {
  return (
    <Card p={70} id={id}>
      <Flex justify="center" >
        <Flex direction="column">
          <Card shadow="xl" h={550} w={650} radius="xl">
            <Image
              h="100%"
              alt="Random unsplash image"
              fit="contain"
              src={image}
            />
          </Card>
          <Group mt={20} justify="space-between">

            {[...Array(4)].map((_, index) => (
              <Box
                p={5}
                key={index}
                className="border-2 border-gray-300 rounded-xl shadow-md"
                w={150}
                h={120}
              >
                <Image

                  h="100%"
                  alt="Random unsplash image"
                  fit="contain"
                  src={image}
                />
              </Box>
            ))}

          </Group>
        </Flex>
        <Flex ml={130} w={450} direction="column" justify="center" gap={40}>
          <Text mb={-30} fw={900} c="violet.5" tt="uppercase">{category}</Text>
          <Title size={45} >{title}</Title>
          <Tooltip label={`Rating ${rating.rate} out of 5`}>
            <Rating value={rating.rate} fractions={4} readOnly size="xs" mt={-20} />
          </Tooltip>
          <Text mt={-30} size="xs" c="dimmed">Based on {rating.count} reviews</Text>
          <Text c="dimmed">{description}</Text>

          <Flex direction="column" gap={20} w="100%">
            <Title order={1} c="black" fw={700}>$ {price}</Title>
            <Flex direction="row" align="center" justify="space-between" gap={15} mt={20}>
              <Group bg="gray.1" className="rounded-md">
                <ActionIcon
                  size="xl"
                  variant="transparent"
                  color="violet.6"
                >
                  <IconMinus size="23" />
                </ActionIcon>
                <NumberInput size="md" w={40} value={0} hideControls variant="unstiled" />
                <ActionIcon
                  size="xl"
                  variant="transparent"
                  color="violet.6"
                >
                  <IconPlus
                    size="23"
                  />
                </ActionIcon>
              </Group>
              <Button
                size="md"
                flex={1}
                variant="gradient"
                gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
              >
                Add to cart
              </Button>
            </Flex>
          </Flex>

        </Flex>
      </Flex >
    </Card >

  )
}
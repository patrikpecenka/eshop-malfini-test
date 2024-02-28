import { Card, Flex, Image, Title, Group, Box, Text, ActionIcon, NumberInput, Button, Tooltip, Rating } from "@mantine/core"
import { IconMinus, IconPlus } from "@tabler/icons-react"


export const Home = () => {
  return (
    /* 
    ! Home component is for testing purposes, in future it will be replaced by functional home page
    
    TODO: Create new component "ProductPage" 
    */
    <>
      <Card p={70}>
        <Flex justify="center" >
          <Flex direction="column">
            <Card shadow="xl" h={550} w={650} radius="xl">
              <Image
                h="100%"
                alt="Random unsplash image"
                fit="contain"
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
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
                    src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                  />
                </Box>
              ))}

            </Group>
          </Flex>
          <Flex ml={130} w={450} direction="column" justify="center" gap={40}>
            <Text mb={-30} fw={900} c="violet.5" tt="uppercase">T-shirt category</Text>
            <Title size={50} >T-shirt T-shirt T-shirt</Title>
            <Tooltip label={`Rating 2 out of 5`}>
              <Rating value={2} fractions={3} readOnly size="xs" mt={-30} />
            </Tooltip>
            <Text c="dimmed">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Integer in sapien. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Nullam dapibus fermentum ipsum.</Text>

            <Flex direction="column" gap={20} w="100%">
              <Title order={1} c="black" fw={700}>$ 19.99</Title>
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
    </>
  )
}
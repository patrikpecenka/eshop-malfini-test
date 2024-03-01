import { ActionIcon, Anchor, Box, Card, Flex, Group, Image, NumberInput, Title } from "@mantine/core"
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react"
import { CartProps } from "../../lib/props/types"
import { useCart } from "../../store/shopStore"
import { ConfirmDeleteModal } from "../ConfirmDeleteModal"

export const CheckoutItem = ({ id, title, image, totalPrice, amount }: CartProps) => {
  const deleteItem = useCart((state) => state.deleteItem)
  const increaseAmount = useCart((state) => state.increaseAmount)
  const decreaseAmount = useCart((state) => state.decreaseAmount)

  const handleDelete = () => {
    deleteItem(id)
  }

  const deleteConfirmModal = () => {
    ConfirmDeleteModal({ confirm: () => deleteItem(id) })
  }

  const handleIncrease = () => {
    increaseAmount(id)
  }

  const handleDecrease = () => {
    decreaseAmount(id)
  }

  return (
    <Card
      id={id}
      shadow="sm"
      withBorder
      radius="lg"
      w="100%"
      mih={100}
    >
      <Flex h="100%" px={15} align="center" gap={10}>
        <Image
          src={image}
          fit="contain"
          h={100}
          p={5}
        >
        </Image>
        <Flex justify="space-between" w="100%">
          <Box maw={500}>
            <Anchor
              c="black"
              href={`/products/${id}`}
            >
              <Title order={5}>
                {title}
              </Title>
            </Anchor>
          </Box>
          <Group gap={30}>
            <Flex direction="row" align="center" justify="space-evenly" gap={5}>
              <ActionIcon
                variant="light"
                color="gray"
                onClick={amount < 2 ? deleteConfirmModal : handleDecrease}
              >
                <IconMinus size="20" />
              </ActionIcon>
              <NumberInput size="xs" w={40} value={amount} hideControls />
              <ActionIcon
                variant="light"
                color="gray"
                onClick={handleIncrease}
              >
                <IconPlus
                  size="20"
                />
              </ActionIcon>
            </Flex>

            <Flex gap={10} w={100} align="center" justify="end">
              <Title order={5} className="self-center" >
                ${totalPrice}
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
  )
}
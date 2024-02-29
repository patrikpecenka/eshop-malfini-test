import { ActionIcon, Box, Card, Flex, Image, NumberInput, Title } from "@mantine/core"
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react"
import { CartProps } from "../lib/props/types"
import { useCart } from "../store/shopStore"
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"

export const CartItem = ({ id, title, image, totalPrice, amount }: CartProps) => {
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
      shadow="xs"
      padding="xs"
      withBorder
      radius="lg"
      w="100%"
      h={100}
    >
      <Flex h="100%" px={15} align="center" gap={10} >
        <Image
          src={image}
          fit="contain"
          h="100%"
          w={60}
          p={5}
        >
        </Image>
        <Flex justify="space-between" w="100%">
          <Box maw={130} >
            <Title order={5} lineClamp={1}>
              {title}
            </Title>
          </Box>

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

        </Flex>
      </Flex>
    </Card >
  )
}
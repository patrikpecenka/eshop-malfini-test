import { ActionIcon, Anchor, Box, Card, CardProps, Flex, Group, Image, NumberInput, Title } from "@mantine/core"
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react"
import { useCart } from "../../store/shopStore"
import { openConfirmDeleteModal } from "../../utils/openConfirmDeleteModal"
import { CartProps } from "./CartItem"

interface CheckoutItemProps extends CardProps {
  checkoutProduct: CartProps
}

export const CheckoutItem = ({ checkoutProduct, ...rest }: CheckoutItemProps) => {
  const deleteItem = useCart((state) => state.deleteItem)
  const increaseAmount = useCart((state) => state.increaseAmount)
  const decreaseAmount = useCart((state) => state.decreaseAmount)

  const handleDelete = () => {
    deleteItem(checkoutProduct.id)
  }

  const deleteConfirmModal = () => {
    openConfirmDeleteModal({ confirm: () => deleteItem(checkoutProduct.id) })
  }

  const handleIncrease = () => {
    increaseAmount(checkoutProduct.id)
  }

  const handleDecrease = () => {
    decreaseAmount(checkoutProduct.id)
  }

  return (
    <Card
      {...rest}
      shadow="sm"
      withBorder
      radius="lg"
      w="100%"
      mih={100}
    >
      <Flex h="100%" px={15} align="center" gap={10}>
        <Image
          src={checkoutProduct.image}
          fit="contain"
          h={100}
          p={5}
        >
        </Image>
        <Flex justify="space-between" w="100%">
          <Box maw={500}>
            <Anchor
              c="black"
              href={`/products/${checkoutProduct.id}`}
            >
              <Title order={5}>
                {checkoutProduct.title}
              </Title>
            </Anchor>
          </Box>
          <Group gap={30}>
            <Flex direction="row" align="center" justify="space-evenly" gap={5}>
              <ActionIcon
                variant="light"
                color="gray"
                onClick={checkoutProduct.amount < 2 ? deleteConfirmModal : handleDecrease}
              >
                <IconMinus size="20" />
              </ActionIcon>
              <NumberInput size="xs" w={40} value={checkoutProduct.amount} hideControls />
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
                $ {Intl.NumberFormat("en-US").format(checkoutProduct.totalPrice)}
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
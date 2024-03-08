import { ActionIcon, Box, Card, Flex, Image, NumberInput, Title } from "@mantine/core"
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react"
import { useCart } from "../../store/shopStore"
import { openConfirmDeleteModal } from "../../utils/openConfirmDeleteModal"

export interface CartProps {
  image: string;
  title: string;
  price: number;
  totalPrice: number;
  amount: number;
  id: string;
}

interface CartItemProps {
  cartProduct: CartProps;
}


export const CartItem = ({ cartProduct, ...rest }: CartItemProps) => {
  const deleteItem = useCart((state) => state.deleteItem)
  const increaseAmount = useCart((state) => state.increaseAmount)
  const decreaseAmount = useCart((state) => state.decreaseAmount)
  const increaseByInput = useCart((state) => state.increaseByInput)

  const handleDelete = () => {
    deleteItem(cartProduct.id)
  }

  const deleteConfirmModal = () => {
    openConfirmDeleteModal({
      confirm: () => deleteItem(cartProduct.id),
      title: "Are you sure you want to delete this item?"
    })
  }

  const handleIncrease = () => {
    increaseAmount(cartProduct.id)
  }

  const handleDecrease = () => {
    decreaseAmount(cartProduct.id)
  }

  return (
    <Card
      {...rest}
      shadow="xs"
      padding="xs"
      withBorder
      radius="lg"
      w="100%"
      h={100}
    >
      <Flex h="100%" px={15} align="center" gap={10} >
        <Image
          src={cartProduct.image}
          fit="contain"
          h="100%"
          w={60}
          p={5}
        >
        </Image>
        <Flex justify="space-between" w="100%">
          <Box maw={130} >
            <Title order={5} lineClamp={1}>
              {cartProduct.title}
            </Title>
          </Box>

          <Flex direction="row" align="center" justify="space-evenly" gap={5}>
            <ActionIcon
              variant="light"
              color="gray"
              onClick={cartProduct.amount < 2 ? deleteConfirmModal : handleDecrease}
            >
              <IconMinus size="20" />
            </ActionIcon>
            <NumberInput
              size="xs"
              w={40}
              value={cartProduct.amount}
              onChange={(value) => increaseByInput(cartProduct.id, Number(value))}
              hideControls
            />
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

          <Flex gap={10} w={120} align="center" justify="end">
            <Title order={5} className="self-center" >
              $ {Intl.NumberFormat("en-US").format(cartProduct.totalPrice)}
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
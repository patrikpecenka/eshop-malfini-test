import { Flex, Image, Anchor, Text, Card, NumberFormatter } from "@mantine/core"
import { cartCheckoutProps } from "../../lib/props/types"
export const OrderThreeItem = ({ id, image, title, amount, totalPrice }: cartCheckoutProps) => {

  return (
    <Flex id={id} gap={15} align="center">
      <Card shadow="sm" withBorder w={80} h={80} >
        <Image
          src={image}
          fit="contain"
          h="100%"
        />
      </Card>
      <Anchor w="100%" flex={1}>
        <Text size="xs" c="dimmed">
          {amount}x {title}
        </Text>
      </Anchor>
      <Text size="sm" className="text-right">
        <NumberFormatter suffix=" $" value={totalPrice} decimalScale={2} />
      </Text>
    </Flex>
  )
}
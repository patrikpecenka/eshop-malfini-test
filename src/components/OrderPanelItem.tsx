import { Card, Flex, Title, Text, Button, Divider, Tooltip, CardProps } from "@mantine/core"
import { IconCheck, IconDownload } from "@tabler/icons-react"
import { OrderCart } from "lib/props/types"
import { dateFormater } from "utils/number/dateFormater";
import { currencyFormater } from "utils/number/currencyFormater"

interface OrderItemProps extends CardProps {
  OrderItem: OrderCart;
  onClick: () => void
}

export const OrderItem = ({ OrderItem, ...rest }: OrderItemProps) => {

  return (
    <Card
      className="hover:scale-105 duration-100 cursor-pointer"
      withBorder
      shadow="sm"
      w="100%"
      bg="gray.0"
      {...rest}
    >
      <Title order={6}>
        Order ID: {OrderItem.orderId}
      </Title>
      <Text c="dimmed" size="xs">
        {dateFormater(OrderItem.paymentDetails.dateOfOrder)}
      </Text>
      <Divider my="sm" />
      <Flex justify="space-between" align="center">
        <Flex direction="column">

          <Title order={6}>
            {OrderItem.cart.reduce((acc, item) => acc + item.amount, 0)} Items
          </Title>
        </Flex>

        <Flex direction="column">
          <Text fw={700} size="xs">
            {currencyFormater.format(OrderItem.paymentDetails.totalPrice)}
          </Text>
        </Flex>
        <Text >
          <Tooltip label="Paid and Shipped">
            <IconCheck color="#00a313" />
          </Tooltip>
        </Text>
        <Tooltip label="Download invoice">
          <Button radius="xl" variant="gradient" className="hover:opacity-70 duration-200" h={30}>
            <IconDownload size={22} />
          </Button>
        </Tooltip>
      </Flex>
    </Card>

  )
}
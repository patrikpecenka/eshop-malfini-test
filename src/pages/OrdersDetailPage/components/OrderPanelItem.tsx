import { Card, Flex, Title, Text, Divider, CardProps } from "@mantine/core";
import { dateFormatter } from "@utils/number/dateFormatter";
import { currencyFormatter } from "@utils/number/currencyFormatter";
import { OrderDetails } from "@store/order.store";

interface OrderItemProps extends CardProps {
  orderItem: OrderDetails;
  onClick?: () => void;
}

export const OrderPanelItem = ({ orderItem, ...rest }: OrderItemProps) => {

  return (
    <Card
      m={10}
      className="hover:scale-105 duration-100 cursor-pointer"
      w="95%"
      {...rest}
    >
      <Title order={6}>
        Order ID: {orderItem.orderId}
      </Title>
      <Text c="dimmed" size="xs">
        {dateFormatter(orderItem.paymentDetails.dateOfOrder ?? "")}
      </Text>
      <Divider my="sm" />
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Title order={6}>
            {orderItem.cart.reduce((acc, item) => acc + item.amount, 0)} Items
          </Title>
        </Flex>

        <Flex direction="column">
          <Text fw={700} size="xs">
            {currencyFormatter.format(orderItem.paymentDetails.totalPrice)}
          </Text>
        </Flex>
      </Flex>
    </Card >
  );
};
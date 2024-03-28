import { Card, Flex, Title, Text, Divider, CardProps } from "@mantine/core";
import { OrderDetails } from "lib/props/types";
import { dateFormatter } from "utils/number/dateFormatter";
import { currencyFormatter } from "utils/number/currencyFormatter";

interface OrderItemProps extends CardProps {
  OrderItem: OrderDetails;
  onClick: () => void;
}

export const OrderPanelItem = ({ OrderItem, ...rest }: OrderItemProps) => {

  return (
    <Card
      m={10}
      className="hover:scale-105 duration-100 cursor-pointer"
      w="95%"
      {...rest}
    >
      <Title order={6}>
        Order ID: {OrderItem.orderId}
      </Title>
      <Text c="dimmed" size="xs">
        {dateFormatter(OrderItem.paymentDetails.dateOfOrder ?? "")}
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
            {currencyFormatter.format(OrderItem.paymentDetails.totalPrice)}
          </Text>
        </Flex>
      </Flex>
    </Card >
  );
};
import { Box, Card, Divider, Table, Title, Text, Flex, Stack, Anchor } from "@mantine/core";
import { useOrderCart } from "store/shopStore";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { currencyFormater } from "utils/number/currencyFormater";
import { dateFormater } from "utils/number/dateFormater";

export const ProfilePage = () => {
  const { userData } = useOrderCart();
  const [query] = useQueryParam('order', withDefault(StringParam, ''));

  const orderDetail = userData.find((order) => (order.orderId).toString() === query);

  const rows = orderDetail?.cart.map((item) => (
    <Table.Tr key={item.title}>
      <Table.Td>
        <Anchor
          size="sm"
          c="black"
          href={`/products/${item.id}`}
        >
          {item.title}
        </Anchor>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>{currencyFormater.format(item.price)}</Table.Td>
      <Table.Td>{item.amount}</Table.Td>
      <Table.Td>{currencyFormater.format(item.totalPrice)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {query !== orderDetail?.orderId.toString()
        ? "Pick an order"
        : (<Box px={50}>
          <Title order={1} my={30}>
            Order {orderDetail?.orderId}
          </Title>
          <Card
            shadow="sm"
            withBorder
            mb={20}
          >
            <Flex justify="space-between" direction="column">
              <Title order={3}>
                Order details
              </Title>
              <Divider my="sm" />
              <Flex>

                <Table>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Th> OrderID </Table.Th> <Table.Td>{orderDetail?.orderId}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Uuid </Table.Th> <Table.Td>{orderDetail?.id}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Order date </Table.Th> <Table.Td>{dateFormater(orderDetail?.paymentDetails.dateOfOrder ?? "")}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Payment method </Table.Th> <Table.Td>{orderDetail?.paymentDetails.paymentMethod}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Payment price </Table.Th>
                      <Table.Td>
                        {orderDetail?.paymentDetails.paymentPrice === 0
                          ? "Free"
                          : currencyFormater.format(orderDetail?.paymentDetails.paymentPrice ?? 0
                          )}
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Delivery method </Table.Th> <Table.Td></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Delivery price </Table.Th> <Table.Td></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Total Price </Table.Th> <Table.Td>{currencyFormater.format(orderDetail?.paymentDetails.totalPrice ?? 0)}</Table.Td>
                    </Table.Tr>

                  </Table.Tbody>
                </Table>
                <Table withRowBorders={false} m={10}>
                  <Flex justify="space-between" h="100%" align="center" direction="column" gap={10}>
                    <Flex w="70%" justify="space-around">
                      <Title order={6}>
                        Shipping Address
                      </Title>
                      <Stack gap={0}>
                        <Table.Tr>{orderDetail?.userDetails.firstName + " " + orderDetail?.userDetails.lastName}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.address}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.city}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.zipCode}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.country}</Table.Tr>
                      </Stack>
                    </Flex>
                    <Divider my="sm" />

                    <Flex w="70%" justify="space-around">
                      <Title order={6}>
                        Billing Address
                      </Title>
                      <Stack gap={0}>
                        <Table.Tr>{orderDetail?.userDetails.firstName + " " + orderDetail?.userDetails.lastName}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.address}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.city}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.zipCode}</Table.Tr>
                        <Table.Tr>{orderDetail?.userDetails.country}</Table.Tr>
                      </Stack>
                    </Flex>
                  </Flex>
                </Table>
              </Flex>
            </Flex>

          </Card>
          <Card
            shadow="sm"
            withBorder
          >

            {/* Order Items Table */}
            <Title order={3}>
              Order Items
            </Title>
            <Divider my="sm" />
            <Table striped highlightOnHover >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item name</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>QTY</Table.Th>
                  <Table.Th>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows}
              </Table.Tbody>
              <Table.Tfoot >
                <Table.Tr >
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th>
                    <Text c="dimmed" size="sm">
                      Subtotal:
                    </Text>
                    <Text c="dimmed" size="sm">
                      VAT:
                    </Text>
                    <Text c="dimmed" size="sm">
                      Discount:
                    </Text>
                  </Table.Th>
                  <Table.Th >
                    <Text c="dimmed" size="sm">
                      {orderDetail?.paymentDetails.subtotalPrice ? currencyFormater.format(orderDetail?.paymentDetails.subtotalPrice) : ""}
                    </Text>
                    <Text c="dimmed" size="sm">
                      {orderDetail?.paymentDetails.noVatPrice ? currencyFormater.format(orderDetail?.paymentDetails.noVatPrice) : ""}
                    </Text>
                    <Text c="dimmed" size="sm">
                      {orderDetail?.paymentDetails.discount ? currencyFormater.format(orderDetail?.paymentDetails.discount) : "No discount."}
                    </Text>
                  </Table.Th>
                </Table.Tr>
                <Table.Tr >
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th></Table.Th>
                  <Table.Th >
                    <Text fw={700}>
                      Total:
                    </Text>
                  </Table.Th>
                  <Table.Th >
                    <Text fw={700}  >
                      {orderDetail?.paymentDetails.totalPrice ? currencyFormater.format(orderDetail?.paymentDetails.totalPrice) : ""}
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Tfoot>
            </Table>
          </Card>
        </Box >
        )}
    </>
  )
}
import { Box, Card, Divider, Table, Title, Text, Flex, Stack, Anchor, Button, Group } from "@mantine/core";
import { useCart, useOrderCart } from "store/shopStore";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { currencyFormater } from "utils/number/currencyFormater";
import { dateFormater } from "utils/number/dateFormater";
import { IconDownload, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export const ProfilePage = () => {
  const { userData } = useOrderCart();
  const addCartItems = useCart((state) => state.addItem);
  const navigate = useNavigate();

  const [query] = useQueryParam('order', withDefault(StringParam, ''));

  const orderDetail = userData.find((order) => (order.orderId).toString() === query);
  const [loading, setLoading] = useState(false);

  const handleBuyAgain = () => {
    const foundOrder = userData.find((order) => order.orderId.toString() === query)
    if (foundOrder) {
      setLoading(true)
      setTimeout(() => {
        foundOrder.cart.forEach((item) => addCartItems(item))
        setLoading(false)
        navigate('/checkout')
      }, 2000)
    }
  }

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
    <motion.div
      key="order-detail-page"
      initial={{ x: "20%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-20%", opacity: 0, transition: { duration: 0.2 } }}
      transition={{ delay: 0, duration: 0.2 }}
    >
      {query !== orderDetail?.orderId.toString()
        ? "Pick an order"
        : (<Box px={50}>
          <Flex justify="space-between" align="center">
            <Title order={1} my={30}>
              Order {orderDetail?.orderId}
            </Title>
            <Group gap={10}>
              <Button
                variant="light"
                color="indigo"
                leftSection={<IconCopy size={20} />}
                loading={loading}
                onClick={handleBuyAgain}
              >
                Buy Again
              </Button>
              <Button
                className="hover:opacity-70 duration-200"
                variant="gradient"
                leftSection={<IconDownload size={20} />}
              >
                Download Invoice
              </Button>
            </Group>
          </Flex>
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
                      <Table.Th> Delivery method </Table.Th> <Table.Td>{orderDetail?.paymentDetails.deliveryMethod}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th> Delivery price </Table.Th>
                      <Table.Td>
                        {orderDetail?.paymentDetails.paymentPrice === 0
                          ? "Free"
                          : currencyFormater.format(orderDetail?.paymentDetails.deliveryPrice ?? 0
                          )}
                      </Table.Td>
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
    </motion.div>
  )
}
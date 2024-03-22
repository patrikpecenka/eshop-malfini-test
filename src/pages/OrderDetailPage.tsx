import { Box, Card, Divider, Table, Title, Text, Flex, Stack, Anchor, Button, Group } from "@mantine/core";
import { useCartStore } from "store/cart.store";
import { useOrderStore } from "store/order.store";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { currencyFormatter } from "utils/number/currencyFormatter";
import { dateFormatter } from "utils/number/dateFormatter";
import { IconDownload, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useDebouncedValue } from "@mantine/hooks";


export const ProfilePage = () => {
  const { OrderDetailData } = useOrderStore();
  const addCartItems = useCartStore((state) => state.createItem);
  const navigate = useNavigate();

  const [query] = useQueryParam('order', withDefault(StringParam, ''));
  const [debounced] = useDebouncedValue(query, 300, { leading: true });

  const orderDetail = OrderDetailData.find((order) => (order.orderId).toString() === debounced);
  const [loading, setLoading] = useState(false);

  const handleBuyAgain = () => {
    const foundOrder = OrderDetailData.find((order) => order.orderId.toString() === query);
    if (foundOrder) {
      setLoading(true);
      setTimeout(() => {
        foundOrder.cart.forEach((item) => addCartItems(item));
        setLoading(false);
        navigate('/checkout');
      }, 2000);
    }
    return;
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const rows = orderDetail?.cart.map((item) => (
    <Table.Tr key={item.title}>
      <Table.Td>
        <Anchor
          size="sm"
          href={`/products/${item.id}`}
        >
          {item.title}
        </Anchor>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>{currencyFormatter.format(item.price)}</Table.Td>
      <Table.Td>{item.amount}</Table.Td>
      <Table.Td>{currencyFormatter.format(item.totalPrice)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Box px={50} ref={componentRef}>
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
              disabled={!query}
              onClick={handleBuyAgain}
            >
              Buy Again
            </Button>
            <Button
              className="hover:opacity-70 duration-200"
              variant="gradient"
              disabled={!query}
              leftSection={<IconDownload size={20} />}
              onClick={handlePrint}
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
                    <Table.Th> Order date </Table.Th>
                    <Table.Td>
                      {
                        orderDetail === undefined
                          ? "N/A"
                          : dateFormatter(orderDetail?.paymentDetails.dateOfOrder ?? "")
                      }
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th> Payment method </Table.Th>
                    <Table.Td>
                      {
                        orderDetail === undefined
                          ? ""
                          : orderDetail?.paymentDetails.paymentMethod + "-" + orderDetail?.paymentDetails.paymentId
                      }
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th> Delivery method </Table.Th>
                    <Table.Td>
                      {
                        orderDetail === undefined
                          ? ""
                          : orderDetail?.paymentDetails.deliveryMethod + "-" + orderDetail?.paymentDetails.deliveryId
                      }
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th> Total Price </Table.Th>
                    <Table.Td>
                      {
                        orderDetail === undefined
                          ? "N/A"
                          : currencyFormatter.format(orderDetail?.paymentDetails.totalPrice ?? 0)

                      }
                    </Table.Td>
                  </Table.Tr>

                </Table.Tbody>
              </Table>
              <Table withRowBorders={false} m={10}>
                <Flex justify="space-between" h="100%" align="center" direction="column" gap={10}>
                  <Flex w="70%" justify="space-around">
                    <Title order={6}>
                      Shipping Address
                    </Title>
                    {
                      orderDetail === undefined
                        ? "N/A"
                        : <Stack gap={0}>
                          <Table.Tr>{orderDetail?.userDetails.firstName + " " + orderDetail?.userDetails.lastName}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.address}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.city}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.zipCode}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.country}</Table.Tr>
                        </Stack>
                    }

                  </Flex>
                  <Divider my="sm" />

                  <Flex w="70%" justify="space-around">
                    <Title order={6}>
                      Billing Address
                    </Title>
                    {
                      orderDetail === undefined
                        ? "N/A"
                        : <Stack gap={0}>
                          <Table.Tr>{orderDetail?.userDetails.firstName + " " + orderDetail?.userDetails.lastName}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.address}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.city}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.zipCode}</Table.Tr>
                          <Table.Tr>{orderDetail?.userDetails.country}</Table.Tr>
                        </Stack>
                    }
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
                    {orderDetail?.paymentDetails.subtotalPrice ? currencyFormatter.format(orderDetail?.paymentDetails.subtotalPrice) : ""}
                  </Text>
                  <Text c="dimmed" size="sm">
                    {orderDetail?.paymentDetails.noVatPrice ? currencyFormatter.format(orderDetail?.paymentDetails.noVatPrice) : ""}
                  </Text>
                  <Text c="dimmed" size="sm">
                    {orderDetail?.paymentDetails.discount ? currencyFormatter.format(orderDetail?.paymentDetails.discount) : "No discount."}
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
                    {orderDetail?.paymentDetails.totalPrice ? currencyFormatter.format(orderDetail?.paymentDetails.totalPrice) : ""}
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Tfoot>
          </Table>
        </Card>
      </Box >

    </>
  );
};
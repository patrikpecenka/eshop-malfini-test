import { Card, Divider, Table, Title, Text, Flex, Stack, Anchor, Button, Group, TextInput } from "@mantine/core";
import { useCartStore } from "@store/cart.store";
import { useOrderStore } from "@store/order.store";
import { currencyFormatter } from "@utils/number/currencyFormatter";
import { dateFormatter } from "@utils/number/dateFormatter";
import { IconDownload, IconCopy, IconSearch, IconArrowBigRightFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { SidePanel } from "@pages/OrdersDetailPage/components/SidePanel";
import { useForm } from '@mantine/form';
import { deliveryMethods, paymentMethods } from "../CheckoutPage/components/PaymentDelivery";

export const OrderDetailPage = () => {
  const { orderDetailData: OrderDetailData } = useOrderStore();
  const addCartItems = useCartStore((state) => state.createItem);
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const orderDetail = OrderDetailData.find((order) => (order.orderId).toString() === id);

  const form = useForm({
    initialValues: {
      orderId: "",
    },
    validate: {
      orderId: (value) => OrderDetailData.find((order) => (order.orderId).toString() === value)
        ? null
        : 'Please make sure the entered order number is correct',
    }
  });

  const handleBuyAgain = () => {
    if (orderDetail) {
      setLoading(true);
      setTimeout(() => {
        orderDetail.cart.forEach((item) => addCartItems(item));
        setLoading(false);
        navigate('/checkout');
      }, 1200);
    }
  };

  useEffect(() => {
    if (!orderDetail) {
      return navigate('/profile');
    }
  }, [orderDetail]);

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const rows = orderDetail?.cart.map((item) => (
    <Table.Tr key={item.title}>
      <Table.Td>
        <Anchor
          component={Link}
          size="sm"
          to={`/products/${item.id}`}
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
    <Flex gap={0} h="calc(100dvh - var(--app-shell-header-height)" justify="end">
      {
        !orderDetail
          ? <Flex direction="column" flex={1} className="border-r border-[var(--app-shell-border-color)]" >
            <Flex h="100%" justify="center" direction="column" align="center">
              <Title>Enter your order</Title>
              <form onSubmit={form.onSubmit(() => navigate(`/profile/${form.values.orderId}`))}>
                <Group>
                  <TextInput
                    w="20rem"
                    placeholder="Enter the order invoice number..."
                    rightSectionPointerEvents="all"
                    leftSection={<IconSearch size={20} />}
                    {...form.getInputProps('orderId')}
                  />
                  <Button
                    variant="filled"
                    radius="sm"
                    size="sm"
                    type="submit"
                  >
                    <IconArrowBigRightFilled size={15} />
                  </Button>
                </Group>
              </form>
            </Flex>
          </Flex>
          : <Flex direction="column" flex={1} className="border-r border-[var(--app-shell-border-color)]" >
            <Group w="100%" justify="space-between" px={30} pt={30}>
              <Title order={1} >
                Order {orderDetail?.orderId}
              </Title>
              <Group gap={10}>
                <Button
                  variant="light"
                  leftSection={<IconCopy size={20} />}
                  loading={loading}
                  disabled={!orderDetail}
                  onClick={handleBuyAgain}
                >
                  Buy Again
                </Button>
                <Button
                  className="hover:opacity-70 duration-200"
                  disabled={!orderDetail}
                  leftSection={<IconDownload size={20} />}
                  onClick={handlePrint}
                >
                  Download Invoice
                </Button>
              </Group>
            </Group>

            <Group pb={30} px={30} ref={componentRef} flex={1} className="overflow-auto" align="none">
              <Card mb="sm" w="100%" mt={11}>
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
                            {dateFormatter(orderDetail?.paymentDetails.dateOfOrder ?? "")}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th> Payment method </Table.Th>
                          <Table.Td>
                            {paymentMethods.find((value) => value.id === orderDetail?.paymentDetails.paymentId)?.name}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th> Delivery method </Table.Th>
                          <Table.Td>
                            {deliveryMethods.find((value) => value.id === orderDetail?.paymentDetails.deliveryId)?.name}
                          </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                          <Table.Th> Total Price </Table.Th>
                          <Table.Td>
                            {currencyFormatter.format(orderDetail?.paymentDetails.totalPrice ?? 0)}
                          </Table.Td>
                        </Table.Tr>

                      </Table.Tbody>
                    </Table>
                    <Table withRowBorders={false} m={10}>
                      <Flex justify="space-between" h="100%" align="center" direction="column">
                        <Flex w="70%" justify="space-around">
                          <Title order={6}>
                            Shipping Address
                          </Title>
                          {
                            <Stack gap={0}>
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
                            <Stack gap={0}>
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
              </Card >
              {/* Order Items Table */}
              <Card w="100%">
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
                          {currencyFormatter.format(orderDetail?.paymentDetails.subtotalPrice ?? 0)}
                        </Text>
                        <Text c="dimmed" size="sm">
                          {currencyFormatter.format(orderDetail?.paymentDetails.noVatPrice ?? 0)}
                        </Text>
                        <Text c="dimmed" size="sm">
                          {currencyFormatter.format(orderDetail?.paymentDetails.discount ?? 0)}
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
                          {currencyFormatter.format(orderDetail?.paymentDetails.totalPrice ?? 0)}
                        </Text>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Tfoot>
                </Table>
              </Card>
            </Group >
          </Flex>
      }
      <SidePanel mt={38} w="25rem" px={20} />
    </Flex>
  );
};
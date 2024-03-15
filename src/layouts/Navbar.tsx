import { Badge, Drawer, Flex, Group, Indicator, Title, Button, Text, Avatar, Stack, Menu, ActionIcon, Tooltip } from "@mantine/core"
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconShoppingCartFilled, IconTool, IconReceipt, IconHeartFilled } from '@tabler/icons-react';
import { CartItem } from "components/Cart/CartItem";
import { useCart } from "../store/shopStore"
import { useNavigate } from "react-router-dom"
import { EmptyCart } from "components/EmptyCart/EmptyCart";
import { currencyFormater } from "utils/number/currencyFormater";


export const Navbar = () => {
  const { totalPriceCalculation, clearCart } = useCart()
  const { cart, getSumCartItems } = useCart()
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  const { hovered, ref } = useHover();


  const roundTotalPrice = () => {
    return currencyFormater.format(totalPriceCalculation())
  }

  const handleCheckoutRedirect = () => {
    close()
    navigate("/checkout")
  }

  return (
    <>
      <Button
        variant="transparent"
        h="100%"
        onClick={() => navigate("/")}
        c="black"
      >
        <Title order={1} w="100%">
          Easy
          <Text
            span
            inherit
            variant="gradient"
            gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
          >
            Shop
          </Text>
        </Title>
      </Button>

      <Flex align="center" gap={10} h={40} >
        <Menu offset={1} shadow="sm" >
          <Menu.Target>
            <Button
              ref={ref}
              component="div"
              size="sm"
              radius="xl"
              variant={hovered ? "light" : "transparent"}
              color="violet"
              leftSection={
                <Avatar
                  size="sm"
                  src="https://megaport.hu/media/king-include/uploads/2023/10/906363-female-avatar-profile-picture-013.jpg"
                  alt="Profile"
                />
              }
            >
              <Stack >
                <Text fw={700}> My Profile </Text>
              </Stack>
            </Button>
          </Menu.Target>
          <Menu.Dropdown w={200} >
            <Menu.Item
              leftSection={<IconTool size={18} color="grey" />}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              component="a"
              href="/profile"
              leftSection={<IconReceipt size={18} color="grey" />}
            >
              Orders
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Tooltip
          label="Orders and Goods"
          transitionProps={{ duration: 200 }}
          withArrow
        >
          <ActionIcon
            component="a"
            href="/profile"
            variant="subtle"
            color="violet"
          >
            <IconReceipt size="100%" />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label="Favorites"
          transitionProps={{ duration: 200 }}
          withArrow
        >
          <ActionIcon
            variant="subtle"
            color="violet"
          >
            <IconHeartFilled size="100%" />
          </ActionIcon>
        </Tooltip>


        <Tooltip
          label="Go to cart"
          transitionProps={{ duration: 200 }}
          withArrow
        >
          <Indicator
            label={getSumCartItems()}
            size={22}
            offset={7}
            position="top-end"
            disabled={cart.length === 0}
            color="red.6"
            withBorder
          >
            <Button
              radius="xl"
              size="sm"
              variant="light"
              color="violet.5"
              onClick={open}
              leftSection={
                <IconShoppingCartFilled size={25} />
              }
            >

              <Text fw={700} size="sm" >
                {roundTotalPrice()}
              </Text>
            </Button>
          </Indicator >
        </Tooltip>
      </Flex >

      <Drawer
        size="lg"
        offset={20}
        radius="md"
        opened={opened}
        onClose={close}
        position="right"
        transitionProps={{ transition: "slide-left", duration: 400, timingFunction: 'ease' }}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Flex justify="center" align="center" direction="column">
          <Flex justify="space-between" w="100%" px={15}>
            <Button onClick={clearCart} variant="light" color="red" disabled={cart.length === 0}>
              Clear cart
            </Button>
            <Title order={4} className="place-self-start" c="black" fw={600}>
              Total price:
              <Badge
                color="black"
                bg="violet.0.1"
                size="xl"
                h="100%"
                ml={10}
                variant={cart.length > 0 ? "light" : "transparent"}
              >
                <Text fw={700}>{roundTotalPrice()}</Text>
              </Badge>
            </Title>
          </Flex>
          <Title order={2} >
            My Cart
          </Title>
          {/* Shop item inside the cart  */}
          <Group mt="10" w="100%" gap={10} p={10} >
            {
              cart.length === 0
                ? <EmptyCart />
                : cart.map((product) => (
                  <CartItem
                    key={product.id}
                    cartProduct={product}
                  />
                ))}
          </Group>
        </Flex>
        <Group w="100%" align="center" justify="center">
          <Button
            disabled={cart.length === 0}
            className="hover:opacity-70 duration-200"
            mx={15}
            w="100%"
            mt={15}
            variant="gradient"
            size="md"
            radius="xl"
            onClick={handleCheckoutRedirect}
          >
            Checkout
          </Button>
        </Group>
      </Drawer >
    </>
  )
}
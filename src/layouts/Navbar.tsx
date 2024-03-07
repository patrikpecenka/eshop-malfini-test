import { Badge, Drawer, Flex, Group, Indicator, Title, Button, NumberFormatter, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCart } from '@tabler/icons-react';
import { CartItem } from "components/Cart/CartItem";
import { useCart } from "../store/shopStore"
import { useNavigate } from "react-router-dom"
import { EmptyCart } from "components/EmptyCart/EmptyCart";


export const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { totalPrice, clearCart } = useCart()
  const { cart, getSumCartItems } = useCart()
  const navigate = useNavigate();

  const roundTotalPrice = () => {
    return Intl.NumberFormat("en-US").format(totalPrice())
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
        <Title order={1}>
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
        <Badge
          color="red.5."
          bg="violet.0.1"
          size="xl"
          h="100%"
          variant={cart.length > 0 ? "dot" : "transparent"}
        >
          <NumberFormatter prefix="$" value={roundTotalPrice()} decimalScale={2} />
        </Badge>

        <Indicator
          h="100%"
          label={getSumCartItems()}
          inline
          size={22}
          offset={7}
          position="top-start"
          disabled={cart.length === 0}
          color="red.6"
          withBorder
        >
          <Button
            radius="xl"
            size="md"
            variant="outline"
            color="violet.5"
            onClick={open}
          >
            <IconShoppingCart />
          </Button>
        </Indicator >
      </Flex>

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
                <NumberFormatter prefix=" $" value={roundTotalPrice()} decimalScale={2} />
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
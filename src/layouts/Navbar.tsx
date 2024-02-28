import { Badge, Drawer, Flex, Group, Indicator, Title, Text, Button, NumberFormatter } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCart } from '@tabler/icons-react';
import { CartItem } from "components/CartItem";
import { useCart } from "../store/shopStore"


export const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { totalPrice, clearCart } = useCart()
  const { cart } = useCart()

  return (
    <>
      <Title order={1}>
        EasyShop
      </Title>
      <Flex align="center" gap={10} h={40} >
        <Badge
          color="red.5."
          bg="violet.0.1"
          size="xl"
          h="100%"
          variant={cart.length > 0 ? "dot" : "transparent"}
        >
          <NumberFormatter prefix="$" value={totalPrice()} decimalScale={2} />
        </Badge>

        <Indicator
          h="100%"
          label={cart.length}
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
        <Flex justify="center" align="center" direction="column"  >
          <Flex justify="space-between" w="100%" px={15}>
            <Button onClick={clearCart} variant="light" color="red">
              Clear cart
            </Button>
            <Text className="place-self-start" c="black" fw={600}>
              Total price:
              <Badge
                color="black"
                bg="violet.0.1"
                size="xl"
                h="100%"
                ml={10}
                variant={cart.length > 0 ? "light" : "transparent"}
              >
                <NumberFormatter prefix=" $" value={totalPrice()} decimalScale={2} />
              </Badge>
            </Text>
          </Flex>
          <Title order={2} >
            My Cart
          </Title>
          {/* Shop item inside the cart  */}
          <Group mt="10" w="100%" gap={10} p={10} >
            {cart.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                amount={item.amount}
              />
            ))}
          </Group>
        </Flex>
      </Drawer >
    </>
  )
}
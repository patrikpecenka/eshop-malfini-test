import {
  Badge,
  Drawer,
  Flex,
  Group,
  Indicator,
  Image,
  Title,
  Button,
  Text,
  Avatar,
  Stack,
  Menu, ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme, UnstyledButton, SimpleGrid
} from "@mantine/core";
import { readLocalStorageValue, useDisclosure, useHover } from "@mantine/hooks";
import { IconShoppingCartFilled, IconTool, IconReceipt, IconHeartFilled, IconMoon, IconSun } from '@tabler/icons-react';
import { CartProductItem } from "@components/CartItem";
import { useCartStore } from "@store/cart.store";
import { Link, useNavigate } from "react-router-dom";
import { EmptyCart } from "@components/EmptyCart";
import { currencyFormatter } from "@utils/number/currencyFormatter";

export let primaryColor = readLocalStorageValue({ key: "easyShopPrimaryColor", defaultValue: "blue" });

const COLOR_OPTIONS = [
  { id: 1, colValue: "red" },
  { id: 2, colValue: "pink" },
  { id: 3, colValue: "grape" },
  { id: 4, colValue: "violet" },
  { id: 5, colValue: "indigo" },
  { id: 6, colValue: "blue" },
  { id: 7, colValue: "cyan" },
  { id: 8, colValue: "teal" },
  { id: 9, colValue: "green" },
  { id: 10, colValue: "lime" },
  { id: 11, colValue: "yellow" },
  { id: 12, colValue: "orange" },
];

export const Navbar = () => {
  const { totalPriceCalculation, clearCart } = useCartStore();
  const { cart, getSumCartItems } = useCartStore();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  const { hovered, ref } = useHover();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const handleThemeColor = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const roundTotalPrice = () => {
    return currencyFormatter.format(totalPriceCalculation());
  };

  const handleCheckoutRedirect = () => {
    close();
    navigate("/checkout");
  };

  const handleThemeChange = (selectedColor: string) => {
    if (primaryColor === selectedColor) {
      return;
    }

    localStorage.setItem("easyShopPrimaryColor", selectedColor);
    location.reload();
  };

  return (
    <>
      <UnstyledButton
        component={Link}
        variant="transparent"
        color="none"
        h="100%"
        to="/products"
        py="xs"
      >
        <Image
          alt="EasyShop Logo"
          src="/easy-shop.svg"
          h="100%"
        />
      </UnstyledButton>

      <Flex align="center" h={40} >
        <Menu offset={1} shadow="sm" >
          <Menu.Target>
            <Button
              ref={ref}
              component="div"
              size="sm"
              variant={hovered ? "light" : "transparent"}
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
          <Menu.Dropdown w={210} >
            <Menu.Label>Color scheme selector</Menu.Label>
            <Menu.Item>
              <SimpleGrid cols={6} spacing="xs" verticalSpacing="xs">
                {COLOR_OPTIONS.map((color) => {
                  return (
                    <Tooltip label={color.colValue} key={color.id} >
                      <ActionIcon
                        size="sm"
                        className={
                          primaryColor === color.colValue
                            ? 'active'
                            : 'opacity-20 hover:opacity-100 hover:scale-110 transition-all'
                        }
                        color={color.colValue}
                        onClick={() => handleThemeChange(color.colValue)}
                      >
                      </ActionIcon>
                    </Tooltip>
                  );
                })}
              </SimpleGrid>
            </Menu.Item>

            <Menu.Label>Other</Menu.Label>
            <Menu.Item
              leftSection={<IconTool size={18} color="grey" />}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              component={Link}
              to="/profile"
              leftSection={<IconReceipt size={18} color="grey" />}
            >
              Orders
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Tooltip
          label="Switch dark/light scheme"
          transitionProps={{ duration: 200 }}
          withArrow
        >
          <ActionIcon
            onClick={() => handleThemeColor()}
            variant="subtle"
            aria-label="Toggle color scheme"
          >
            <IconSun
              className={computedColorScheme === 'light' ? 'hidden' : ''}
            />
            <IconMoon
              className={computedColorScheme === 'dark' ? 'hidden' : ''}
            />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label="Orders and Goods"
          transitionProps={{ duration: 200 }}
          withArrow
        >
          <ActionIcon
            component={Link}
            to="/profile"
            variant="subtle"
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
            component={Link}
            to="/favorite"
            variant="subtle"
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
              size="sm"
              variant="light"
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
            <Button
              onClick={clearCart}
              variant="light"
              color="red"
              disabled={cart.length === 0}
              size="sm"
            >
              Clear cart
            </Button>
            <Title order={4} className="place-self-start" fw={600}>
              Total price:
              <Badge
                color="black"
                bg="violet.0"
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
                  <CartProductItem
                    key={product.id}
                    disableAnchor={true}
                    cartProduct={product}
                    lineClamp={1}
                    textBoxWidth={160}
                    cardHeight={60}
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
            onClick={handleCheckoutRedirect}
          >
            Checkout
          </Button>
        </Group>
      </Drawer >
    </>
  );
}


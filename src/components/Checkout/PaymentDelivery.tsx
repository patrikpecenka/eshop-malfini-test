import { Button, Flex, Group, Paper, Radio, Text, Image, Box, ScrollArea, Title, useComputedColorScheme } from "@mantine/core";
import { useCartStore } from "store/cart.store";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { SummaryCartItem } from "components/Cart/SummaryCartItem";
import ApplePay from "../../assets/apple-pay-svgrepo-com.svg";
import Bank from "../../assets/bank-transfer-svgrepo-com.svg";
import Bitcoin from "../../assets/bitcoin-svgrepo-com.svg";
import Cash from "../../assets/cash-money-svgrepo-com.svg";
import GooglePay from "../../assets/google-pay-svgrepo-com.svg";
import PayPal from "../../assets/paypal-3-svgrepo-com.svg";
import Stripe from "../../assets/stripe-svgrepo-com.svg";
import Visa from "../../assets/visa-svgrepo-com.svg";
import Dhl from "../../assets/dhl-svgrepo-com.svg";
import DhlExpress from "../../assets/dhl-express-logo-svgrepo-com.svg";
import Delivery from "../../assets/delivery-svgrepo-com.svg";
import { withDefault, StringParam, useQueryParams } from "use-query-params";
import { currencyFormatter } from "utils/number/currencyFormatter";

export const paymentMethods = [
  {
    id: "pm-1001",
    name: "Visa",
    icon: Visa,
    fee: 0,
  },
  {
    id: "pm-1002",
    name: "PayPal",
    icon: PayPal,
    fee: 0
  },
  {
    id: "pm-1003",
    name: "Google Pay",
    icon: GooglePay,
    fee: 0
  },
  {
    id: "pm-1004",
    name: "Apple Pay",
    icon: ApplePay,
    fee: 0
  },
  {
    id: "pm-1005",
    name: "Bank Transfer",
    icon: Bank,
    fee: 1.49
  },
  {
    id: "pm-1006",
    name: "Cash",
    icon: Cash,
    fee: 0
  },
  {
    id: "pm-1007",
    name: "Bitcoin",
    icon: Bitcoin,
    fee: 0
  },
  {
    id: "8pm-1008",
    name: "Stripe",
    icon: Stripe,
    fee: 1.99
  }
];

export const deliveryMethods = [
  {
    id: "dm-1001",
    name: "Pickup",
    icon: "",
    fee: 0,
  },
  {
    id: "dm-1002",
    name: "Standard",
    icon: Delivery,
    fee: 1.99,
  },
  {
    id: "dm-1003",
    name: "Express",
    icon: DhlExpress,
    fee: 3.99,
  },
  {
    id: "dm-1004",
    name: "DHL",
    icon: Dhl,
    fee: 2.99,
  }
];

interface PaymentDeliveryProps {
  handleStepBackwards: () => void;
  handleStepForward: () => void;
}

export const PaymentDelivery = ({ handleStepBackwards, handleStepForward }: PaymentDeliveryProps) => {
  const { cart, totalPriceCalculation } = useCartStore();

  const [query, setQuery] = useQueryParams({
    paymentMethod: withDefault(StringParam, ""),
    deliveryMethod: withDefault(StringParam, ""),
  });

  const lightThemeSelectors = `hover:cursor-pointer hover:bg-violet-100 border border-transparent has-[:checked]:bg-violet-200 
    has-[:checked]:border has-[:checked]:border-violet-300 hover:bg-violet-50 bg-stone-100 rounded-md`;

  const darkThemeSelectors = `hover:cursor-pointer hover:bg-neutral-600/[.9] border border-transparent has-[:checked]:bg-violet-500/[.5] 
    has-[:checked]:border has-[:checked]:border-violet-500 hover:bg-violet-50 bg-neutral-700 rounded-md`;

  const computedColorScheme = useComputedColorScheme();

  const getAdditionalFeeValue = (
    paymentMethods.find((p) => p.name === query.paymentMethod)?.fee === undefined
      || deliveryMethods.find((p) => p.name === query.deliveryMethod)?.fee === 0
      ? "Free"
      : currencyFormatter.format(paymentMethods.find((p) => p.name === query.paymentMethod)?.fee as number)
  );

  const getDeliveryFeeValue = (
    deliveryMethods.find((p) => p.name === query.deliveryMethod)?.fee === undefined
      || deliveryMethods.find((p) => p.name === query.deliveryMethod)?.fee === 0
      ? "Free"
      : currencyFormatter.format(deliveryMethods.find((p) => p.name === query.deliveryMethod)?.fee as number)
  );



  const noVatCalculation = () => {
    return currencyFormatter.format((totalPriceCalculation() / 121) * 100);
  };

  console.log(getAdditionalFeeValue);

  return (
    <Paper
      className="border-t-4 border-violet-500"
      shadow="xl"
      px={90}
      py={40}
      mt={20}
    >
      {/*Main content container */}
      <Flex direction="row" align="end" >
        {/*Left section with payment, delivery details */}
        <Flex direction="column" w="100%" flex="70%">
          <Paper w="100%" shadow="sm" withBorder p="xs">
            <Title order={5} p={5}>Delivery Method</Title>
            <Radio.Group onChange={(value) => setQuery({ deliveryMethod: value })} value={query.deliveryMethod} >
              {deliveryMethods.map((item) => (
                <Flex
                  component="label"
                  key={item.name}
                  id={item.id}
                  h={50}
                  p={5}
                  w="100%"
                  align="center"
                  direction="row"
                  className={computedColorScheme === 'light' ? lightThemeSelectors : darkThemeSelectors}
                  my={5}
                >
                  <Group flex="15%" justify="space-evenly" >
                    <Radio value={item.name} color={computedColorScheme === "light" ? "violet" : "gray.8"}></Radio>
                    <Box w={40}>
                      <Image src={item.icon} alt={item.name} w={40} fit="contain" />
                    </Box>
                  </Group>
                  <Text flex="15%" size="sm">{item.name}</Text>
                  <Text flex="50%" c="btn-violet" ta="right" fw={500}>
                    {item.fee === 0
                      ? "Free"
                      : currencyFormatter.format(Number(item.fee))
                    }
                  </Text>
                  <Text flex="2%"></Text>
                </Flex>
              ))}
            </Radio.Group>
          </Paper>
          <Paper w="100%" shadow="sm" withBorder p="xs">
            <Title order={5} p={5}>Payment Method</Title>
            <Radio.Group onChange={(value) => setQuery({ paymentMethod: value })} value={query.paymentMethod} >
              {paymentMethods.map((item) => (
                <Flex
                  component="label"
                  key={item.name}
                  id={item.id}
                  h={50}
                  p={5}
                  w="100%"
                  align="center"
                  direction="row"
                  className={computedColorScheme === 'light' ? lightThemeSelectors : darkThemeSelectors}
                  my={5}
                >
                  <Group flex="15%" justify="space-evenly" >
                    <Radio value={item.name} color={computedColorScheme === "light" ? "violet" : "gray.8"}></Radio>
                    <Group w={40}>
                      <Image src={item.icon} alt={item.name} w={40} fit="contain" />
                    </Group>
                  </Group>
                  <Text flex="15%" size="sm">{item.name}</Text>
                  <Text flex="50%" c="btn-violet" ta="right" fw={500}>
                    {item.fee === 0
                      ? "Free"
                      : currencyFormatter.format(Number(item.fee))
                    }
                  </Text>
                  <Text flex="2%"></Text>
                </Flex>
              ))}
            </Radio.Group>
          </Paper>
          <Flex align="center" justify="space-between">
            <Button
              maw={230}
              variant="subtle"
              onClick={handleStepBackwards}
            >
              <div>
                <IconCaretLeftFilled size={15} />
              </div>
              Back
            </Button>
            <Button
              w={210}
              disabled={(query.deliveryMethod && query.paymentMethod) === "" || cart.length === 0}
              onClick={handleStepForward}
            >
              Continue
            </Button>
          </Flex>
        </Flex>
        {/*Right section with order summary */}
        <Flex flex="40%" direction="column" >
          <Flex direction="column" mb={10} h={690}>
            <ScrollArea h="100%" offsetScrollbars scrollbarSize={5} px={15}>
              {cart.map((product) => (
                <SummaryCartItem
                  key={product.id}
                  cartProduct={product}
                />
              ))}
            </ScrollArea>
          </Flex>
          {
            <Flex className="border-t-2 border-gray-300" pt={10}>
              <Flex direction="row" w="100%" justify="space-between" align="center">
                <Text size="sm" c="dimmed">Additional fee for payment: </Text>
                <Text size="sm" fw={700}>{getAdditionalFeeValue}</Text>
              </Flex>
            </Flex>
          }
          {
            <Flex>
              {query.deliveryMethod.includes("free")
                ? <Text size="sm" c="dimmed">Free delivery</Text>
                : <Flex direction="row" w="100%" justify="space-between" align="center">
                  <Text size="sm" c="dimmed">Delivery fee: </Text>
                  <Text size="sm" fw={700}>{getDeliveryFeeValue}</Text>
                </Flex>
              }
            </Flex>
          }

          <Flex direction="column" className="border-t-2 border-gray-300" justify="center" h={90}>
            <Flex direction="row" justify="space-between" align="center" >
              <Text size="sm" c="dimmed"> To be paid without VAT:</Text>
              <Text size="sm" c="dimmed">
                {noVatCalculation()}
              </Text>
            </Flex>
            <Flex direction="row" align="center" justify="space-between">
              <Text fw={700}> To be paid with VAT:</Text>
              <Text
                size="lg"
                fw={800}
                variant="gradient"
                gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
              >
                {currencyFormatter.format(totalPriceCalculation())}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex >
    </Paper >

  );
};
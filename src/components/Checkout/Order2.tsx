import { Button, Card, Flex, Group, NumberFormatter, Paper, Radio, Text, Image, Box, ScrollArea } from "@mantine/core"
import { useCart } from "store/shopStore"
import { IconCaretLeftFilled } from "@tabler/icons-react"
import { SumCartItem } from "components/Cart/SummaryCartItem"
import ApplePay from "../../assets/apple-pay-svgrepo-com.svg"
import Bank from "../../assets/bank-svgrepo-com.svg"
import Bitcoin from "../../assets/bitcoin-svgrepo-com.svg"
import Cash from "../../assets/cash-money-svgrepo-com.svg"
import GooglePay from "../../assets/google-pay-svgrepo-com.svg"
import PayPal from "../../assets/paypal-3-svgrepo-com.svg"
import Stripe from "../../assets/stripe-svgrepo-com.svg"
import Visa from "../../assets/visa-svgrepo-com.svg"
import { withDefault, StringParam, useQueryParam } from "use-query-params"

const paymentMethods = [
  {
    id: "1",
    name: "Visa",
    icon: Visa,
    fee: "free",
  },
  {
    id: "2",
    name: "PayPal",
    icon: PayPal,
    fee: "free"
  },
  {
    id: "3",
    name: "Google Pay",
    icon: GooglePay,
    fee: "free"
  },
  {
    id: "4",
    name: "Apple Pay",
    icon: ApplePay,
    fee: "free"
  },
  {
    id: "5",
    name: "Bank Transfer",
    icon: Bank,
    fee: "1.49 $"
  },
  {
    id: "6",
    name: "Cash",
    icon: Cash,
    fee: "free"
  },
  {
    id: "7",
    name: "Bitcoin",
    icon: Bitcoin,
    fee: "free"
  },
  {
    id: "8",
    name: "Stripe",
    icon: Stripe,
    fee: "1.99 $"
  }
]

interface OrderTwoProps {
  handleStepBackwards: () => void;
  handleStepForward: () => void;
}

export const OrderTwo = ({ handleStepBackwards, handleStepForward }: OrderTwoProps) => {
  const { cart, totalPriceCalculation: totalPriceCalculation } = useCart()

  const [query, setQuery] = useQueryParam(
    "paymentMethod", withDefault(StringParam, ""),
  )

  const noVatCalculation = () => {
    return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format((totalPriceCalculation() / 121) * 100)
  }

  return (
    <Card
      className="border-t-4 border-indigo-500 "
      shadow="xl"
      px={90}
      py={40}
      mt={20}
    >
      {/*Main content container */}
      <Flex direction="row" gap={40} align="end" >
        {/*Left section with payment, delivery details */}
        <Flex direction="column" gap={25} w="100%" flex="70%">
          <Paper w="100%" shadow="sm" withBorder p="xs">
            <Radio.Group onChange={setQuery} value={query} >
              {paymentMethods.map((item) => (
                <Flex
                  component="label"
                  key={item.name}
                  id={item.id}
                  p="xs"
                  w="100%"
                  align="center"
                  direction="row"
                  className="hover:cursor-pointer has-[:checked]:bg-violet-100 has-[:checked]:border has-[:checked]:border-violet-300 rounded-md hover:bg-violet-50 bg-stone-100"
                  my={5}
                >
                  <Group flex="12%" justify="space-evenly" >
                    <Radio value={item.name + "-" + item.fee} color="violet" ></Radio>
                    <Box w={48}>
                      <Image src={item.icon} alt={item.name} w={45} h="100%" fit="contain" />
                    </Box>
                  </Group>
                  <Text flex="75%" c="btn-violet" ta="right" fw={500}>{item.fee}</Text>
                  <Text flex="0%"></Text>
                </Flex>
              ))}
            </Radio.Group>
          </Paper>
          <Flex align="center" justify="space-between">
            <Button
              radius="xl"
              size="lg"
              maw={230}
              variant="outline"
              gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
              onClick={handleStepBackwards}
            >
              <div>
                <IconCaretLeftFilled size={15} />
              </div>
              Back
            </Button>
            <Button
              radius="xl"
              size="lg"
              w={210}
              variant="gradient"
              gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
              disabled={query === "" || cart.length === 0}
              onClick={handleStepForward}
            >
              Continue
            </Button>
          </Flex>
        </Flex>

        {/*Right section with order summary */}
        <Flex flex="40%" direction="column" gap={10} >
          <Flex direction="column" gap={10} mb={10} h={510}>
            <ScrollArea h="100%" offsetScrollbars scrollbarSize={6} mx={10}>
              {cart.map((product) => (
                <SumCartItem
                  key={product.id}
                  cartProduct={product}
                />
              ))}
            </ScrollArea>
          </Flex>
          {
            query === ""
              ? ""
              : <Flex className="border-t-2 border-gray-300" pt={10}>
                {query.includes("free")
                  ? <Text size="sm" c="dimmed">No additional fee</Text>
                  : <Flex direction="row" w="100%" justify="space-between" align="center">
                    <Text size="sm" c="dimmed">Additional fee: </Text>
                    <Text size="sm" fw={700}>{query.split("-")[1]}</Text>
                  </Flex>
                }
              </Flex>
          }

          <Flex direction="column" className="border-t-2 border-gray-300" justify="center" h={90}>
            <Flex direction="row" gap={30} justify="space-between" align="center" >
              <Text size="sm" c="dimmed"> To be paid without VAT:</Text>
              <Text size="sm" c="dimmed">
                <NumberFormatter prefix="$ " value={noVatCalculation()} />
              </Text>
            </Flex>
            <Flex direction="row" gap={30} align="center" justify="space-between">
              <Text fw={700}> To be paid with VAT:</Text>
              <Text
                size="xl"
                fw={800}
                variant="gradient"
                gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
              >
                <NumberFormatter prefix="$ " value={totalPriceCalculation()} decimalScale={2} />
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card >
  )
}
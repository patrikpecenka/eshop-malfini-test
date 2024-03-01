import { Button, Card, Flex, Group, NumberFormatter, Paper, Radio, Text, Image, Box } from "@mantine/core"
import { useCart } from "store/shopStore"
import { IconCaretLeftFilled } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { OrderThreeItem } from "components/Cart/OrderThreeItem"
import { PaymentMethods } from "constants/PaymentMethods"
import { PaymentItemProps } from "lib/props/types"

export const OrderTwo = () => {
  const { cart, totalPrice } = useCart()
  const navigate = useNavigate()
  const paymentMethods: PaymentItemProps[] = PaymentMethods()

  return (
    <Card
      className="border-t-4 border-indigo-500 "
      shadow="xl"
      p={70}
      h="100%"
      m={20}
    >
      <Flex direction="column" gap={10}>

      </Flex>
      {/*Main content container */}
      <Flex direction="row" gap={40} align="end">
        {/*Left section with payment, delivery details */}
        <Flex direction="column" gap={25} w="100%" flex={2} >
          <Paper w="100%" shadow="sm">
            <Radio.Group >
              {paymentMethods.map((item) => (
                <Flex key={item.name} w="100%" align="center" my={10} direction="row" mt={15} className="hover:cursor-pointer hover:bg-violet-100 " p={5}>
                  <Group flex="12%" justify="space-evenly">
                    <Radio value={item.name}></Radio>
                    <Box w={48}>
                      <Image src={item.icon} alt={item.name} w={45} h="100%" fit="contain" />
                    </Box>
                  </Group>
                  <Text flex="68%" c="green.8" ta="right" fw={500}>{item.fee}</Text>
                  <Text flex="20%"></Text>

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
              onClick={() => navigate("/order1")}
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
              disabled
            >
              Continue
            </Button>
          </Flex>
        </Flex>

        {/*Right section with order summary */}
        <Flex flex={1} direction="column" gap={10}>
          <Flex direction="column" gap={10} mb={10}>
            {cart.map((item, i) => (
              <OrderThreeItem
                key={i}
                id={item.id}
                image={item.image}
                title={item.title}
                amount={item.amount}
                totalPrice={item.totalPrice}
              />
            ))}
          </Flex>

          <Flex direction="column" className="border-t-2 border-gray-300" justify="center" h={90}>
            <Flex direction="row" gap={30} justify="space-between" align="center" >
              <Text size="sm" c="dimmed"> To be paid without VAT:</Text>
              <Text size="sm" c="dimmed">
                <NumberFormatter prefix="$ " value={(totalPrice() - (totalPrice() / 115) * 21).toFixed(2)} />
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
                <NumberFormatter suffix=" $" value={totalPrice()} decimalScale={2} />
              </Text>
            </Flex>
          </Flex>

        </Flex>
      </Flex>
    </Card >
  )
}
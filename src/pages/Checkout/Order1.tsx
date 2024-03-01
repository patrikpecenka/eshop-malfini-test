import { Button, Card, Flex, NumberFormatter, Text } from "@mantine/core"
import { CheckoutItem } from "components/Cart/OrderOneItem"
import { useCart } from "store/shopStore"
import { IconCaretLeftFilled } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

export const OrderOne = () => {
  const { cart, totalPrice } = useCart()
  const navigate = useNavigate()

  return (
    <Card
      className="border-t-4 border-indigo-500 "
      shadow="xl"
      p={70}
      h="100%"
      m={20}
    >
      <Flex direction="column" gap={10}>
        {cart.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            amount={item.amount}
            totalPrice={item.totalPrice}
          />
        ))}
      </Flex>
      <Flex direction="column" mt={30} gap={10} w="100%" >
        <Flex direction="row" gap={30} justify="end" align="center">
          <Text size="sm" > Total excl. VAT:</Text>
          <Text>
            <NumberFormatter prefix="$ " value={(totalPrice() - (totalPrice() / 115) * 21).toFixed(2)} />
          </Text>
        </Flex>
        <Flex direction="row" gap={30} align="center" justify="end">
          <Text fw={700}> To Pay:</Text>
          <Text
            size="xl"
            fw={800}
            variant="gradient"
            gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
          >
            <NumberFormatter suffix=" $" value={totalPrice()} decimalScale={2} />
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Button
            radius="xl"
            size="lg"
            maw={230}
            variant="outline"
            gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
            onClick={() => navigate("/products")}
          >
            <div>
              <IconCaretLeftFilled size={15} />
            </div>
            Continue shopping
          </Button>
          <Button
            radius="xl"
            size="lg"
            w={210}
            variant="gradient"
            gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
            onClick={() => navigate("/order2")}
          >
            Continue
          </Button>
        </Flex>
      </Flex>
    </Card >
  )
}
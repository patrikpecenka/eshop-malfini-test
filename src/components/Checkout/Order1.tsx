import { Button, Card, Flex, NumberFormatter, Text } from "@mantine/core"
import { CheckoutItem } from "components/Cart/CheckoutItem"
import { useCart } from "store/shopStore"
import { IconCaretLeftFilled } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

interface OrderOneProps {
  handleStepForward: () => void
}

export const OrderOne = ({ handleStepForward }: OrderOneProps) => {
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
        {cart.map((product) => (
          <CheckoutItem
            key={product.id}
            checkoutProduct={product}
          />
        ))}
      </Flex>
      <Flex direction="column" mt={30} gap={10} w="100%" >
        <Flex direction="row" gap={30} justify="end" align="center">
          <Text size="sm" > Total excl. VAT:</Text>
          <Text>
            <NumberFormatter prefix="$ " value={Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format((totalPrice() / 121) * 100)} />
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
            <NumberFormatter prefix="$ " value={totalPrice()} decimalScale={2} />
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
            onClick={handleStepForward}
          >
            Continue
          </Button>
        </Flex>
      </Flex>
    </Card >
  )
}
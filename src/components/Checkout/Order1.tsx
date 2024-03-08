import { Button, Card, Flex, NumberFormatter, Text } from "@mantine/core"
import { CheckoutItem } from "components/Cart/CheckoutItem"
import { useCart } from "store/shopStore"
import { IconCaretLeftFilled } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { EmptyCart } from "components/EmptyCart/EmptyCart"

interface OrderOneProps {
  handleStepForward: () => void
}

export const OrderOne = ({ handleStepForward }: OrderOneProps) => {
  const { cart, totalPriceCalculation: totalPriceCalculation } = useCart()
  const navigate = useNavigate()

  const noVatCalculation = () => {
    return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format((totalPriceCalculation() / 121) * 100)
  }

  return (
    <Card
      className="border-t-4 border-indigo-500 "
      shadow="xl"
      p={90}
      h="100%"
      mt={20}
    >
      <Flex direction="column" gap={10}>

        {cart.length === 0
          ? <EmptyCart />
          : cart.map((product) => (
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
            <NumberFormatter prefix="$ " value={noVatCalculation()} />
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
            <NumberFormatter prefix="$ " value={totalPriceCalculation()} decimalScale={2} />
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
            disabled={cart.length === 0}
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
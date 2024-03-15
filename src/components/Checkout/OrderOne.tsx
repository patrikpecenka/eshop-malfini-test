import { Button, Card, Flex, Text, Title } from "@mantine/core"
import { CheckoutItem } from "components/Cart/CheckoutItem"
import { useCart } from "store/shopStore"
import { IconCaretLeftFilled } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { EmptyCart } from "components/EmptyCart/EmptyCart"
import { currencyFormater } from "utils/number/currencyFormater"

interface OrderOneProps {
  handleStepForward: () => void
}

export const OrderOne = ({ handleStepForward }: OrderOneProps) => {
  const { cart, totalPriceCalculation } = useCart()
  const navigate = useNavigate()

  const noVatCalculation = () => {
    return currencyFormater.format((totalPriceCalculation() / 121) * 100)
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
            {noVatCalculation()}
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
            <Title fw={900} order={4}>
              {currencyFormater.format(totalPriceCalculation())}
            </Title>
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
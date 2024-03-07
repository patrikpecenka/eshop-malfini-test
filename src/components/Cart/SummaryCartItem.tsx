import { Flex, Image, Text, Card, NumberFormatter, FlexProps, Box } from "@mantine/core"
import { CartProps } from "./CartItem"
import { Link } from "react-router-dom"


interface SumCartItemsProps extends FlexProps {
  cartProduct: CartProps
}

export const SumCartItem = ({ cartProduct, ...rest }: SumCartItemsProps) => {

  return (
    <Flex gap={15} align="center" {...rest} my={8} mx={10}>
      <Card shadow="sm" withBorder w={80} h={80} >
        <Image
          src={cartProduct.image}
          fit="contain"
          h="100%"
        />
      </Card>
      <Box w="100%" flex={1} >
        <Link to={`/products/${cartProduct.id}`}>
          <Text size="xs" c="dimmed" className="hover:underline">
            {cartProduct.amount}x {cartProduct.title}
          </Text>
        </Link>
      </Box>
      <Text size="sm" className="text-right">
        <NumberFormatter prefix="$" value={Intl.NumberFormat("en-US").format(cartProduct.totalPrice)} decimalScale={2} />
      </Text>
    </Flex>
  )
}
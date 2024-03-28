import { Flex, Image, Text, Card, FlexProps, Box } from "@mantine/core";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import { currencyFormatter } from "utils/number/currencyFormatter";


interface SummaryCartItemProps extends FlexProps {
  cartProduct: CartItem;
}

export const SummaryCartItem = ({ cartProduct, ...rest }: SummaryCartItemProps) => {

  return (
    <Flex align="center" {...rest} my={8} mx={10}>
      <Card w={80} h={80} >
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
        {currencyFormatter.format(cartProduct.totalPrice)}
      </Text>
    </Flex>
  );
};
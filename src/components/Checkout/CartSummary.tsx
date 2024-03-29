import { Button, Flex, Paper, Text } from "@mantine/core";
import { CartItem } from "components/Cart/CartItem";
import { useCartStore } from "store/cart.store";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { EmptyCart } from "components/EmptyCart/EmptyCart";
import { currencyFormatter } from "utils/number/currencyFormatter";

interface CartSummaryProps {
  handleStepForward: () => void;
}

export const CartSummary = ({ handleStepForward }: CartSummaryProps) => {
  const { cart, totalPriceCalculation } = useCartStore();
  const navigate = useNavigate();

  const noVatCalculation = () => {
    return currencyFormatter.format((totalPriceCalculation() / 121) * 100);
  };

  return (
    <Paper
      className="border-t-4 border-violet-500"
      shadow="xl"
      p={90}
      h="100%"
      mt={20}
    >
      <Flex direction="column">
        {cart.length === 0
          ? <EmptyCart />
          : cart.map((product) => (
            <CartItem
              key={product.id}
              cartProduct={product}
              disableAnchor={false}
              textBoxWidth={500}
              cardHeight={80}
            />
          ))}
      </Flex>
      <Flex direction="column" mt={30} w="100%" >
        <Flex direction="row" justify="end" align="center">
          <Text size="sm" > Total excl. VAT:</Text>
          <Text>
            {noVatCalculation()}
          </Text>
        </Flex>
        <Flex direction="row" align="center" justify="end">
          <Text fw={700}> To Pay:</Text>
          <Text
            size="xl"
            fw={800}
            variant="gradient"
            gradient={{ from: 'violet', to: 'indigo', deg: 25 }}
          >
            {currencyFormatter.format(totalPriceCalculation())}
          </Text>
        </Flex>
        <Flex align="center" justify="space-between">
          <Button
            maw={230}
            onClick={() => navigate("/products")}
            variant="subtle"
          >
            <div>
              <IconCaretLeftFilled size={15} />
            </div>
            Continue shopping
          </Button>
          <Button
            disabled={cart.length === 0}
            w={210}
            onClick={handleStepForward}
          >
            Continue
          </Button>
        </Flex>
      </Flex>
    </Paper >

  );
};
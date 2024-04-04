import { Button, Flex, Paper, Text } from "@mantine/core";
import { CartProductItem } from "@components/CartItem";
import { useCartStore } from "@store/cart.store";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { EmptyCart } from "@components/EmptyCart";
import { currencyFormatter } from "@utils/number/currencyFormatter";
import { useMemo } from "react";

interface CartSummaryProps {
  handleStepForward: () => void;
}

export const CartSummary = ({ handleStepForward }: CartSummaryProps) => {
  const { cart, totalPriceCalculation } = useCartStore();
  const navigate = useNavigate();

  const noVatCalculation = useMemo(
    () => currencyFormatter.format((totalPriceCalculation() / 121) * 100),
    [totalPriceCalculation]
  );

  return (
    <Paper
      className="border-t-4 border-[var(--mantine-primary-color-filled)]"
      shadow="xl"
      p={90}
      h="100%"
      mt={20}
    >
      <Flex direction="column">
        {cart.length === 0
          ? <EmptyCart />
          : cart.map((product) => (
            <CartProductItem
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
            {noVatCalculation}
          </Text>
        </Flex>
        <Flex direction="row" align="center" justify="end">
          <Text fw={700}> To Pay:</Text>
          <Text
            size="xl"
            fw={800}
            variant="gradient"
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
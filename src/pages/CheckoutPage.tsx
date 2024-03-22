import { Paper, Stepper } from "@mantine/core";
import { CartSummary } from "../components/Checkout/CartSummary";
import { PaymentDelivery } from "../components/Checkout/PaymentDelivery";
import { Address } from "../components/Checkout/Address";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { useCartStore } from "store/cart.store";
import { useEffect } from "react";
import { IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CompletedPage } from "components/Checkout/CompletedPage";

export const CheckoutPage = () => {
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const [checkoutStep, setCheckoutStep] = useQueryParam(
    "checkoutStep", withDefault(NumberParam, 0),
  );

  useEffect(() => {
    cart.length === 0 && checkoutStep < 3
      ? navigate("/checkout?checkoutStep=0")
      : null;
  }, [cart.length, checkoutStep]);

  return (
    <Paper
      h="100%"
      mx="10rem"
      mt={10}
      p="xl"
    >
      <Stepper active={checkoutStep} color="indigo" size="sm" onStepClick={setCheckoutStep} allowNextStepsSelect={cart.length === 0 ? false : true}>
        <Stepper.Step label="Cart" >
          <CartSummary handleStepForward={() => setCheckoutStep(checkoutStep + 1)} />
        </Stepper.Step>
        <Stepper.Step
          label="Payment Delivery"
          disabled={cart.length === 0}
          icon={cart.length === 0 ? <IconLock /> : undefined}
        >
          <PaymentDelivery
            handleStepBackwards={() => setCheckoutStep(checkoutStep - 1)}
            handleStepForward={() => setCheckoutStep(checkoutStep + 1)}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Address"
          icon={cart.length === 0 ? <IconLock /> : undefined}
          allowStepSelect={false}
        >
          <Address handleStepCompleted={() => setCheckoutStep(3)} />
        </Stepper.Step>
        <Stepper.Completed >
          <CompletedPage />
        </Stepper.Completed>
      </Stepper>
    </Paper>

  );
};
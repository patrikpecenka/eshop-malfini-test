import { Paper, Stepper } from "@mantine/core";
import { CartSummary } from "./components/CartSummary";
import { PaymentDelivery } from "./components/PaymentDelivery";
import { AddressAndCompletion } from "./components/AddressAndCompletion";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import { useCartStore } from "@store/cart.store";
import { IconLock } from "@tabler/icons-react";
import { Navigate } from "react-router-dom";
import { CompletedPage } from "@pages/CheckoutPage/components/CompletedPage";

export const CheckoutPage = () => {
  const { cart } = useCartStore();

  const [checkoutStep, setCheckoutStep] = useQueryParam(
    "checkoutStep", withDefault(NumberParam, 0),
  );

  return (
    <Paper
      h="100%"
      mx="10rem"
      mt={10}
      p="xl"
    >
      {
        cart.length === 0 && checkoutStep < 3
          ? <Navigate to="/products" />
          : <Stepper active={checkoutStep} size="sm" onStepClick={setCheckoutStep} allowNextStepsSelect={cart.length === 0 ? false : true}>
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
              <AddressAndCompletion handleStepCompleted={() => setCheckoutStep(3)} />
            </Stepper.Step>
            <Stepper.Completed >
              <CompletedPage />
            </Stepper.Completed>
          </Stepper>
      }

    </Paper>

  );
};
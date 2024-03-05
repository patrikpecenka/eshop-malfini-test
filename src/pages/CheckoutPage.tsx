import { Card, Stepper, Text } from "@mantine/core"
import { OrderOne } from "../components/Checkout/Order1"
import { OrderTwo } from "../components/Checkout/Order2"
import { OrderThree } from "../components/Checkout/Order3"
import { NumberParam, useQueryParam, withDefault } from "use-query-params"



export const CheckoutPage = () => {
  const [query, setQuery] = useQueryParam(
    "checkoutStep", withDefault(NumberParam, 0),
  );

  return (
    <Card
      h="100%"
      m={20}
    >
      <Stepper active={query} variant="gradient" size="md" onStepClick={setQuery}>
        <Stepper.Step label="Cart" >
          <OrderOne handleStepForward={() => setQuery(query + 1)} />
        </Stepper.Step>
        <Stepper.Step label="Payment Delivery">
          <OrderTwo
            handleStepBackwards={() => setQuery(query - 1)}
            handleStepForward={() => setQuery(query + 1)}
          />
        </Stepper.Step>
        <Stepper.Step label="Address">
          <OrderThree />
        </Stepper.Step>
        <Stepper.Completed>
          <Text>Thank you</Text>
        </Stepper.Completed>
      </Stepper>
    </Card>
  )
}
import { Button, Card, Stepper, Text } from "@mantine/core"
import { OrderOne } from "../components/Checkout/OrderOne"
import { OrderTwo } from "../components/Checkout/OrderTwo"
import { OrderThree } from "../components/Checkout/OrderThree"
import { NumberParam, useQueryParam, withDefault } from "use-query-params"
import { useCart, useOrderCart } from "store/shopStore"
import { useEffect } from "react"
import { IconLock } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

export const CheckoutPage = () => {
  const { cart } = useCart()
  const { userData } = useOrderCart()
  const navigate = useNavigate()

  const [checkoutStep, setCheckoutStep] = useQueryParam(
    "checkoutStep", withDefault(NumberParam, 0),
  );

  // useEffect(() => {
  //   cart.length === 0 && checkoutStep >= 1
  //     ? navigate("/checkout?checkoutStep=0")
  //     : null
  // }, [cart.length, checkoutStep])

  return (
    <Card
      h="100%"
      mx="10rem"
      mt={10}
    >
      <Stepper active={checkoutStep} color="indigo" size="sm" onStepClick={setCheckoutStep} allowNextStepsSelect={cart.length === 0 ? false : true}>
        <Stepper.Step label="Cart" >
          <OrderOne handleStepForward={() => setCheckoutStep(checkoutStep + 1)} />
        </Stepper.Step>
        <Stepper.Step
          label="Payment Delivery"
          disabled={cart.length === 0}
          icon={cart.length === 0 ? <IconLock /> : undefined}
        >
          <OrderTwo
            handleStepBackwards={() => setCheckoutStep(checkoutStep - 1)}
            handleStepForward={() => setCheckoutStep(checkoutStep + 1)}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Address"
          icon={cart.length === 0 ? <IconLock /> : undefined}
          allowStepSelect={false}
        >
          <OrderThree handleStepCompleted={() => setCheckoutStep(3)} />
        </Stepper.Step>
        <Stepper.Completed >
          <Text>Here is ur invoice</Text>
          {/* <PDFDownloadLink document={<PdfFile />} fileName={`${userData.map((item) => item.id)[0]}.pdf`}>
            {({ loading }) =>
              loading
                ? <Button> Loading document.... </Button>
                : <Button>Download invoice</Button>
            } 
           </PDFDownloadLink> */}
        </Stepper.Completed>
      </Stepper>
    </Card>
  )
}
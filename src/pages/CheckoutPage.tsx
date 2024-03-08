import { Button, Card, Stepper, Text } from "@mantine/core"
import { OrderOne } from "../components/Checkout/Order1"
import { OrderTwo } from "../components/Checkout/Order2"
import { OrderThree } from "../components/Checkout/Order3"
import { NumberParam, useQueryParam, withDefault } from "use-query-params"
import { useCart, useOrderCart } from "store/shopStore"
import { useEffect } from "react"
import { IconLock } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { PdfFile } from "services/PdfFile"
import { PDFDownloadLink } from "@react-pdf/renderer"

export const CheckoutPage = () => {
  const { cart } = useCart()
  const { userData } = useOrderCart()
  const navigate = useNavigate()

  const [query, setQuery] = useQueryParam(
    "checkoutStep", withDefault(NumberParam, 0),
  );

  useEffect(() => {
    cart.length === 0 && !3
      ? navigate("/checkout?checkoutStep=0")
      : null
  }, [cart.length])

  return (
    <Card
      h="100%"
      mx="10rem"
      mt={10}
    >
      <Stepper active={query} variant="gradient" size="sm" onStepClick={setQuery} allowNextStepsSelect={cart.length === 0 ? false : true}>
        <Stepper.Step label="Cart" >
          <OrderOne handleStepForward={() => setQuery(query + 1)} />
        </Stepper.Step>
        <Stepper.Step label="Payment Delivery" disabled={cart.length === 0} icon={cart.length === 0 ? <IconLock /> : undefined}>
          <OrderTwo
            handleStepBackwards={() => setQuery(query - 1)}
            handleStepForward={() => setQuery(query + 1)}
          />
        </Stepper.Step>
        <Stepper.Step label="Address" icon={cart.length === 0 ? <IconLock /> : undefined}>
          <OrderThree handleStepCompleted={() => setQuery(3)} />
        </Stepper.Step>
        <Stepper.Completed >
          <Text>Thank you</Text>
          <PDFDownloadLink document={<PdfFile />} fileName={`${userData.map((item) => item.id)[0]}.pdf`}>
            {({ loading }) =>
              loading
                ? <Button> Loading document.... </Button>
                : <Button>Download invoice</Button>
            }
          </PDFDownloadLink>
        </Stepper.Completed>
      </Stepper>
    </Card>
  )
}
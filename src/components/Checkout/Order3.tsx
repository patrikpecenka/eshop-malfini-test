import { Button, Card, Flex, NumberInput, Paper, Select, TextInput, Title, Text } from "@mantine/core"
import { useForm, isEmail, isNotEmpty, hasLength } from "@mantine/form"
import { useQuery } from "@tanstack/react-query"
import { CountriesDto } from "lib/dto/types"
import fetcher from "lib/fetcher"
import { useState } from "react"
import { useCart, useOrderCart } from "store/shopStore"
import { IconLock, IconLockOpen, IconCubeSend } from "@tabler/icons-react"
import { useQueryParam, withDefault, StringParam } from "use-query-params"

interface OrderThreeProps {
  handleStepCompleted: () => void
}

export const OrderThree = ({ handleStepCompleted }: OrderThreeProps) => {
  const createNewOrder = useOrderCart((state) => state.createUser)
  const { cart, totalPriceCalculation: totalPriceCalculation, clearCart, getSumCartItems } = useCart()

  //USE STATES
  const [loading, setLoading] = useState(false)
  const [country] = useState<String | null>("")

  //QUERY PARAMS
  const [query] = useQueryParam(
    "paymentMethod", withDefault(StringParam, ""),
  )

  let discount = 13.89
  //CALCULATIONS
  const finalTotalPrice = () => {
    const queryValue = query.includes("free")
      ? 0
      : parseFloat(query.split("-")[1].slice(0, -2))
    return Intl.NumberFormat("en-US").format((totalPriceCalculation() + queryValue) - discount)
  }
  const noVatCalculation = () => {
    return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format((totalPriceCalculation() / 121) * 100)
  }
  const vatCalculation = () => {
    return Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(totalPriceCalculation() - (totalPriceCalculation() / 1.21))
  }
  //END CALCULATIONS

  //DATA FETCHING FOR COUNTRY SELECTOR
  const { data, status } = useQuery({
    queryKey: ['countries'],
    queryFn: () => fetcher<CountriesDto>("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
  })

  //FORM VALIDATION
  const form = useForm({
    initialValues: {
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      city: "",
      stateProvince: "",
      country: null,
      zipCode: "",
      address: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      phoneNumber: isNotEmpty("Invalid phone number"),
      firstName: hasLength({ min: 2, max: 20 }, "Invalid first name"),
      lastName: hasLength({ min: 2, max: 40 }, "Invalid last name"),
      zipCode: (value) => (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value) ? null : "Invalid zip code"),
      address: isNotEmpty("Invalid address"),
      city: isNotEmpty("Invalid city"),
      country: isNotEmpty("Invalid country"),
      stateProvince: isNotEmpty("Invalid state")
    }
  })

  const handleCreateNewOrder = () => {
    createNewOrder({
      id: crypto.randomUUID(),
      userDetails: {
        ...form.values
      },
      totalPrice: totalPriceCalculation(),
      noVatPrice: 0,
      deliveryOption: "",
      deliveryPrice: 0,
      cart: cart
    })
    form.reset()
    form.clearFieldError("country")

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      handleStepCompleted()
      clearCart()
    }, 2000);
  }

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error</p>

  return (
    <Card
      className="justify-center border-t-4 border-indigo-500"
      shadow="xl"
      p="xl"
      h="70dvh"
      mt={20}
    >
      <form onSubmit={form.onSubmit(handleCreateNewOrder)}>
        <Flex w="100%" align="center" justify="center" direction="row">
          <Flex gap="xl" w="70%" justify="center" >
            <Paper
              flex={2}
              withBorder
              p={50}
              shadow="md"
              radius="md"
            >
              <Title order={3} mb={20}>
                Billing address
              </Title >
              <Flex direction="column" gap={20}>

                <Flex gap={20}>
                  <TextInput
                    flex={1}
                    label="Email address"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                  />
                  <TextInput
                    flex={1}
                    label="Phone number"
                    placeholder="123 456 789"
                    {...form.getInputProps("phoneNumber")}
                  />

                </Flex >
                <Flex justify="space-between" gap={20}>
                  <TextInput
                    flex={1}
                    label="First name"
                    placeholder="John"
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    flex={1}
                    label="Last name"
                    placeholder="Doe"
                    {...form.getInputProps("lastName")}
                  />
                </Flex>

                <Flex justify="space-between" gap={20}>
                  <Select
                    autoComplete="new-off"
                    flex={1}
                    label="Country"
                    searchable
                    value={country}
                    data={data?.countries}
                    placeholder="Spain"
                    nothingFoundMessage="Nothing found"
                    {...form.getInputProps("country")}
                  />
                  <TextInput
                    autoComplete="new-off"
                    flex={1}
                    label="State/Province"
                    placeholder=""
                    {...form.getInputProps("stateProvince")}
                  />
                  <NumberInput
                    clampBehavior="strict"
                    max={99999}
                    hideControls
                    flex={0.5}
                    label="Zip Code"
                    placeholder="28001"
                    {...form.getInputProps("zipCode")}
                  />
                </Flex>

                <Flex justify="space-between" gap={20}>
                  <TextInput
                    flex={1}
                    label="Address"
                    placeholder="123, Street name"
                    {...form.getInputProps("address")}
                  />
                  <TextInput
                    flex={1}
                    label="City"
                    placeholder="Madrid"
                    {...form.getInputProps("city")}
                  />
                </Flex>
              </Flex>
            </Paper>
            <Paper flex={1} withBorder shadow="md" radius="md" p={15} h="100%">
              <Flex direction="column" justify="space-between" >
                <Flex direction="column" gap={5} >
                  {
                    query.includes("free")
                      ? <Flex gap={5} c="violet.8" align="center">
                        <IconCubeSend size={22} />
                        <Text fw={700} size="sm">This Order Ships Free!</Text>
                      </Flex>
                      : null
                  }

                  <Flex justify="space-between" >
                    <Text>
                      {getSumCartItems() > 1 ? `(${getSumCartItems()}) items` : `(${getSumCartItems()}) item`}:
                    </Text>
                    <Text>
                      ${noVatCalculation()}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Shipping: </Text>
                    {
                      query.includes("free")
                        ? <Text fw={700} tt="uppercase">Free</Text>
                        : <Text>${query.split("-")[1].slice(0, -2)}</Text>
                    }
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Tax: </Text>
                    <Text>
                      ${vatCalculation()}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={20}>
                    <Text c="dimmed" size="xs">
                      Discount:
                    </Text>
                    <Text c="red" fw={700} size="xs">
                      -${discount}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" pt={10} mb={10} className="border-t-2 border-gray-300" >
                    <Title order={3}>
                      Total price:
                    </Title>
                    <Title order={3}>
                      ${finalTotalPrice()}
                    </Title>
                  </Flex>
                </Flex>
                <Button
                  loading={loading}
                  loaderProps={{ type: "oval", color: "white" }}
                  type="submit"
                  fullWidth
                  h={50}
                  variant="gradient"
                  leftSection={!form.isValid() ? <IconLock /> : <IconLockOpen />}
                  disabled={!form.isValid()}
                >
                  Submit Order
                </Button>
              </Flex>
            </Paper>
          </Flex>
        </Flex>
      </form>
    </Card >
  )
}
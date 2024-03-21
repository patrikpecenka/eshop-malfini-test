import { Button, Card, Flex, NumberInput, Paper, Select, TextInput, Title, Text } from "@mantine/core";
import { useForm, isEmail, isNotEmpty, hasLength } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { CountriesDto } from "lib/dto/types";
import fetcher from "lib/fetcher";
import { useMemo, useState } from "react";
import { useCartStore } from "store/cart.store";
import { useOrderStore } from "store/order.store";
import { IconCubeSend, IconLock, IconLockOpen } from "@tabler/icons-react";
import { withDefault, StringParam, useQueryParams } from "use-query-params";
import { currencyFormatter } from "utils/number/currencyFormatter";
import { deliveryMethods, paymentMethods } from "../Checkout/PaymentDelivery";

interface AddressProps {
  handleStepCompleted: () => void;
}

export const Address = ({ handleStepCompleted }: AddressProps) => {
  const createNewOrder = useOrderStore((state) => state.createOrder);
  const { cart, totalPriceCalculation, clearCart, getSumCartItems } = useCartStore();
  const { OrderDetailData: userData } = useOrderStore();

  //USE STATES
  const [loading, setLoading] = useState(false);
  //QUERY PARAMS
  const [query, setQuery] = useQueryParams({
    paymentMethod: withDefault(StringParam, ""),
    deliveryMethod: withDefault(StringParam, ""),
  });

  //FORM VALIDATION
  const form = useForm({
    initialValues: {
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      city: "",
      stateProvince: "" as string | null,
      country: "" as string | null,
      zipCode: "",
      address: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      phoneNumber: isNotEmpty("Invalid phone number"),
      firstName: hasLength({ min: 2, max: 20 }, "Invalid first name"),
      lastName: hasLength({ min: 2, max: 40 }, "Invalid last name"),
      zipCode: (value) => hasLength(5, "Invalid zip code")(value.toString()),
      address: isNotEmpty("Invalid address"),
      city: isNotEmpty("Invalid city"),
      country: isNotEmpty("Invalid country"),
    },
    onValuesChange(values, previous) {
      if (values.country !== previous.country) {
        form.setFieldValue("stateProvince", null);
      }
    },
  });

  //DATA FETCHING FOR COUNTRY SELECTOR
  const { data: countriesData, status: countriesStatus } = useQuery({
    queryKey: ['countries'],
    queryFn: () => fetcher<CountriesDto>("https://countriesnow.space/api/v0.1/countries/states")
  });

  const statesByCountry = useMemo(
    () =>
      (countriesData?.data ?? []).find((country) => country.iso3 === form.values.country),
    [form.values.country, countriesData?.data]
  );

  //VARIABLES
  const paymentValues = paymentMethods.find((p) => p.name === query.paymentMethod);
  const deliveryValues = deliveryMethods.find((p) => p.name === query.deliveryMethod);
  let discount = 13.89;
  const finalTotalPrice = (totalPriceCalculation() + (paymentValues?.fee ?? 0) + (deliveryValues?.fee ?? 0)) - discount;

  //CALCULATIONS
  const noVatCalculation = () => {
    return currencyFormatter.format((totalPriceCalculation() / 121) * 100);
  };
  const vatCalculation = () => {
    return currencyFormatter.format(totalPriceCalculation() - (totalPriceCalculation() / 1.21));
  };
  //END CALCULATIONS

  const handleCreateNewOrder = () => {
    form.reset();
    form.clearFieldError("country");
    setLoading(true);
    setTimeout(() => {
      createNewOrder({
        id: crypto.randomUUID(),
        orderId: userData.length === 0 ? 1000001 : userData[userData.length - 1].orderId + 1,
        userDetails: {
          ...form.values
        },
        paymentDetails: {
          subtotalPrice: (totalPriceCalculation() / 121) * 100,
          totalPrice: finalTotalPrice,
          noVatPrice: totalPriceCalculation() - (totalPriceCalculation() / 1.21),
          vatPrice: Number(vatCalculation()),
          discount: discount,
          paymentMethod: query.paymentMethod,
          paymentId: paymentValues?.id ?? "",
          deliveryMethod: query.deliveryMethod,
          deliveryId: deliveryValues?.id ?? "",
          dateOfOrder: new Date().toISOString(),
        },
        cart: cart
      }),
        setLoading(false),
        handleStepCompleted(),
        setQuery({
          paymentMethod: undefined,
          deliveryMethod: undefined
        });
      clearCart();

    }, 2000);
  };

  if (countriesStatus === 'pending') return <p>Loading...</p>;
  if (countriesStatus === 'error') return <p>Error</p>;

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
                    disabled={loading}
                    flex={1}
                    label="Email address"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                  />
                  <TextInput
                    disabled={loading}
                    flex={1}
                    label="Phone number"
                    placeholder="123 456 789"
                    {...form.getInputProps("phoneNumber")}
                  />

                </Flex >
                <Flex justify="space-between" gap={20}>
                  <TextInput
                    disabled={loading}
                    flex={1}
                    label="First name"
                    placeholder="John"
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    disabled={loading}
                    flex={1}
                    label="Last name"
                    placeholder="Doe"
                    {...form.getInputProps("lastName")}
                  />
                </Flex>

                <Flex justify="space-between" gap={20}>
                  <Select
                    disabled={loading}
                    autoComplete="new-off"
                    flex={1}
                    label="Country"
                    searchable
                    data={countriesData?.data.map((country) => ({ value: country.iso3, label: country.name }))}
                    placeholder="Spain"
                    nothingFoundMessage="Nothing found"
                    {...form.getInputProps("country")}
                  />
                  <Select
                    disabled={loading}
                    autoComplete="new-off"
                    flex={1}
                    label="State/Province"
                    searchable
                    data={statesByCountry?.states.map((state) => ({ value: state.state_code, label: state.name }))}
                    placeholder=""
                    nothingFoundMessage="Nothing found"
                    {...form.getInputProps("stateProvince")}
                  />
                  <NumberInput
                    disabled={loading}
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
                    disabled={loading}
                    flex={1}
                    label="Address"
                    placeholder="123, Street name"
                    {...form.getInputProps("address")}
                  />
                  <TextInput
                    disabled={loading}
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
                    (deliveryValues?.fee ?? 0) + (paymentValues?.fee ?? 0) === 0
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
                      {noVatCalculation()}
                    </Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Payment fee: </Text>
                    {paymentValues?.fee === 0
                      ? <Text fw={700} c="violet.8">Free</Text>
                      : currencyFormatter.format(paymentValues?.fee ?? 0)
                    }
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Delivery: </Text>
                    {deliveryValues?.fee === 0
                      ? <Text fw={700} c="violet.8">Free</Text>
                      : currencyFormatter.format(deliveryValues?.fee ?? 0)
                    }
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Tax: </Text>
                    <Text>
                      {vatCalculation()}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" mt={20}>
                    <Text c="dimmed" size="xs">
                      Discount:
                    </Text>
                    <Text c="green.7" fw={700} size="xs">
                      {currencyFormatter.format(discount)}
                    </Text>
                  </Flex>
                  <Flex justify="space-between" pt={10} mb={10} className="border-t-2 border-gray-300" >
                    <Title order={3}>
                      Total price:
                    </Title>
                    <Title order={3}>
                      {currencyFormatter.format(finalTotalPrice)}
                    </Title>
                  </Flex>
                </Flex>
                <Button
                  loading={loading}
                  loaderProps={{ type: "oval", color: "white" }}
                  type="submit"
                  fullWidth
                  h={50}
                  color={!form.isValid() ? "red" : ""}
                  variant={!form.isValid() && loading === false ? "light" : !form.isValid() && loading ? "gradient" : "gradient"}
                  leftSection={!form.isValid() ? <IconLock /> : <IconLockOpen />}
                // disabled={!form.isValid()}
                >
                  Submit Order
                </Button>
              </Flex>
            </Paper>
          </Flex>
        </Flex>
      </form>
    </Card >
  );
};
import { CloseButton, Flex, Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react";
import { OrderItem } from "components/OrderPanelItem"
import { useMemo } from "react";
import { useOrderCart } from "store/shopStore"
import { StringParam, useQueryParams, withDefault } from "use-query-params";


export const SidePanel = () => {
  const { userData } = useOrderCart()
  const [query, setQuery] = useQueryParams({
    order: withDefault(StringParam, "")
  })

  const filteredOrder = useMemo(
    () =>
    (
      (userData ?? []).filter((order) => (
        order.orderId && order.orderId.toString().includes(query.order))
      )),
    [userData, query.order]
  )

  return (
    <Flex direction="column" h="100%" m={20} gap={10}>
      <Input
        placeholder="Search..."
        value={query.order}
        onChange={(e) => setQuery({ order: e.currentTarget.value })}
        leftSection={<IconSearch size={20} />}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            onClick={() => setQuery({ order: undefined })}
          />
        }
      />

      {filteredOrder.map((order) => (
        <OrderItem
          key={order.id}
          OrderItem={order}
          onClick={() => setQuery({ order: (order.orderId).toString() })}
        />
      ))}
    </Flex>
  )
}
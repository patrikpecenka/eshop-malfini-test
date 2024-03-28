import { CloseButton, Flex, NumberInput, ScrollArea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { OrderPanelItem } from "components/OrderPanelItem";
import { useMemo } from "react";
import { useOrderStore } from "store/order.store";
import { StringParam, useQueryParams, withDefault } from "use-query-params";


export const SidePanel = () => {
  const { OrderDetailData } = useOrderStore();

  const [query, setQuery] = useQueryParams({
    order: withDefault(StringParam, "")
  });

  const [debounced] = useDebouncedValue(query, 300, { leading: true });

  const filteredOrder = useMemo(
    () =>
    (
      (OrderDetailData ?? []).filter((order) => (
        order.orderId && order.orderId.toString().includes(debounced.order))
      )),
    [OrderDetailData, debounced.order]
  );


  return (
    <Flex direction="column" h="100%" m={20} align="center" >
      <NumberInput
        w="95%"
        placeholder="Search..."
        value={query.order}
        onChange={(e) => setQuery({ order: e === "" ? undefined : JSON.stringify(e) })}
        leftSection={<IconSearch size={20} />}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            variant="transparent"
            onClick={() => setQuery({ order: undefined })}
            style={{ display: query.order ? undefined : "none" }}
          />
        }
      />
      <ScrollArea w="100%" scrollbarSize={2} scrollbars="y" >
        {filteredOrder.map((order) => (
          <OrderPanelItem
            key={order.id}
            OrderItem={order}
            onClick={() => setQuery({ order: (order.orderId).toString() })}
          />
        ))}
      </ScrollArea>
    </Flex>
  );
};
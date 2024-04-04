import { CloseButton, Flex, FlexProps, ScrollArea, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { OrderPanelItem } from "@pages/OrdersDetailPage/components/OrderPanelItem";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "@store/order.store";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

export const SidePanel = ({ ...rest }: FlexProps) => {
  const { orderDetailData: OrderDetailData } = useOrderStore();

  const [search, setSearch] = useQueryParam("search", withDefault(StringParam, ""));
  const [debounced] = useDebouncedValue(search, 300, { leading: true });

  const filteredOrder = useMemo(
    () =>
    (
      (OrderDetailData ?? []).filter((order) => (
        order.orderId && order.orderId.toString().includes(debounced))
      )),
    [OrderDetailData, debounced]
  );

  return (
    <Flex
      direction="column"
      align="center"
      {...rest}
    >
      <TextInput
        w="95%"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value || undefined)}
        rightSectionPointerEvents="all"
        leftSection={<IconSearch size={20} />}
        rightSection={
          <CloseButton
            variant="transparent"
            onClick={() => setSearch("")}
            style={{ display: search ? undefined : "none" }}
          />
        }
      />
      <ScrollArea w="100%" scrollbarSize={5} scrollbars="y" offsetScrollbars>
        {filteredOrder.map((order) => (
          <Link
            key={order.id}
            to={`/profile/${order.orderId}`}
          >
            <OrderPanelItem orderItem={order} />
          </Link>
        ))}
      </ScrollArea>
    </Flex>
  );
};
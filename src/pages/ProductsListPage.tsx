import { Affix, Button, CloseButton, Flex, Input, SimpleGrid, Transition } from "@mantine/core";
import { IconArrowUp, IconSearch, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import fetcher from "lib/fetcher";
import { ProductDto } from "lib/dto/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useMemo } from "react";
import { useDebouncedValue, useToggle, useWindowScroll } from '@mantine/hooks';
import { StringParam, useQueryParams, withDefault } from "use-query-params";
import { ProductCardSkeleton } from "components/Skeletons/ProductCardSkeleton";

const ProductCard = lazy(() => import("../components/ProductCard"));

export const ProductsListPage = () => {
  const [query, setQuery] = useQueryParams({
    activeSorting: withDefault(StringParam, ""),
    search: withDefault(StringParam, undefined),
  });

  const [scroll, scrollTo] = useWindowScroll();
  const [toggledValue, toggle] = useToggle(['desc', 'asc']);
  const [debounced] = useDebouncedValue(query, 300, { leading: true });

  const { data, status } = useQuery({
    queryKey: ['products', query.activeSorting],
    queryFn: () => fetcher<ProductDto[]>(`https://fakestoreapi.com/products?sort=${query.activeSorting}`),
  });

  const toggleSorting = () => {
    setQuery({ activeSorting: toggledValue });
    toggle();
  };

  const filteredProducts = useMemo(
    () =>
      (data ?? []).filter((product) => (
        product.title.toLowerCase().includes((debounced.search ?? "").toLowerCase())
      )),
    [data, debounced.search]
  );

  if (status === 'error') return <p>Error</p>;
  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(style) => (
            <Button
              leftSection={<IconArrowUp size={15} />}
              style={style}
              onClick={() => scrollTo({ y: 0 })}
            >
              Back to top
            </Button>
          )}
        </Transition>
      </Affix>
      <Flex justify="start" px={20} pt={20}>
        <Button
          value={toggledValue}
          variant="default"
          radius="sm"
          size="sm"
          onClick={toggleSorting}
          w={150}
        >
          {
            toggledValue === 'desc'
              ? <Flex gap={5} align="center"><IconSortAscending size={18} /> Ascending</Flex>
              : <Flex gap={5} align="center"><IconSortDescending size={18} />Descending</Flex>
          }
        </Button>
        <Input
          placeholder="Search..."
          className="focus-within:w-full transition-all"
          value={query.search}
          onChange={(e) => setQuery({ search: e.currentTarget.value || undefined })}
          leftSection={<IconSearch size={20} />}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              onClick={() => setQuery({ search: undefined })}
              style={{ display: "" ? undefined : "none" }}
            />
          }
        />
      </Flex >

      <SimpleGrid
        w="100%"
        p={20}
        cols={{ base: 1, sm: 3, md: 4, lg: 6 }}
      >
        {filteredProducts.map((product) => (
          <Suspense fallback={<ProductCardSkeleton />} key={product.id}>
            <ProductCard
              product={product}
            />
          </Suspense>
        ))}

      </SimpleGrid>
    </>
  );
};
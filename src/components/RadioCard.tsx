import { Flex, FlexProps, Image, ImageProps, Radio, RadioProps, useComputedColorScheme } from "@mantine/core";

interface RadioCard extends FlexProps {
  id: string;
  children: React.ReactNode;
  value: RadioProps["value"];
  imageProps?: ImageProps;
}

export const RadioCard = ({ id, children, value, direction, imageProps, ...rest }: RadioCard) => {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Flex
      id={id}
      component="label"
      p="lg"
      w="100%"
      align="center"
      direction="row"
      className="group hover:cursor-pointer rounded-md border border-transparent
        bg-[var(--mantine-color-gray-0)]
        hover:bg-[var(--mantine-primary-color-0)]
        has-[:checked]:border
        has-[:checked]:border-[var(--mantine-primary-color-2)]
        has-[:checked]:bg-[var(--mantine-primary-color-2)]
        dark:has-[:checked]:bg-[var(--mantine-primary-color-8)]
        dark:has-[:checked]:border-[var(--mantine-primary-color-5)]
        dark:bg-[var(--mantine-color-dark-5)]
        dark:hover:bg-[var(--mantine-color-dark-3)]"
      my={5}
      {...rest}
    >
      <Flex align="center" justify="center">
        <Radio value={value} color={computedColorScheme === "light" ? "" : "gray.8"} p={10} />
        {imageProps ? <Image {...imageProps} w={40} fit="contain" /> : null}
      </Flex>
      <Flex justify="space-between" align="center" w="100%" direction={direction} p={10}>
        {children}
      </Flex>
    </Flex >
  );
};
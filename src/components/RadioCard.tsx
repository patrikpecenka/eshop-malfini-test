import { Flex, FlexProps, Image, Radio, useComputedColorScheme } from "@mantine/core";

interface RadioCard extends FlexProps {
  id: string;
  children: React.ReactNode;
  radioValue: string | number;
  imageSrc?: string;
  imageAlt?: string;
}

export const RadioCard = ({ id, children, radioValue, direction, imageSrc, imageAlt, ...rest }: RadioCard) => {
  const radioSelectorClass = `group hover:cursor-pointer rounded-md border border-transparent
                  bg-[var(--mantine-color-gray-0)]
                  hover:bg-[var(--mantine-primary-color-0)]
                  has-[:checked]:border
                  has-[:checked]:border-[var(--mantine-primary-color-2)]
                  has-[:checked]:bg-[var(--mantine-primary-color-2)]
                  dark:has-[:checked]:bg-[var(--mantine-primary-color-8)]
                  dark:has-[:checked]:border-[var(--mantine-primary-color-4)]
                  dark:bg-[var(--mantine-color-dark-5)]
                  dark:hover:bg-[var(--mantine-color-dark-3)]`;
  const computedColorScheme = useComputedColorScheme();

  return (
    <Flex
      id={id}
      component="label"
      p="lg"
      w="100%"
      align="center"
      direction="row"
      className={radioSelectorClass}
      my={5}
      {...rest}
    >
      <Flex align="center" justify="center">
        <Radio value={radioValue} color={computedColorScheme === "light" ? "violet.5" : "gray.8"} p={10} />
        {imageSrc ? <Image src={imageSrc} w={40} fit="contain" /> : null}
      </Flex>
      <Flex justify="space-between" align="center" w="100%" direction={direction} p={10}>
        {children}
      </Flex>
    </Flex >
  );
};
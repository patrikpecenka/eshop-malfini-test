import { Button, ButtonProps } from "@mantine/core";

interface AddCartButtonProps extends ButtonProps {
  onClick: () => void;
}
export const AddCartButton = ({ onClick }: AddCartButtonProps) => {

  return (
    <Button
      className="hover:opacity-70 duration-200"
      w="100%"
      mt={15}
      variant="gradient"
      size="md"
      radius="xl"
      onClick={onClick}
    >
      Add To Cart
    </Button >
  );
};
import { Button, Card, Flex, createTheme } from "@mantine/core";
import { primaryColor } from "@layouts/Navbar";

export const theme = createTheme({
  primaryColor: primaryColor,
  primaryShade: 8,
  defaultGradient: {
    from: primaryColor,
    to: primaryColor + ".5",
    deg: 25,
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "gradient",
        gradient: {
          from: primaryColor,
          to: primaryColor + ".5",
          deg: 25,
        },
        radius: "xl",
        size: "md"
      },
    }),
    Card: Card.extend({
      defaultProps: {
        shadow: "sm",
        withBorder: true,
        radius: "md",
      }
    }),

    Flex: Flex.extend({
      defaultProps: {
        gap: "sm"
      }
    })
  }
});


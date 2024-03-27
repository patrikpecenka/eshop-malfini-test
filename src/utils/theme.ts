import { Button, Card, createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "violet",
  primaryShade: 5,
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "gradient",
        gradient: {
          from: "violet",
          to: "indigo",
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
  }
});
import { extendTheme, theme as baseTheme } from "@chakra-ui/react"

import { Button } from "./Button"

export const ColorTheme = extendTheme({
  ...baseTheme,
  colors: {
    primary: "#F49320"
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Roboto', sans-serif`,
    color: "red"
  },
  shadows: {
    soft: "0px 3px 8px rgba(51, 51, 51, 0.15)",
    medium: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
  },
  styles: {
    global: {
      body: {
        background: "linear-gradient(135deg, #FFFFFF 20%, #F0F0F0 100%)",
        backgroundAttachment: "fixed"
      },
      html: {
        marginLeft: "calc(100vw - 100%)", // Fix scrollbar jump
        marginRight: 0
      }
    }
  },
  components: {
    Button
  }
})

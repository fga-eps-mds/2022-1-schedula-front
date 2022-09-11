import { Url } from "url"

import React, { memo, ReactElement, useMemo } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { HStack, Icon, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"
import { IRoute } from "routes"

export interface SideBarItemAttributes extends IRoute {
  query?: { [key: string]: string }
  as?: string
  isActive?: boolean
}

export interface SideBarItemProps extends Partial<SideBarItemAttributes> {
  children?: ReactElement<{ isActive: boolean }>
}

const hoverStyle = {
  border: "1px solid",
  borderColor: "primary",
  textDecoration: "none",
  backgroundPosition: "right center"
}

export const SideBarItem = memo(
  ({ pathname, query, as, label, icon }: SideBarItemProps) => {
    const router = useRouter()

    const href: Partial<Url> = useMemo(
      () => ({
        pathname,
        query
      }),
      [pathname, query]
    )

    // replace the pathname slug '/path/[slug]' with the actual slug
    const path = query
      ? pathname?.replace(`[${Object.keys(query)[0]}]`, Object.values(query)[0])
      : pathname
    const isActive = router?.asPath === path

    return (
      <LinkBox>
        <HStack
          transition="all 0.5s, color 0s"
          backgroundSize="200% auto"
          alignItems="center"
          gap={1}
          cursor="pointer"
          px={3}
          py={2.5}
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="base"
          bgImage={
            isActive
              ? "linear-gradient(to right, #FF8008 0%, #FFA03A 51%, #FF8008 100%)"
              : "transparent"
          }
          color={isActive ? "white" : "inherit"}
          boxShadow={isActive ? "soft" : "none"}
          _hover={hoverStyle}
        >
          <Icon as={icon} boxSize="1.5em" />
          <NextLink href={href} as={as} shallow={!pathname} passHref>
            <LinkOverlay>
              <Text fontWeight={"medium"}>{label}</Text>
            </LinkOverlay>
          </NextLink>
        </HStack>
      </LinkBox>
    )
  }
)

SideBarItem.displayName = "SideBarItem"

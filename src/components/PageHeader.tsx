import { Box, Flex, Heading, Text } from '@chakra-ui/react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <Flex justifyContent='space-between' marginBottom={8}>
      <Box>
        <Heading>{title}</Heading>
        {subtitle && <Text>{subtitle}</Text>}
      </Box>

      <Box>{children}</Box>
    </Flex>
  );
};

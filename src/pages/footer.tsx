import React from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';

const Footer: NextPage = () => {
  return (
    <>
      <Grid
        h='150px'
        templateColumns='repeat(4, 1fr)'
        gap={0}>
        <GridItem backgroundColor='#505050'>
          <Center color='white'>
            <Box paddingY={7}>
              <Text
                marginTop={6}
                marginBottom={5}
                fontSize='2xl'>
                Lorem
              </Text>
              <Text marginBottom={2} fontSize='1xl'>
                lorem
              </Text>
              <Text marginBottom={8} fontSize='1xl'>
                lorem
              </Text>
            </Box>
          </Center>
        </GridItem>

        <GridItem backgroundColor='#505050'>
          <Center color='white'>
            <Box paddingY={7}>
              <Text
                marginTop={6}
                marginBottom={5}
                fontSize='2xl'>
                Lorem
              </Text>
              <Text marginBottom={2} fontSize='1xl'>
                lorem
              </Text>
              <Text marginBottom={8} fontSize='1xl'>
                lorem
              </Text>
            </Box>
          </Center>
        </GridItem>

        <GridItem backgroundColor='#505050'>
          <Center color='white'>
            <Box paddingY={7}>
              <Text
                marginTop={6}
                marginBottom={5}
                fontSize='2xl'>
                Lorem
              </Text>
              <Text marginBottom={2} fontSize='1xl'>
                lorem
              </Text>
              <Text marginBottom={8} fontSize='1xl'>
                lorem
              </Text>
            </Box>
          </Center>
        </GridItem>

        <GridItem backgroundColor='#505050'>
          <Center color='white'>
            <Box paddingY={20}>
              <Button
                paddingX={10}
                paddingTop={5}
                paddingBottom={5}
                borderRadius='50px'
                bg='primary'
                boxShadow='1px 4px 4px rgba(0, 0, 0, 0.25);'>
                Explorar
              </Button>
            </Box>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
};

export default Footer;

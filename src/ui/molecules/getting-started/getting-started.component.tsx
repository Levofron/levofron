import { FC } from 'react';

import { Box, Card, Container, Flex, Heading, Stack, Text, TextUnderline } from '@ui/atoms';

import { STEPS } from './getting-started.defaults';

export const GettingStarted: FC = (): JSX.Element => (
  <Box bg="gray.900">
    <Container maxW="6xl" py={{ base: 14, sm: 20, md: 32 }}>
      <Heading as="h3" color="gray.50" mb={{ base: 14, sm: 16 }} textAlign="center">
        Getting started in <TextUnderline mode="light">3 easy steps</TextUnderline>
      </Heading>
      <Flex
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
      >
        {STEPS.map((step, index) => (
          <Stack
            key={step.title}
            _first={{
              mt: 0,
            }}
            align={{ base: 'flex-start', md: 'center' }}
            maxW={{ base: 'full', md: 'xs' }}
            mt={{ base: 10, md: 0 }}
            px={4}
            spacing={4}
            textAlign={{ base: 'left', md: 'center' }}
          >
            <Card
              align="center"
              color="gray.50"
              fontSize="lg"
              fontWeight={700}
              h={20}
              justify="center"
              mode="light"
              w={20}
            >
              0{index + 1}
            </Card>
            <Heading color="gray.50" fontFamily="heading" fontSize="xl" pt={2}>
              {step.title}
            </Heading>
            <Text color="gray.300">{step.text}</Text>
          </Stack>
        ))}
      </Flex>
    </Container>
  </Box>
);

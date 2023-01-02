import { FC } from 'react';

import { Box, Flex, TabPanel, Text } from '@ui/atoms';
import { InputControl } from '@ui/molecules';

import { IOnboardingStepThreeProps } from './onboarding-step-three.types';

export const OnboardingStepThree: FC<IOnboardingStepThreeProps> = (): JSX.Element => (
  <TabPanel mx="auto" w={{ sm: '500px', md: '600px', lg: '650px' }}>
    <Box>
      <Flex mb="40px">
        <Flex
          align="center"
          direction="column"
          justify="center"
          mx="auto"
          textAlign="center"
          w="80%"
        >
          <Text color="gray.700" fontSize="lg" fontWeight="bold" mb="4px">
            Validate your integration
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="normal">
            Paste your copied integration token below to validate your integration.
          </Text>
        </Flex>
      </Flex>
      <Box>
        <Flex direction="column" w="100%">
          <InputControl
            isRequired
            label="Integration token"
            name="integrationToken"
            placeholder="Your integration token"
          />
        </Flex>
      </Box>
    </Box>
  </TabPanel>
);
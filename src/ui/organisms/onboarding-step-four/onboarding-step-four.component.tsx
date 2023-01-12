import { ChangeEvent, FC } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import { restModule } from '@adapter';

import { Button, Flex, TabPanel, Text } from '@ui/atoms';
import { InputControl } from '@ui/molecules';

import { debounce, useAxiosAction } from '@infrastructure/utils';

import { IOnboardingStepFourProps } from './onboarding-step-four.types';

export const OnboardingStepFour: FC<IOnboardingStepFourProps> = ({
  onNextButtonClick,
  onPreviousButtonClick,
}): JSX.Element => {
  const {
    data: setNotionApiTokenData,
    error: setNotionApiTokenError,
    loading: isSetNotionApiTokenLoading,
    mutateAsync: mutateAsyncSetNotionApiToken,
  } = useAxiosAction(restModule.setNotionApiToken);

  const handleInputChange = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    const result = await mutateAsyncSetNotionApiToken(event.target.value);

    if (result) {
      onNextButtonClick();
    }
  }, 1000);

  return (
    <TabPanel mx="auto" w={{ sm: '500px', md: '600px', lg: '650px' }}>
      <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
        <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
          Validate your integration
        </Text>
        <Text color="gray.400" fontSize="sm" fontWeight="normal">
          Paste your copied integration token below to validate your integration.
        </Text>
      </Flex>
      <Flex direction="column" mt={{ base: '25px', md: '40px' }} w="100%">
        <InputControl
          isRequired
          errorMessage={setNotionApiTokenError || undefined}
          isDisabled={isSetNotionApiTokenLoading || !!setNotionApiTokenData}
          isLoading={isSetNotionApiTokenLoading}
          label="Integration token"
          name="integrationToken"
          placeholder="Your integration token"
          onChange={handleInputChange}
        />
      </Flex>
      <Button
        isDisabled={isSetNotionApiTokenLoading || !!setNotionApiTokenData}
        leftIcon={<FaChevronLeft size="10px" />}
        mt="48px"
        variant="secondary"
        onClick={onPreviousButtonClick}
      >
        <Text fontSize="xs" fontWeight="bold">
          PREV
        </Text>
      </Button>
    </TabPanel>
  );
};

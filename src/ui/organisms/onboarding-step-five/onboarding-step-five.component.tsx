import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { restModule } from '@adapter';

import { Button, Flex, Spinner, TabPanel, Text } from '@ui/atoms';
import { AvailableNotionPage } from '@ui/molecules';

import { ERoutes } from '@infrastructure/types/routes';
import { useAxiosAction } from '@infrastructure/utils';

import { IOnboardingStepFiveProps } from './onboarding-step-five.types';

export const OnboardingStepFive: FC<IOnboardingStepFiveProps> = ({
  onBackToFirstStepClick,
}): JSX.Element => {
  const {
    data: availableNotionPagesData,
    loading: isAvailableNotionPagesLoading,
    mutate: mutateAvailableNotionPages,
  } = useAxiosAction(restModule.getAvailableNotionPages);

  const { loading: isSetNotionPageIdLoading, mutateAsync: mutateAsyncSetNotionPageId } =
    useAxiosAction(restModule.setNotionPageId);

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    mutateAvailableNotionPages();
  }, []);

  const handleAvailableNotionPageClick = async (pageId: string) => {
    mutateAsyncSetNotionPageId(pageId)
      .then(() =>
        toast({
          duration: 5000,
          status: 'success',
          title: 'Success!',
          description: 'You have successfully connected your Notion page!',
          onCloseComplete: () => {
            router.push(ERoutes.DASHBOARD);
          },
        }),
      )
      .catch((_error) => {
        toast({
          duration: 5000,
          status: 'error',
          title: 'Error!',
          description: _error,
        });
      });
  };

  const renderAvailableNotionPages = () => {
    if (isAvailableNotionPagesLoading) {
      return <Spinner size="lg" />;
    }

    if (!availableNotionPagesData?.length) {
      return (
        <Flex alignItems="center" flexDirection="column">
          <Text color="red.400" fontSize="sm" fontWeight="normal" textAlign="center">
            No available Notion pages were found. Please verify if your database has data or
            contains correct column names!
          </Text>
          <Button mt="48px" onClick={onBackToFirstStepClick}>
            <Text fontSize="xs" fontWeight="bold">
              BACK TO FIRST STEP
            </Text>
          </Button>
        </Flex>
      );
    }

    return availableNotionPagesData?.map((_availableNotionPage) => (
      <AvailableNotionPage
        key={_availableNotionPage.id}
        availableNotionPage={_availableNotionPage}
        isLoading={isSetNotionPageIdLoading}
        onClick={handleAvailableNotionPageClick}
      />
    ));
  };

  return (
    <TabPanel mx="auto" w={{ sm: '500px', md: '600px', lg: '650px' }}>
      <Flex align="center" direction="column" justify="center" mx="auto" textAlign="center" w="80%">
        <Text color="gray.700" fontSize={{ sm: 'xl', md: '2xl' }} fontWeight="bold" mb="4px">
          Select a Notion page
        </Text>
        <Text color="gray.400" fontSize="sm" fontWeight="normal">
          Please indicate from which Notion page we should use to get your vocabulary.
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        direction="column"
        gap={5}
        mt={{ base: '25px', md: '40px' }}
        w="100%"
      >
        {renderAvailableNotionPages()}
      </Flex>
    </TabPanel>
  );
};

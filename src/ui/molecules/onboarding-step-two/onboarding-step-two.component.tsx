import { FC } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

import {
  Box,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  TabPanel,
  Text,
  TextUnderline,
} from '@ui/atoms';

import { IOnboardingStepTwoProps } from './onboarding-step-two.types';

export const OnboardingStepTwo: FC<IOnboardingStepTwoProps> = (): JSX.Element => (
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
            Share a database with your integration
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="normal">
            Now that you have created an integration, you need to grant it access to a database. To
            keep your information secure, integrations do not have access to any pages or databases
            in the workspace at first. You must share specific pages with an integration in order
            for the API to access those pages. To share a database with your integration:
          </Text>
        </Flex>
      </Flex>
      <Box>
        <Flex direction="column" w="100%">
          <Flex direction={{ sm: 'column', md: 'row' }} mb="24px" w="100%">
            <List spacing={5} w="100%">
              <ListItem alignItems="center" display="flex">
                <ListIcon as={BsFillArrowRightCircleFill} />
                <Text>
                  Go to the database page in your workspace (the one with the vocabulary you want to
                  share).
                </Text>
              </ListItem>
              <ListItem alignItems="center" display="flex">
                <ListIcon as={BsFillArrowRightCircleFill} />
                <Text>
                  Click the <TextUnderline>•••</TextUnderline> on the top right corner of the page.
                </Text>
              </ListItem>
              <ListItem alignItems="center" display="flex">
                <ListIcon as={BsFillArrowRightCircleFill} />
                <Text>
                  At the bottom of the pop-up, click <TextUnderline>Add connections</TextUnderline>.
                </Text>
              </ListItem>
              <ListItem alignItems="center" display="flex">
                <ListIcon as={BsFillArrowRightCircleFill} />
                <Text>
                  Search for and select your integration in the{' '}
                  <TextUnderline>Search for connections...</TextUnderline> menu.
                </Text>
              </ListItem>
              <ListItem alignItems="center" display="flex">
                <Text>Your integration now has permission to read the database.</Text>
              </ListItem>
            </List>
          </Flex>
          <Flex justify="space-between">
            <Button
              alignSelf="flex-end"
              bg="gray.200"
              h="35px"
              mt="24px"
              variant="no-hover"
              w={{ sm: '75px', lg: '100px' }}
            >
              <Text color="gray.700" fontSize="xs" fontWeight="bold">
                PREV
              </Text>
            </Button>
            <Button
              _hover={{
                bg: 'red.500',
              }}
              alignSelf="flex-end"
              bg="red.400"
              h="35px"
              mt="24px"
              variant="no-hover"
              w={{ sm: '75px', lg: '100px' }}
            >
              <Text color="#fff" fontSize="xs" fontWeight="bold">
                NEXT
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  </TabPanel>
);
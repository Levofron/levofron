import { useClipboard } from '@chakra-ui/react';
import { FC } from 'react';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import {
  Box,
  Button,
  Card,
  ChakraNextLink,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tooltip,
  VStack,
} from '@ui/atoms';
import { InputControl, TextareaControl } from '@ui/molecules';

import { useForm } from '@infrastructure/utils';

import { GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from '@constants';

import { IContactFormProps } from './contact-form.types';

export const ContactForm: FC<IContactFormProps> = ({ email, fullName }): JSX.Element => {
  const { hasCopied, onCopy } = useClipboard('pawel.wojtasinski.1995@gmail.com');

  const { generateFieldProps, onSubmitWrapper } = useForm({
    initialValues: { email: email || '', name: fullName || '', message: '' },
  });

  const handleSubmit = onSubmitWrapper((values) => {
    console.log(values);
  });

  return (
    <Flex
      align="center"
      bg="white"
      borderBottom="1px solid"
      borderColor="black"
      borderTop="1px solid"
      id="contact"
      justify="center"
    >
      <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
          <Heading
            fontSize={{
              base: '4xl',
              md: '5xl',
            }}
          >
            Get in Touch
          </Heading>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8, lg: 20 }}>
            <Stack align="center" direction={{ base: 'row', md: 'column' }} justify="space-around">
              <Tooltip
                hasArrow
                closeOnClick={false}
                label={hasCopied ? 'Email Copied!' : 'Copy Email'}
              >
                <IconButton
                  aria-label="email"
                  fontSize="3xl"
                  icon={<MdEmail />}
                  size="lg"
                  variant="secondary"
                  onClick={onCopy}
                />
              </Tooltip>
              <ChakraNextLink href={GITHUB_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="github"
                  fontSize="3xl"
                  icon={<BsGithub />}
                  size="lg"
                  variant="secondary"
                />
              </ChakraNextLink>
              <ChakraNextLink href={TWITTER_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="twitter"
                  icon={<BsTwitter size="28px" />}
                  size="lg"
                  variant="secondary"
                />
              </ChakraNextLink>
              <ChakraNextLink href={LINKEDIN_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="linkedin"
                  icon={<BsLinkedin size="28px" />}
                  size="lg"
                  variant="secondary"
                />
              </ChakraNextLink>
            </Stack>
            <Box as={Card} minW={{ base: 'unset', md: '350px' }} p={{ base: 4, sm: 6, md: 8 }}>
              <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                <InputControl isRequired minLength={3} {...generateFieldProps('name')} />
                <InputControl
                  isRequired
                  minLength={5}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  type="email"
                  {...generateFieldProps('email')}
                />
                <TextareaControl
                  isRequired
                  minLength={10}
                  resize="none"
                  rows={6}
                  {...generateFieldProps('message')}
                />
                <Button type="submit" variant="primary" width="full">
                  Send Message
                </Button>
              </VStack>
            </Box>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
};

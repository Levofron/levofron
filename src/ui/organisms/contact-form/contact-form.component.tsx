import { useClipboard, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import { restModule } from '@adapter/modules';

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

import { useAxiosAction, useForm } from '@infrastructure/utils';

import { CONTACT_EMAIL, GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from '@constants';

import { IContactFormProps } from './contact-form.types';

export const ContactForm: FC<IContactFormProps> = ({ email, fullName }): JSX.Element => {
  const toast = useToast();
  const [disableForm, setDisableForm] = useState(false);
  const { hasCopied, onCopy } = useClipboard(CONTACT_EMAIL);
  const {
    loading: isSendContactFormDataLoading,
    mutateAsync: mutateAsyncSendContactFormData,
    reset: resetSendContactFormData,
  } = useAxiosAction(restModule.sendContactFormData);

  const { generateFieldProps, onSubmitWrapper, reset, setValue } = useForm({
    initialValues: { email: email || '', name: fullName || '', message: '' },
  });

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }

    if (fullName) {
      setValue('name', fullName);
    }
  }, [email, fullName]);

  const handleSubmit = onSubmitWrapper((_values) => {
    setDisableForm(true);

    mutateAsyncSendContactFormData(_values)
      .then(() =>
        toast({
          duration: 5000,
          status: 'success',
          title: 'Thank you!',
          description: "We'll get back to you soon!",
          onCloseComplete: () => {
            reset();
            setDisableForm(false);
          },
        }),
      )
      .catch((_error) => {
        toast({
          title: 'Error',
          duration: 5000,
          status: 'error',
          description: _error,
          onCloseComplete: () => {
            setDisableForm(false);
            resetSendContactFormData();
          },
        });
      });
  });

  const shouldDisableForm = isSendContactFormDataLoading || disableForm;

  return (
    <Flex align="center" bg="gray.900" id="contact" justify="center">
      <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
          <Heading
            color="gray.50"
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
                  mode="light"
                  size="lg"
                  onClick={onCopy}
                />
              </Tooltip>
              <ChakraNextLink href={GITHUB_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="github"
                  fontSize="3xl"
                  icon={<BsGithub />}
                  mode="light"
                  size="lg"
                />
              </ChakraNextLink>
              <ChakraNextLink href={TWITTER_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="twitter"
                  icon={<BsTwitter size="28px" />}
                  mode="light"
                  size="lg"
                />
              </ChakraNextLink>
              <ChakraNextLink href={LINKEDIN_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="linkedin"
                  icon={<BsLinkedin size="28px" />}
                  mode="light"
                  size="lg"
                />
              </ChakraNextLink>
            </Stack>
            <Card minW={{ base: 'unset', md: '350px' }} mode="light" p={{ base: 4, sm: 6, md: 8 }}>
              <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                <InputControl
                  isDisabled={shouldDisableForm}
                  mode="light"
                  {...generateFieldProps('name')}
                />
                <InputControl
                  isDisabled={shouldDisableForm}
                  mode="light"
                  {...generateFieldProps('email')}
                />
                <TextareaControl
                  isDisabled={shouldDisableForm}
                  mode="light"
                  resize="none"
                  rows={6}
                  {...generateFieldProps('message')}
                />
                <Button
                  isDisabled={shouldDisableForm}
                  isLoading={isSendContactFormDataLoading}
                  mode="light"
                  type="submit"
                  width="full"
                >
                  Send Message
                </Button>
              </VStack>
            </Card>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
};

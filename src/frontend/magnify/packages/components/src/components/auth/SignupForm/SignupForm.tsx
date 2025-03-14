import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { Box, Heading } from 'grommet';
import React, { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import * as Yup from 'yup';
import { useAuthContext } from '../../../context';
import { useRouting } from '../../../context/routing';
import { validationMessages } from '../../../i18n/Messages';
import { formLabelMessages } from '../../../i18n/Messages/formLabelMessages';

import { useLocale } from '../../../i18n/TranslationProvider/TranslationsProvider';
import { UsersRepository } from '../../../services/users/users.repository';
import { SignUpData, UserResponse } from '../../../types/api/auth';
import { FormikInput } from '../../design-system/Formik/Input';
import { LocalizedForm } from '../../design-system/Formik/LanguageChange';
import { FormikSelectLanguage } from '../../design-system/Formik/Select/Language';
import { FormikSubmitButton } from '../../design-system/Formik/SubmitButton/FormikSubmitButton';

const messages = defineMessages({
  formTitle: {
    defaultMessage: 'Create an account',
    description: 'The title of the signup form',
    id: 'components.auth.SignupForm.formTitle',
  },
  emailLabel: {
    id: 'components.auth.SignupForm.emailLabel',
    description: 'Label for the email input',
    defaultMessage: 'Email',
  },
  usernameLabel: {
    defaultMessage: 'Username',
    description: 'The label for the username field',
    id: 'components.auth.SignupForm.usernameLabel',
  },
  passwordLabel: {
    defaultMessage: 'Password',
    description: 'The label for the password field',
    id: 'components.auth.SignupForm.passwordLabel',
  },
  confirmPasswordLabel: {
    defaultMessage: 'Confirm Password',
    description: 'The label for the confirm password field',
    id: 'components.auth.SignupForm.confirmPasswordLabel',
  },
  submitButtonLabel: {
    defaultMessage: 'Signup',
    description: 'The label for the submit button',
    id: 'components.auth.SignupForm.submitButtonLabel',
  },
  InvalidCredentials: {
    defaultMessage: 'Invalid credentials',
    description: 'The error message if the credentials are invalid',
    id: 'components.auth.SignupForm.InvalidCredentials',
  },
  UnknownError: {
    defaultMessage: 'Something went wrong, please try again later',
    description: 'The error message if an unknown error occured during the login',
    id: 'components.auth.SignupForm.UnknownError',
  },
});

interface FormErrors {
  current_password?: string[];
  new_password?: string[];
}
export interface SignupFormValues {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  language: string;
}

export const SignupForm = () => {
  const intl = useIntl();
  const routing = useRouting();
  const locale = useLocale();
  const authContext = useAuthContext();

  const mutation = useMutation<UserResponse | undefined, AxiosError, SignupFormValues>(
    async (data: SignUpData) => {
      await UsersRepository.signIn({ ...data });
      await UsersRepository.login(data.username, data.password);
      return await UsersRepository.me();
    },
    {
      onSuccess: (user?: UserResponse) => {
        authContext.updateUser(user);
        routing.goToRoomsList();
      },
    },
  );

  const handleSubmit = async (
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>,
  ) => {
    mutation.mutate(values, {
      onError: (error) => {
        const formErrors: FormErrors = error?.response?.data as FormErrors;
        Object.entries(formErrors).forEach(([key, value]) => {
          actions.setFieldError(key, value.join(','));
        });
      },
    });
  };

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      username: Yup.string()
        .min(3, intl.formatMessage(validationMessages.usernameInvalid))
        .max(16, intl.formatMessage(validationMessages.usernameInvalid))
        .required(),
      language: Yup.string().required(),
      password: Yup.string().required(),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          intl.formatMessage(validationMessages.confirmDoesNotMatch),
        )
        .required(),
    });
  }, [locale.currentLocale]);

  const initialValues: SignupFormValues = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    language: locale.currentLocale,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <LocalizedForm>
        <Box gap={'medium'}>
          <Heading color="brand" level={4} margin={'none'}>
            {intl.formatMessage(messages.formTitle)}
          </Heading>
          <FormikInput label={intl.formatMessage(formLabelMessages.name)} name={'name'} />
          <FormikInput label={intl.formatMessage(messages.emailLabel)} name={'email'} />
          <FormikInput label={intl.formatMessage(messages.usernameLabel)} name={'username'} />
          <FormikSelectLanguage
            changeCallback={(newLocale) => locale.setCurrentLocale(newLocale)}
          />
          <FormikInput
            label={intl.formatMessage(messages.passwordLabel)}
            name={'password'}
            type={'password'}
          />
          <FormikInput
            label={intl.formatMessage(messages.confirmPasswordLabel)}
            name={'confirmPassword'}
            type={'password'}
          />
          <Box direction="row" justify="end" margin={{ top: 'small' }}>
            <FormikSubmitButton
              isLoading={mutation.isLoading}
              label={intl.formatMessage(messages.submitButtonLabel)}
            />
          </Box>
        </Box>
      </LocalizedForm>
    </Formik>
  );
};

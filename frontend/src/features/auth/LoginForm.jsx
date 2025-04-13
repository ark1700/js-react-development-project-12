// features/auth/LoginForm.jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { useLoginMutation } from './authApi';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Имя пользователя обязательно'),
  password: Yup.string().required('Пароль обязателен'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await login(values).unwrap();
      const { token } = response;

      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.log(err);
      setStatus('Неверный логин или пароль');
    }
  };
  // todo: add loader
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, status }) => (
        <Form>
          <BootstrapForm.Group className="mb-3" controlId="username">
            <BootstrapForm.Label>Имя пользователя</BootstrapForm.Label>
            <Field
              name="username"
              as={BootstrapForm.Control}
              type="text"
              isInvalid={touched.username && errors.username}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.username}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3" controlId="password">
            <BootstrapForm.Label>Пароль</BootstrapForm.Label>
            <Field
              name="password"
              as={BootstrapForm.Control}
              type="password"
              isInvalid={touched.password && errors.password}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.password}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          {status && <Alert variant="danger">{status}</Alert>}

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

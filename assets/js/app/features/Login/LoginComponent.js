import React, { Component } from "react";
import { Form, Button, Header } from 'semantic-ui-react';
import { Formik } from 'formik';
import './LoginComponent.css';
import * as Yup from 'yup';
import CustomLabel from '../../common/CustomLabel/CustomLabel';

const loginFormValidationSchema = Yup.object().shape({
    login: Yup.string()
        .required('Pole login jest wymagane'),
    password: Yup.string()
        .required('Pole hasło jest wymagane')
});


class LoginComponent extends Component {

    onSubmit(values) {

        this.props.login(values.login, values.password);
    };

    render() {

        return (
            <div className='login-container'>
                <div className='login-header-container'>
                    <Header as='h2' className='login-header'>Logowanie</Header>
                </div>
                <div className='inputs-login-container' >
                    <Formik
                        initialValues={{ login: '', password: '' }}

                        validationSchema={loginFormValidationSchema}

                        onSubmit={(values, { setSubmitting }) => {
                            this.onSubmit(values);
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                                <Form className='inputs-login-form' onSubmit={handleSubmit}>
                                    <Form.Field
                                        name="login"
                                        className='inputs-login-form-field'
                                        placeholder="Login"
                                        control='input'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.login}
                                    />
                                    {errors.login && touched.login ? <div><CustomLabel text={errors.login}></CustomLabel></div> : null}
                                    <Form.Field
                                        type="password"
                                        name="password"
                                        className='inputs-login-form-field'
                                        placeholder="Hasło"
                                        control='input'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password ? <div><CustomLabel text={errors.password}></CustomLabel></div> : null}
                                    <Button type="submit" className="login-form-submit" color="teal" disabled={isSubmitting}>
                                        ZALOGUJ SIĘ
                                </Button>
                                </Form>
                            )}
                    </Formik>
                </div>
            </div >

        )
    }
}

export default LoginComponent;
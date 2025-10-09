import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'


function AuthorizitonForm() {
    const validationSchema = ''
    const handleSubmit = () => { }
    return (
        <div className="flex-grow-1 align-self-stretch ">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status, errors, touched, setStatus }) => (
                    <Form>
                        <div className="input-group has-validation">

                            <Field
                                className={`form-control placeholder-with-icon-email mb-3${(touched.email && errors.email) || status ? ' is-invalid' : ''}`}
                                type="email"
                                name="email"
                                id="email"
                                placeholder={'Email'}
                                validate={() => {
                                    setStatus(null)
                                }}

                            />
                        </div>
                        <div className="input-group has-validation">
                            <Field
                                className={`form-control placeholder-with-icon-password  mb-3${touched.password && errors.password ? ' is-invalid' : ''}`}
                                type="password"
                                name="password"
                                placeholder={'Password'}
                                id="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary w-100 rounded-1" disabled={isSubmitting}>
                            {isSubmitting ? `sada` : 'asas'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AuthorizitonForm
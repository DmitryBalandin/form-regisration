import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { useLogin } from '../api/authApi'
import { setUsersData } from '../slices/authSlice';

function AuthorizitonForm() {
    const loginMutation = useLogin();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Введите корректный Email')
            .required('Введите Email'),
        password: Yup.string()
            .required('Введите Password'),
    })
    // const handleSubmit = () =>{}
    const handleSubmit = async (values: any) => {
        try {
           const response =  await loginMutation.mutateAsync(values);
            // В реальном приложении здесь была бы обработка успешного входа
            console.log('Login successful!', response);
            const {token} = response
            const {username} = response
            dispatch(setUsersData({token,username}))
        } catch (error) {
            // Ошибка обрабатывается автоматически через React Query
            console.error('Login failed:', error);
        }
    };
    return (
        <div className="flex-grow-1 align-self-stretch ">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status, errors, touched, setStatus, isValid, dirty }) => (
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
                            <ErrorMessage name="email">{msg => <div className="invalid-tooltip">{msg}</div>}</ErrorMessage>
                            {!(touched.email && errors.email) && status && <div className="invalid-tooltip">{status}</div>}
                        </div>
                        <div className="input-group has-validation">
                            <Field
                                className={`form-control placeholder-with-icon-password  mb-3${touched.password && errors.password ? ' is-invalid' : ''}`}
                                type="password"
                                name="password"
                                placeholder={'Password'}
                                id="password"
                                validate={() => {
                                    setStatus(null)
                                }}
                            />
                            <ErrorMessage name="password">{msg => <div className="invalid-tooltip">{msg}</div>}</ErrorMessage>
                            {!(touched.password && errors.password) && status && <div className="invalid-tooltip">{status}</div>}
                        </div>
                        <button type="submit" className={`btn ${isValid && dirty ? 'btn-primary' : 'btn-outline'}  w-100 rounded-1`} disabled={isSubmitting || !isValid || !dirty}>
                            {isSubmitting ? `Wait...` : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AuthorizitonForm
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch} from 'react-redux';
import { useLogin } from '../api/authApi'
import { setUsersData } from '../slices/authSlice';
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../slices/errorsNetworkSlice';
import store from '../slices/store';
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

    const handleSubmit = async (values: any, { setStatus }: any) => {
        dispatch(clearErrorNetwork())
        setStatus(null)
        try {
            const response = await loginMutation.mutateAsync(values);
            console.log('Login successful!', response);
            const { token } = response
            const { username } = response
            dispatch(setUsersData({ token, username }))
        } catch (error: any) {
            if (error.code === 'NETWORK_ERROR') {
                dispatch(setErrorNetwork({error:'Oтсутствует интернет-соединение или проблемы с сетью'}))
            }
            if (error.code === 'USER_NOT_FOUND') {
                dispatch(setErrorNetwork({error:'Пользователь с таким email не существует'}))
            }
            if (error.code === 'INVALID_PASSWORD') {
                dispatch(setErrorNetwork({error:'Неверный пароль для существующего пользователя'}))
            }
            if (error.code === 'VALIDATION_ERROR') {
                dispatch(setErrorNetwork({error:'ошибки валидации'}))
            }
            if (error.code === 'ACCOUNT_LOCKED') {
                dispatch(setErrorNetwork({error:'Аккаунт временно заблокирован'}))
            }
            console.error('Login failed:', error);
        } finally {
            const { error } = selectErrorNetworks(store.getState())
            if (error) {
                setStatus(error)
            }
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
                        </div>

                        {status && <div className="text-start text-danger mb-3  mt-2 small">
                            {status}
                        </div>}

                        <button type="submit" className={`btn ${isValid && dirty ? 'btn-primary' : 'btn-outline'}  w-100 rounded-1`} disabled={isSubmitting || !isValid || !dirty}>
                            {isSubmitting ? `Wait...` : 'Log in'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AuthorizitonForm
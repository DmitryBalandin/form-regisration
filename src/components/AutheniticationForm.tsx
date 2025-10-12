import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useRef } from 'react';
const CODE_AUTHENITICATION = 222222
function AutheniticationForm() {

    const handleSubmit = () => { };
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const isAuthenitication = (inputedValues: any) => {

        const code = +Object.values(inputedValues).join('')
        return code === CODE_AUTHENITICATION
    }


    const onChange = (setFieldValue: any, index: number, values: any, setStatus: any) => (e: any) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setStatus(false)
        setFieldValue(`code${index + 1}`, value)
        const inputedValues = values;
        inputedValues[`code${index + 1}`] = value;
        if (isAuthenitication(values)) {
            setStatus(true)
        }
        if (value && index < 5) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    }

    const onKeyDown = (setFieldValue: any, index: number) => (e: any) => {

        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            e.preventDefault();
            setFieldValue(`code${index}`, '');
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
                prevInput.focus();

            }
        }
        if (e.key === 'ArrowRight' && index < 5) {
            e.preventDefault();
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }

        if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        }
    };


    const onPaste = (setFieldValue: any, setStatus: any) => (e: any) => {
        e.preventDefault();
        console.log('onPaste')
        const pastedData = e.clipboardData.getData('text').replace(/[^\d]/g, '');

        if (pastedData.length === 6) {
            const digits = pastedData.split('');
            digits.forEach((digit: string, index: number) => {
                setFieldValue(`code${index + 1}`, digit);
            });

            const inputedValues: any = {};
            digits.forEach((digit: any, index: any) => {
                inputedValues[`code${index + 1}`] = digit;
            });
            if (isAuthenitication(inputedValues)) {
                setStatus('is authentication code')
            }


            const lastInput = inputRefs.current[5];
            if (lastInput) {
                lastInput.focus();
            }
        }
    };
    const validationSchema = Yup.object().shape({
        code1: Yup.string()
            .required(),
        code2: Yup.string()
            .required(),
        code3: Yup.string()
            .required(),
        code4: Yup.string()
            .required(),
        code5: Yup.string()
            .required(),
        code6: Yup.string()
            .required(),
    })

    return (
        <div className="flex-grow-1 align-self-stretch ">
            <Formik
                initialValues={{
                    code1: '',
                    code2: '',
                    code3: '',
                    code4: '',
                    code5: '',
                    code6: '',
                }}

                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status, setStatus, isValid, dirty, setFieldValue, values }) => (
                    <Form >
                        <div className="mb-4 ">
                            <div className="d-flex justify-content-between gap-2 input-group flex-nowrap">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <div key={index} className="flex-fill">
                                        <Field
                                            id={`code${index + 1}`}
                                            name={`code${index + 1}`}
                                            type="text"
                                            maxLength="1"
                                            className={`form-control form-control-lg text-center fixed-width-45 ${isValid && !status && dirty ? 'no-icon-is-invalid is-invalid' : ''}`}
                                            onChange={onChange(setFieldValue, index, values, setStatus)}
                                            onKeyDown={onKeyDown(setFieldValue, index)}
                                            onPaste={onPaste(setFieldValue, setStatus)}
                                            innerRef={(el: HTMLInputElement | null) => {
                                                inputRefs.current[index] = el;
                                            }}
                                        />

                                    </div>

                                ))}

                            </div>
                            {isValid && !status && dirty && (
                                <div className="text-start text-danger  mt-2 small">
                                    Invalid code
                                </div>
                            )}
                        </div>

                        {isValid && dirty && <button type="submit" className={`btn ${status && dirty ? 'btn-primary' : 'btn-outline'}  w-100 rounded-1`} disabled={isSubmitting || !status}>
                            {isSubmitting ? `Wait...` : 'Continue'}
                        </button>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AutheniticationForm
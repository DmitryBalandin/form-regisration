import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRef } from 'react';

function AutheniticationForm() {
    const validationSchema = ''
    const handleSubmit = () => { };
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const onChange = (setFieldValue: any, index: number) => (e: any) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setFieldValue(`code${index + 1}`, value)

        if (value && index < 5) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    }

    const onKeyDown = (index: number) => (e: any) => {
        // Обработка Backspace - переход к предыдущему полю
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const onPaste = (setFieldValue: any) => (e: any) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^\d]/g, '');

        if (pastedData.length === 6) {
            const digits = pastedData.split('');
            digits.forEach((digit: string, index: number) => {
                setFieldValue(`code${index + 1}`, digit);
            });

            // Фокус на последнее поле после вставки
            const lastInput = inputRefs.current[5];
            if (lastInput) {
                lastInput.focus();
            }
        }
    };

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
                {({ isSubmitting, status, errors, touched, setStatus, isValid, dirty, setFieldValue, }) => (
                    <Form>
                        <div className="mb-4">
                            <div className="d-flex justify-content-between gap-2">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <div key={index} className="flex-fill">
                                        <Field
                                            id={`code${index + 1}`}
                                            name={`code${index + 1}`}
                                            type="text"
                                            maxLength="1"
                                            className='form-control form-control-lg text-center'
                                            onChange={onChange(setFieldValue, index)}
                                            onKeyDown={onKeyDown(index)}
                                            onPaste={onPaste(setFieldValue)}
                                            innerRef={(el: HTMLInputElement | null) => {
                                                inputRefs.current[index] = el;
                                            }}
                                        />


                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-2">
                            </div>
                        </div>
                        <button type="submit" className={`btn ${isValid && dirty ? 'btn-primary' : 'btn-outline'}  w-100 rounded-1`} disabled={isSubmitting || !isValid || !dirty}>
                            {isSubmitting ? `Wait...` : 'Losgin'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AutheniticationForm
import signCompany from '../assets/Symbol.svg'
import buttonSvg from '../assets/Button _ Variant (optional).svg'
import { useDispatch } from 'react-redux'
import { clearUser } from '../slices/authSlice'
import { type AppDispatch } from '../slices/store'
import type { MainPageProps } from '../types/componenets/components'

function MainPage({ children, isAuthorization }: MainPageProps) {
    const dispatch:AppDispatch = useDispatch()
    const handleButtonBack = ():void => {
        dispatch(clearUser())
    }
    return (
        <div className="align-self-center text-start col-12 col-sm-10 col-md-8 col-xxl-6">
            <div className="card">

                <div className="card-body d-flex flex-column flex-md-nowrap justify-content-between align-items-center m-5
            gap-4 "
                >

                    <div className='w-100'>
                        {isAuthorization && <button type='button' onClick={handleButtonBack} className='btn  border-0 p-0 m-0'>
                            <img src={buttonSvg} alt="button back" />
                        </button>}
                        <div className="d-flex gap-2 justify-content-center">
                            <img src={signCompany} className='mb-2' alt="Company Logo" />
                            <h1 className="h2">Company</h1>
                        </div>
                    </div>

                    <div className="text-center mb-2">
                        {isAuthorization ?
                            <>
                                <p className="fs-4 fw-bolder text-reset">Two-Factor Authentication</p>
                                <p className="">Enter the 6-digit code from the Google Authenticator app</p>
                            </>
                            :
                            <p className="fs-4 fw-bolder">Sign in to your account to continue</p>
                        }

                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
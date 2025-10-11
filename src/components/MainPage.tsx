import signCompany from '../assets/Symbol.svg'


interface MainPage {
    children: any
}


function MainPage({ children }: MainPage) {

    return (
        <div className="align-self-center text-center col-12 col-sm-10 col-md-8 col-xxl-6">
            <div className="card">
                <div className="card-body d-flex flex-column flex-md-nowrap justify-content-between align-items-center m-5
            gap-4 "
                >
                    <div className="d-flex gap-2">
                        <img src={signCompany} className='mb-2' alt="Sign Company" />
                        <h1 className="h2 company-name">Company</h1>
                    </div>
                    <div className="text-center mb-2">
                        <p className="">Sign in to your account to continue</p>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
import MainPage from "./components/MainPage"
import AuthorizitonForm from "./components/AuthorizitonForm"
import AutheniticationForm from "./components/AutheniticationForm"
function App() {


  return (
     <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
          <MainPage>
            {/* <AuthorizitonForm/> */}
            <AutheniticationForm/>
          </MainPage>
       </div>
  )
}

export default App

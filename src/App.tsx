import MainPage from "./components/MainPage"
import AuthorizitonForm from "./components/AuthorizitonForm"
function App() {


  return (
     <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
          <MainPage>
            <AuthorizitonForm/>
          </MainPage>
       </div>
  )
}

export default App

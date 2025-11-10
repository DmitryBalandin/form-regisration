import MainPage from "./components/MainPage"
import AuthorizationForm from "./components/AuthorizationForm"
import AuthenticationForm from "./components/AuthenticationForm"
import { useAuth } from "./ hooks.ts/useAuth";


function App() {
  const isAuthorized = useAuth();
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <MainPage isAuthorization={isAuthorized}>
        {isAuthorized ? <AuthenticationForm /> : <AuthorizationForm />}
      </MainPage>
    </div>
  )
}

export default App

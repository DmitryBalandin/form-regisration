import MainPage from "./components/MainPage"
import AuthorizitonForm from "./components/AuthorizitonForm"
import AutheniticationForm from "./components/AutheniticationForm"
import { useSelector } from 'react-redux';
import { selectToken, selectUsername } from "./slices/authSlice"


function App() {
  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);

  return (
     <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
          <MainPage isAuthorization={!!(username && token)}>
            {(username && token) ? <AutheniticationForm/> : <AuthorizitonForm/> }
          </MainPage>
       </div>
  )
}

export default App

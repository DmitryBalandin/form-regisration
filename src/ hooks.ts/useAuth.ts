import { selectToken,selectUsername } from "../slices/authSlice";
import { useSelector } from "react-redux";

export const useAuth = ():boolean => {
    const username = useSelector(selectUsername)
    const token = useSelector(selectToken)
    return !!(username && token)
}
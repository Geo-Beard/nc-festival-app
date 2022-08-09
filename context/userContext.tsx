import { createContext } from "react";
interface userContextInterface{
    uid: string,
    email: string,
    displayName: string
}
export const UserContext = createContext<userContextInterface | null>(null)

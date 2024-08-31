import { fetchStatus } from "@/app/query/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

type UseUser = {
    currentUser: string,
    currentScore: number,
    setCurrentUser: (user: string) => void,
    removeUser: () => void,
}

export const useUser = (): UseUser => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const {data} = useQuery({ queryKey: ['user_score'], queryFn: () => fetchStatus(cookies.user), enabled: !!cookies?.user });

    console.log(data);

    return {
        currentUser: cookies.user,
        currentScore: data?.score || 0,
        setCurrentUser: (user: string) => setCookie('user', user),
        removeUser: () => removeCookie('user'),
    }
}
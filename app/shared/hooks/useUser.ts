import { fetchStatus } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

type UseUser = {
    currentUser: string;
    currentScore: number;
    guessPrice: number;
    currentGuess: string;
    setCurrentUser: (user: string) => void;
    removeUser: () => void;
};

export const USE_USER_QUERY_KEY = 'user_score';

export const useUser = (): UseUser => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const { data } = useQuery({
        queryKey: [USE_USER_QUERY_KEY],
        queryFn: () => fetchStatus(cookies.user),
        enabled: !!cookies?.user,
    });

    return {
        currentUser: cookies.user,
        currentScore: data?.score || 0,
        currentGuess: data?.currentGuess,
        guessPrice: data?.guessPrice,
        setCurrentUser: (user: string) => setCookie('user', user),
        removeUser: () => removeCookie('user'),
    };
};

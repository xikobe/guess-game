import { fetchStatus } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './useUser';

export const useBetStatus = ({ isEnabled }: { isEnabled: boolean }) => {
    const { currentUser } = useUser();

    return useQuery({
        queryKey: ['bet_status'],
        queryFn: () => fetchStatus(currentUser),
        enabled: isEnabled,
    });
};

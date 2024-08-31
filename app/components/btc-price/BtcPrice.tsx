'use client';

import dynamic from 'next/dynamic';
import { useBTCPrice } from './hooks/useBTCPrice';
import { memo } from 'react'; // need this here because of  https://github.com/heyman333/react-animated-numbers/issues/60

const DynamicNumbers = dynamic(() => import('react-animated-numbers'), {
    loading: () => <p>Loading...</p>,
});

// eslint-disable-next-line react/display-name
export const BTCPrice = memo(() => {
    const { data: btcPrice } = useBTCPrice();

    return (
        <DynamicNumbers
            includeComma
            transitions={() => ({
                type: 'spring',
                duration: 0.5,
            })}
            animateToNumber={Number(btcPrice)}
            fontStyle={{
                fontSize: 50,
                color: 'black',
                fontWeight: 'bold',
            }}
        />
    );
});

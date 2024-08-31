import AnimatedNumbers from "react-animated-numbers";
import { useBTCPrice } from "./hooks/useBTCPrice";
import { memo } from 'react'; // need this here because of  https://github.com/heyman333/react-animated-numbers/issues/60

export const BTCPrice = memo(() => {
    const { data: btcPrice } = useBTCPrice();

    return (
        <AnimatedNumbers
            includeComma
            transitions={(index) => ({
                type: "spring",
                duration: 0.5,
            })}
            animateToNumber={Number(btcPrice)}
            fontStyle={{
                fontSize: 50,
                color: "black",
                fontWeight: 'bold'
            }}
        />
    )
})
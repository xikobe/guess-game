import { useQuery } from "@tanstack/react-query";

const fetchBTPrice = async (): Promise<number> => {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json').then((res) =>
      res.json()
    )
    
    return res.bpi.USD.rate_float;
}

export const useBTCPrice = () => {
    return useQuery({ queryKey: ['btc_price'], queryFn: fetchBTPrice, refetchInterval: 5000 })
}
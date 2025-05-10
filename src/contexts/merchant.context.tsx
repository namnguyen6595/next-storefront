import { InstanceRequestClient } from "@/utils/request/client";
import { createContext } from "react";
import useSWR from "swr";
interface IMerchantContext {
    merchantInfo: any
}

const MerchantContext = createContext<IMerchantContext | null>(null);

const fetcher = async (url: string, domain: string) => InstanceRequestClient({
    url,
    method: 'GET',
})

const MerchantProvider = ({ children }: { children: React.ReactNode }) => {
    const merchantInfo = useSWR('/merchant/info', fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 60000,
    })
    return (
        <MerchantContext.Provider value={{
            merchantInfo
        }}>
            {children}
        </MerchantContext.Provider>
    );
};
export { MerchantContext, MerchantProvider };
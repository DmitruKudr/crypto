import { useState } from "react"

export const useFetching = (callback: (...args: any) => void) => {
    const [isLoading, setIsLoading] = useState(false)

    const fetching = async (...args: any) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading]
}
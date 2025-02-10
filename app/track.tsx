// app/GoogleAnalytics.jsx

'use client'
import { useEffect } from "react"
import { injectMonitor } from "utils/monitor"
const Track = () => {
    useEffect(() => {
        // @ts-ignore
        if (window && !window.hasRejected) {
            console.log('Track page mounted', window)
            // @ts-ignore
            window.hasRejected = true
            injectMonitor()
        }
    }, [])

    return (
        <>
            
        </>
    )
}

export default Track
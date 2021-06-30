import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data for that resource')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log('fetch aborted')
                } else {
                    setIsPending(false);
                    setError(err.message);
                    console.log(err.message);
                }


            })

        return () => abortCont.abort()//it aborts whatever fetch it is associated with 

    }, [url]) //when url changes it will rerun to fetch data for that end point 

    return { data, isPending, error }
}

export default useFetch;
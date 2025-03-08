import { useState } from "react";
import axios from "axios";

// base template api call function, to help keeps things DRY
export function useApiCall () {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    async function fetchData (url, method = "GET", body = null, headers = {}) {
        setLoading(true);
        setError(null);

        try {            
            const options = {
                method,
                headers: { "Content-Type": "application/json", ...headers },
                data: body || null,
                url,
            };
            const response = await axios(options);
            // console.log("Options zijn")
            // console.log(options);
            setData(response);
            // console.log(response)
            return response
        } catch (e) {
            console.log(e)
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error }
}
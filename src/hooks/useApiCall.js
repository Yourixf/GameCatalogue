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
            setData(response.data);
            // console.log(response)
            //  console.log("1e data:")
            //  console.log(data)
            // console.log("1e data done")
            // console.log(data.jwt)
            return response
        } catch (e) {
            setError(e);
            // console.log(e)
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error }
}


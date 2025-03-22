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
        setData(null)

        try {
            const isFormData = body instanceof FormData;

            const options = {
                method,
                headers: {
                    ...(isFormData
                        ? {}
                        : {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }),
                    ...headers
                },
                data: body || null,
                url,
                mode: "cors",
            };
            const response = await axios(options);
            // console.log(response);
            setData(response.data ? response.data : response);
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
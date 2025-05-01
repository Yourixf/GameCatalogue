export function checkEnvVars() {
    // current environment variables
    const NOVI_URL = import.meta.env.VITE_NOVI_API_BASE_URL;
    const NOVI_API_KEY = import.meta.env.VITE_NOVI_API_KEY;
    const RAWG_URL = import.meta.env.VITE_RAWG_API_BASE_URL;
    const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

    console.log( !!NOVI_URL && !!NOVI_API_KEY && !!RAWG_URL && !!RAWG_API_KEY)
    // if any env variable are not present, or not a valid value, returns false
    return !!NOVI_URL && !!NOVI_API_KEY && !!RAWG_URL && !!RAWG_API_KEY
}
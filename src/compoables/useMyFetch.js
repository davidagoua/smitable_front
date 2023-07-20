import {createFetch} from "@vueuse/core";

const useMyFetch = createFetch({
    baseUrl: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/v1/',
    options: {
        async beforeFetch({ options }) {

            if(options.url === '/api/v1/auth/login/'){
                return { options }
            }
            const myToken = localStorage.getItem('token')
            options.headers.Authorization = `Token ${myToken}`
            return { options }
        },
    },
    /*

    fetchOptions: {
        mode: 'cors',
    },
     */
})
export default useMyFetch

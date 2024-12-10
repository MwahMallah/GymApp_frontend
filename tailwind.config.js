/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#f4f6f4',
                primary: '#6FBC22',
                danger: '#f23a40',
                'primary-muted': '#c6f799',
                'danger-muted' : '#f2a2a5'
            }
        },
    },
    plugins: [],
}


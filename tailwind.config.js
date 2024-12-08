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
                'primary-muted': '#c6f799'
            }
        },
    },
    plugins: [],
}


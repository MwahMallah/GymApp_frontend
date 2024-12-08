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
                elements: '#6FBC22'
            }
        },
    },
    plugins: [],
}


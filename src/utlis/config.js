const config = {}
if (process.env.NODE_ENV !== 'production') {
    config.baseURL = 'https://localhost:3002'
} else {
    config.baseURL = ''
}

export default config
// 如果是開發模式
const url =
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "http://localhost:14589/api"

export default url

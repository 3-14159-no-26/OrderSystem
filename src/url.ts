// 如果是開發模式
const url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://json-server-vercel-ts.vercel.app/api"

export default url

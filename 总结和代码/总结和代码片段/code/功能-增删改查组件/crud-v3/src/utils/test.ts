declare function handleRequest(url: string, method: 'GET' | 'POST'): void

const req = { url: 'https://example.com', method: 'GET' } as const
// const handleRequest = function (u: string, m: "GET" | "POST") {}
handleRequest(req.url, req.method)

export {}

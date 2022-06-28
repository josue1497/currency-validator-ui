const BASE_WEBSOCKET = process.env.VUE_APP_WEBSOCKET_URL

export const createConnection = () =>
  new Promise((resolve) => {
    resolve(new WebSocket(BASE_WEBSOCKET))
  })

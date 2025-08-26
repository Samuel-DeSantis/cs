const getTimestamp = () => new Date().toISOString()

const logger = {
  info: (message) => {
    console.log(JSON.stringify({
      level: 'info',
      message: message,
      timestamp: getTimestamp()
    }, null, 2))
  },
  error: (message) => {
    console.error(JSON.stringify({
      level: 'error',
      message: message,
      timestamp: getTimestamp()
    }, null, 2))
  },
  debug: (message) => {
    console.log(JSON.stringify({
      level: 'debug',
      message: message,
      timestamp: getTimestamp()
    }, null, 2))
  },
  warn: (message) => {
    console.warn(JSON.stringify({
      level: 'warn',
      message: message,
      timestamp: getTimestamp()
    }, null, 2))
  }
}

export default logger
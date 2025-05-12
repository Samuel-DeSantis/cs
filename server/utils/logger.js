const logger = {
  info: (message) => {
    console.log(JSON.stringify({
      level: 'info',
      message: message
    }, null, 2))
  },
  error: (message) => {
    console.log(JSON.stringify({
      level: 'error',
      message: message
    }, null, 2))
  },
  debug: (message) => {
    console.log(JSON.stringify({
      level: 'debug',
      message: message
    }, null, 2))
  },
  warn: (message) => {
    console.log(JSON.stringify({
      level: 'warn',
      message: message
    }, null, 2))
  }
}

export default logger
class Logger {
  debug(log: string, message?: string) {
    console.log(`[DEBUG: ${log}]: ${message}`);
}
}

export const logger = new Logger();
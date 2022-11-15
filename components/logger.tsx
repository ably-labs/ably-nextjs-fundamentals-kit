export class LogEntry {
  public timestamp: Date
  public message: string

  constructor(message: string) {
    this.timestamp = new Date()
    this.message = message
  }
}

export type LoggingProps = {
  logEntries: Array<LogEntry>
}

export default function Logger({ logEntries }: LoggingProps) {
  return (
    <ul>
    {
      // Show the newest log entry at the top
      logEntries.sort((a: LogEntry, b: LogEntry) => {
          return b.timestamp.getTime() - a.timestamp.getTime()
        }).map((logEntry: LogEntry, index: number) => {
        return (
          <li key={index}>
            {logEntry.timestamp.toISOString()}: {logEntry.message}
          </li>
        )}
      )
    }
    </ul>
  )
}
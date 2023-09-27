export class LogEntry {
  public timestamp: Date
  public message: string

  constructor(message: string) {
    this.timestamp = new Date()
    this.message = message
  }
}

export type LoggingProps = {
  logEntries: Array<LogEntry>,
  displayHeader: boolean
}

export default function Logger({ logEntries, displayHeader }: LoggingProps) {
  return (
    <div className="flex flex-col justify-start items-start gap-4">
      { displayHeader &&
      <div className="font-manrope text-sm min-w-[108px] whitespace-nowrap text-black text-opacity-100 leading-4 uppercase tracking-widest font-medium">
        <span className="uppercase">Message log</span>
      </div>
      }
      <div className="flex flex-col justify-start items-start rounded-lg bg-gray-900">
        <div className="flex flex-row justify-start items-center pt-3 pr-2 pb-3 pl-2 border-slate-800 border-b border-solid w-[752px] h-10">
          <div className="flex flex-row justify-start items-start gap-1.5 pt-2.5 pr-2.5 pb-2.5 pl-2.5 h-7">
            <img width="10px" height="10px" src="/assets/RedButton.svg" alt="Red" />
            <img width="10px" height="10px" src="/assets/YellowButton.svg" alt="Yellow" />
            <img width="10px" height="10px" src="/assets/GreenButton.svg" alt="Green" />
          </div>
        </div>

        <div className="flex flex-col-reverse justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 w-[752px] max-h-60 overflow-y-scroll overflow-x-hidden scrollbar-thumb-slate-500 scrollbar-track-black-100 scrollbar">
          <div className="font-jetbrains-mono text-sm  text-rose-400 text-opacity-100 leading-normal font-medium">
          <ul>
          {
            // Show the newest log entry at the top
            logEntries.map((logEntry: LogEntry, index: number) => {
              return (
                <li key={index}>
                  <span className="font-jetbrains-mono text-sm min-w-[20px] whitespace-nowrap text-slate-500 text-opacity-100 leading-normal font-medium">{index+1}</span>&nbsp;&nbsp;{logEntry.message}
                </li>
              )}
            )
          }
          </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
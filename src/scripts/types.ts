export interface scripts {
  [key:string]: (argv: string[]) => Promise<void>
}

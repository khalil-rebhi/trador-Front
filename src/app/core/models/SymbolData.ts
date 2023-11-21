export class SymbolData {
      forEach(arg0: (item: any, index: any) => void) {
        throw new Error('Method not implemented.');
      }
   
      public symbol: string;
      public chg: number;
      public chgPercent: number;
      public lastCloseValue: number;
      public adjacentVolume: number;
      public buySignal: string;
      public sellSignal: string;
      public smaSignal: string;
      public rsiSignal: string;
     
  }
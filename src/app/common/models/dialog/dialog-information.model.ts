export interface IDialogInformation {
  type: string;
  content: string;
  contentchangephone?:string;
  positive?: {
    title: string;
    click(data?: object): void;
  };
  negative: {
    title: string;
    click(): void;
  };
}

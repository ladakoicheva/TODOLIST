
export interface TodosI {
  id: string; // id обычно оставляют простым полем
  [TodosFields.Text]: string;
  [TodosFields.IsDone]: boolean;
}

export enum TodosFields {

  Text = 'text',
  IsDone = 'isDone',
}


export interface TodosI {
  id: string;
  [TodosFields.Text]: string;
  [TodosFields.IsDone]: boolean;
  [TodosFields.status]:status
}

export enum TodosFields {

  Text = 'text',
  IsDone = 'isDone',
  status = 'status'
}

export type status = "NEW" | 'UPDATED'



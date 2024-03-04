export interface SObjectResponse<T = unknown> {
  totalSize: number;
  done: boolean;
  records: T[];
}

export interface Contact {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
}

export interface UpdateSObjectParams {
  objectName: string;
  id: string;
  payload: any;
}

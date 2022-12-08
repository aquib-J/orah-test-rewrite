export interface IStudent {
  id?:number,
  first_name: string;
  last_name: string;
  photo_url: string;
}

export interface UpdateStudent {
  first_name?: string;
  last_name?: string;
  photo_url?: string;
}

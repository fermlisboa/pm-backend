
export class UpdateUserDTO {
  constructor(user?: UpdateUserDTO) { }

  id?: string;
  name?: string;
  username?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class UpdateProjectDTO {
  constructor(project?: UpdateProjectDTO) { }

  id?: string;
  title?: string;
  zip_code?: string;
  cost?: number;
  deadline?: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
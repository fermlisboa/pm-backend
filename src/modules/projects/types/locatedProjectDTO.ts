import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/users/entities/user.entity";

export class LocatedProjectDTO {
  constructor(project?: LocatedProjectDTO) { }

  @ApiProperty({ description: 'Project id', type: String, example: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" })
  id?: string;
  @ApiProperty({ description: 'Project title', type: String, example: "Project 1" })
  title?: string;
  @ApiProperty({ description: 'Project zip code', type: String, example: "88010400" })
  zip_code?: string;
  @ApiProperty({ description: 'Project cost', type: Number, example: 10000 })
  cost?: number;
  @ApiProperty({ description: 'Project e-mail', type: String, example: "2022-09-31T00:00:00.000Z" })
  deadline?: Date;
  @ApiProperty({ description: 'Project e-mail', type: User, example: "fulanodasilva123" })
  user?: User;
  @ApiProperty({ description: 'Project e-mail', type: String, example: "2022-09-31T00:00:00.000Z" })
  created_at?: Date;
  @ApiProperty({ description: 'Project e-mail', type: String, example: "2022-09-31T00:00:00.000Z" })
  updated_at?: Date;
  @ApiProperty({ description: 'Project e-mail', type: String, example: "2022-09-31T00:00:00.000Z" })
  deleted_at?: Date;
  @ApiProperty({ description: 'Project Location', type: String, example: "São Paulo/SP" })
  location?: string;
}
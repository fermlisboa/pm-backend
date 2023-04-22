import { ApiProperty } from '@nestjs/swagger';

export class jwtUserDTO {

  @ApiProperty({ description: 'Username', type: String, example: "fulanosilva123" })
  username: string;
  @ApiProperty({ description: 'User name', type: String, example: "fulano da silva" })
  name: string;
}

import { ApiProperty, ApiOkResponse } from '@nestjs/swagger';

class UserDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  id: string;
}

class ItemDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}

export class PaginatedResponseDto {
  @ApiProperty({ type: [ItemDto] })
  items: ItemDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;
}

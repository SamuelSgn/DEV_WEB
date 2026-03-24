import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsDateString()
  dueTime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  status?: string;
}


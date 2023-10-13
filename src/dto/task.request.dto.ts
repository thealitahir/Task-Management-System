import { IsString, IsOptional, IsIn, IsDate, IsNotEmpty, MaxLength } from 'class-validator';

export class TaskDto {
  @IsString({ message: 'Description must be a string' })
  @MaxLength(30)
  @IsNotEmpty()
  title: string;

  @IsString({ message: 'Category must be a string' })
  @IsNotEmpty()
  category: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsIn(['PENDING', 'COMPLETED'], { message: 'Status must be "PENDING" or "COMPLETED"' })
  @IsOptional()
  status?: string;

  @IsString({ message: 'Invalid date format' })
  @IsOptional()
  dueDate?: string; // Change type to string

  @IsDate({ message: 'Invalid date format' })
  @IsOptional()
  createdAt?: Date;
}

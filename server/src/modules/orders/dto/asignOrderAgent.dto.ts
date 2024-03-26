import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class AssignOrderAgentDto {
  @IsNotEmpty()
  @IsNumber()
  agentId: number

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one order item is required' })
  @IsNumber(
    {},
    { each: true, message: 'Each item in orderItems must be a number' },
  )
  orderItems: number[]
}

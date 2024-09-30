export interface SignUpResponseDto {
  status: number;
  message: string;
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

export interface SignUpErrorDto {
  status: number;
  message: string;
}

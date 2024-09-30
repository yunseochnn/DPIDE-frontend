export interface LoginResponseDto {
  status: number;
  message: string;
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

export interface LoginErrorResponseDto {
  status: number;
  message: string;
}

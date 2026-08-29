class ApiError extends Error {
  success: boolean = false;

  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export default ApiError;

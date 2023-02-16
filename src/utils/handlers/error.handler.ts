class HttpException extends Error {
  status: number;
  message: string;

  constructor(status = 500, message = '') {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
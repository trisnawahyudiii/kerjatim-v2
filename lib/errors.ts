export class ApplicationError extends Error {
  get details() {
    return {};
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        details: this.details,
      },
    };
  }
}

export class InsufficentArgumentError extends ApplicationError {
  constructor(argument: string) {
    super(`${argument} is required`);
    this.name = "InsufficentArgumentError";
  }
}

export class DuplicateRecordError extends ApplicationError {
  protected record: string;

  constructor(record: string) {
    super(`${record} already exist`);
    this.record = record;
    this.name = "DuplicateRecordError";
  }

  get details() {
    return { record: this.record };
  }
}

export class RecordNotFoundError extends ApplicationError {
  protected record: string;

  constructor(name: string) {
    super(`${name} not found`);
    this.record = name;
  }

  get details() {
    return { record: this.record };
  }
}

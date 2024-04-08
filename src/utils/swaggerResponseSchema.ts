export const swaggerResponseSchema = (data: any) => {
  return {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        example: '0000',
      },
      message: {
        type: 'string',
        example: 'Success',
      },
      data,
    },
  };
};

export const swaggerErrorValidationErrorSchema = (data?: any) => {
  return {
    description: 'Validation Error',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              property: {
                type: 'string',
                example: 'email',
              },
              errors: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
        },
        errors: {
          type: 'string',
          example: 'Unprocessable Entity',
        },
        statusCode: {
          type: 'number',
          example: 422,
        },
      },
    },
  };
};

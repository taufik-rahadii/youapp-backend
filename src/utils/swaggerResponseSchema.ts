export const swaggerResponseSchema = (data: any) => {
  return {
    type: 'object',
    properties: {
      status: {
        type: 'string',
      },
      message: {
        type: 'string',
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

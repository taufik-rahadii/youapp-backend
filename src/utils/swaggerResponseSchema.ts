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

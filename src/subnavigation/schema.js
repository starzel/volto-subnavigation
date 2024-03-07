export const Schema = (props) => {
  return {
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'depth'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
        widget: 'text',
      },
      depth: {
        title: 'Depth (1 - 4)',
        type: 'number',
        default: 2,
        minimum: 1,
        maximum: 4,
      },
    },
  };
};

export default Schema;

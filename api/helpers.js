export function returnResponseOrError(response) {
  if (response.status < 200 || response.status >= 300) throw response.data;

  return response.data;
}

export function augmentResponseForTable(response) {
  return response?.data.reduce(
    (final, each) => {
      return {
        ids: [...final.ids, each?.id],
        values: {
          ...final.values,
          [each?.id]: each,
        },
      };
    },
    { ids: [], values: {} }
  );
}

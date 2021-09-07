function formatResponseForTable(response = []) {
  return response.data.reduce(
    (final, each) => {
      return {
        ids: [...final.ids, each.id],
        values: {
          ...final.values,
          [each.id]: each,
        },
      };
    },
    { ids: [], values: {} }
  );
}

export default formatResponseForTable;

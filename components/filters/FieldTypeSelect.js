import React, { useEffect, useState } from 'react';
import BaseFilter from 'components/filters/BaseSelect';
import FieldTypesApi from 'api/fieldTypes';
import useNotifier from 'hooks/useToast';

function FieldTypeSelect({ value, ...props }) {
  const notify = useNotifier();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchFieldTypes() {
    try {
      setIsLoading(true);
      const response = await FieldTypesApi.list();
      console.log('fetched field types -> ', response);
      setOptions(response);
    } catch (error) {
      notify.error(error || 'Failed to fetch field types');
      console.error('failed to fetch field types');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchFieldTypes(); }, []);

  const selectedValue = options.find(each => each.id === value);

  return <BaseFilter
    {...props}
    options={options}
    value={selectedValue}
    isLoading={isLoading}
  />;
}

export default FieldTypeSelect;
import React, { useState, useEffect } from 'react';
import BaseFilter from './BaseSelect';
// import { useQuery } from 'react-query';
import FieldApi from 'api/fields';
// import { listFields } from 'api/queries';
// import { notify } from 'App';
// import { useStateContext } from 'state/StateContext';
import useNotifier from 'hooks/useToast';


function FieldFilter({ value, onChange = () => { }, placeholder = 'Select a field..', }) {
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotifier();

  const fetchFields = async () => {
    try {
      setIsLoading(true);
      const response = await FieldApi.list();
      console.log('fetched source fields -> ', response);
      setFields(Object.values(response));
    } catch (e) {
      notify.error('Failed to fetch source fields');
      console.error('failed to fetch source fields -> ', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  // if (isError) notify.error(error || 'Failed to fetch fields');

  const selectedField = fields.find(each => each.id === value);

  return <BaseFilter
    isLoading={isLoading}
    options={fields}
    placeholder={placeholder}
    onChange={onChange}
    value={selectedField}
    getOptionValue={r => r?.id}
  />;
}

export default FieldFilter;
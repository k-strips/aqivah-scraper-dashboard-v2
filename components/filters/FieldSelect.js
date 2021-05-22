import React, { useState, useEffect } from 'react';
import BaseFilter from './BaseSelect';
// import { useQuery } from 'react-query';
import FieldApi from 'api/fields';
import useNotifier from 'hooks/useToast';


function FieldFilter({ value, ...props }) {
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotifier();

  const fetchFields = async () => {
    try {
      setIsLoading(true);
      const response = await FieldApi.list();
      // console.log('fetched source fields -> ', response);
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

  useEffect(() => {
    if (!value) return;
    console.log('new value -> ', value);
  }, [value]);

  // if (isError) notify.error(error || 'Failed to fetch fields');
  let selectedField = '';
  if (typeof value === 'string')
    selectedField = fields.find(each => each.id === value);

  return <BaseFilter
    {...props}
    isLoading={isLoading}
    options={fields}
    value={selectedField || value}
  // getOptionValue={r => r?.id}
  />;
}

export default FieldFilter;
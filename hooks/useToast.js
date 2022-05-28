import { toast } from 'react-toastify';

function useNotifier() {
  return {
    success: msg => toast.success(msg || 'Success'),
    info: msg => toast.info(msg),
    error: msg => toast.error(msg || 'Error'),
    warning: msg => toast.warning(msg),
  };
}

export default useNotifier;
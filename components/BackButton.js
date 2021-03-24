import { ArrowLeft } from 'react-feather';
import { useRouter } from 'next/router';


function BackButton() {
  const router = useRouter();

  return <span style={{ cursor: 'pointer', }}><ArrowLeft style={{ marginRight: '15px', }} onClick={() => { router.back(); }} /></span>;
}

export default BackButton;
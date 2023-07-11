import { useParams } from 'react-router-dom';
import TestComponent from '../components/TestComponent/TestComponent';

function SingleTestPage() {
  const { id } = useParams();

  return (
    <div className="container-fluid text-center py-5">
      <TestComponent testId={id} />
    </div>
  );
}

export default SingleTestPage;

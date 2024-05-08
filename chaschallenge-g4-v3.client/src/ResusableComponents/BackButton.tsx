// @ts-nocheck
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} style={{ position: 'sticky', top: 0 }}>
      Back
    </button>
  );
}

export default BackButton;

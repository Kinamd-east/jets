import { useNavigate } from "react-router";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);
  return <h1>Success!!! redirecting</h1>;
};

export default Success;

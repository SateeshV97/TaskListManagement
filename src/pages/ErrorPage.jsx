import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link
        style={{ cursor: "pointer" }}
        variant="body2"
        onClick={() => navigate("/login")}
      >
        {"Click here to login"}
      </Link>
    </div>
  );
};
export default ErrorPage;

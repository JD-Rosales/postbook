import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Image from "./image";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  console.log(error);
  return (
    <>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occured.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
        <br />
        <Image />
      </div>
    </>
  );
};

export default index;

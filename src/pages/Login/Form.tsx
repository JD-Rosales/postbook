import { useState } from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useNavigate } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import axios from "axios";
import { useGetUser, useLogin } from "@src/hooks/useAuth";

interface FormProps {}

const Form: React.FC<FormProps> = ({}) => {
  const { data } = useGetUser();
  const { mutate: loginUser } = useLogin();
  // const { isLoading, data } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: () => axios.get("https://jsonplaceholder.typicode.com/todos/"),
  // });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const handlePasswordShown = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser(formData);

    // axios
    //   .post(import.meta.env.VITE_API_URL + "/login", formData)
    //   .then((response) => {
    //     console.log(response.data);
    //     localStorage.setItem("token", JSON.stringify(response.data.token));
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //   });
  };
  return (
    <>
      <form className="h-fit" onSubmit={handleSubmit}>
        <Input
          className="mt-4"
          type="text"
          placeholder="Email"
          name="email"
          required
          error
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          type={passwordShown ? "text" : "password"}
          placeholder="Password"
          name="password"
          icon={passwordShown ? MdOutlineVisibility : MdOutlineVisibilityOff}
          iconPosition="end"
          iconClick={handlePasswordShown}
          required
          value={formData.password}
          onChange={handleChange}
        />

        <Button className="mt-6" variant={"default"} fullWidth>
          Login
        </Button>
      </form>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <Button
        className="mt-0"
        variant={"secondary"}
        onClick={() => {
          navigate("/signup");
        }}
        fullWidth
      >
        Create an Account
      </Button>

      {/* <div>
        {data?.data.map((todo: any) => {
          return <p key={todo.id}>{todo.title}</p>;
        })}
      </div> */}
    </>
  );
};

export default Form;

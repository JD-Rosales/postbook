import { useState } from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";

interface FormProps {}

const Form: React.FC<FormProps> = ({}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          className="mt-4"
          type="password"
          placeholder="Password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Button className="mt-4" variant={"default"} fullWidth>
          Login
        </Button>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <Button className="mt-0" variant={"secondary"} fullWidth>
          Create an Account
        </Button>
      </form>
    </>
  );
};

export default Form;

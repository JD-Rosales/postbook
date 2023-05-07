import Form from "./Form";
import Image from "./Image";
interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <>
      <div className="h-full flex flex-row">
        <div className="w-1/2 hidden md:flex justify-center items-center">
          <Image className="w-9/12" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center ">
          <div className="w-[370px] px-5 py-4 text-center">
            <h1 className="text-2xl text-primary font-bold">
              Create your Account
            </h1>
            <p className="mt-3 leading-tight">
              Lorem ipsum, dolor sit amet consectetur adipisicing.
            </p>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;

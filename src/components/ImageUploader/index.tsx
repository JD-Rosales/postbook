import { useRef } from 'react';
import { cn } from '@lib/utils';
import { MonitorUp, X, PenLine } from 'lucide-react';
import { AspectRatio } from '@ui/aspect-ratio';

interface ImageUploaderProps {
  changeHandler: (value: string) => void;
  value: string;
  className?: string;
}

const Index: React.FC<ImageUploaderProps> = ({
  changeHandler,
  value,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = (res) => {
        changeHandler(res.target?.result?.toString() ?? '');
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    } else {
      changeHandler('');
    }
  };

  const handleRemoveImage = () => {
    changeHandler('');
  };

  return (
    <div className={cn('mb-4', className)}>
      {!value ? (
        <div className='relative bg-gray-100 border-dashed border-2 border-primary h-[200px]'>
          <input
            className='absolute w-full h-full cursor-pointer opacity-0'
            type='file'
            name='img-uploader'
            id={`img-uploader`}
            multiple={false}
            onChange={handleFileChange}
          />

          <div className='h-full flex flex-col items-center justify-center'>
            <MonitorUp size={50} className='text-primary mb-2' />
            <p className='text-center px-2 text-lg'>
              Choose a file or drag in here
            </p>
            <span className='text-xs'>JPEG, PNG</span>
          </div>
        </div>
      ) : (
        <AspectRatio ratio={16 / 9}>
          <input
            ref={inputRef}
            className='absolute w-full h-full cursor-pointer opacity-0 invisible'
            type='file'
            name='img-uploader'
            id={`img-uploader`}
            multiple={false}
            onChange={handleFileChange}
          />

          <img
            src={value}
            alt='Choosen File'
            className='rounded-lg object-cover w-full h-full'
          />

          <span
            onClick={() => {
              if (inputRef.current) inputRef.current.click();
            }}
            className='absolute top-3 right-16 p-[6px] bg-muted rounded-lg cursor-pointer hover:opacity-80'
          >
            <PenLine size={20} />
          </span>

          <span
            onClick={handleRemoveImage}
            className='absolute top-3 right-4 p-[6px] bg-muted rounded-lg cursor-pointer hover:opacity-80'
          >
            <X size={20} />
          </span>
        </AspectRatio>
      )}
    </div>
  );
};

export default Index;

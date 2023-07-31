import { Textarea } from '@ui/textarea';
interface TextInputType {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

console.log('Rerender TextInput');
const TextInput: React.FC<TextInputType> = ({ value, handleChange }) => {
  return (
    <Textarea
      className='text-base'
      placeholder='Type your post text here.'
      name='text'
      onChange={handleChange}
      value={value}
    />
  );
};

export default TextInput;

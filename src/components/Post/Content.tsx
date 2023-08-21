import { CardContent } from '@components/ui/card';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { lazy, useEffect, useRef, useState } from 'react';
import usePostDialog from '@src/contextsHooks/usePostDialog';

const SharedPost = lazy(() => import('./SharedPost'));
interface ContentProps {
  data: PostAuthor;
}

const Content: React.FC<ContentProps> = ({ data }) => {
  const { isOpen, setDialogData, dialogState } = usePostDialog();

  const [localState, setLocalState] = useState({
    text: data.text ?? '',
    photo: data.photo ?? '',
  });
  const textRef = useRef<HTMLParagraphElement>(null);

  const handleChange = (e: ContentEditableEvent) => {
    const text = e.target.value;

    setLocalState((value) => ({ ...value, text: text }));
  };

  useEffect(() => {
    if (data.id === dialogState?.id) {
      setDialogData(localState);
    }
  }, [data.id, dialogState?.id, localState, setDialogData]);

  return (
    <CardContent className='pb-3 px-3 sm:px-6'>
      <div className='relative'>
        <ContentEditable
          innerRef={textRef}
          disabled={!isOpen}
          className={`mb-2 focus-visible:outline-none bg-transparent break-all`}
          html={localState.text}
          onChange={handleChange}
          tagName='p'
        />

        {/* Placeholder for the ContentEditable */}
        {isOpen && !localState.text && (
          <p className='absolute top-0 text-gray-500 pointer-events-none'>
            Input your post content here.
          </p>
        )}
      </div>

      {data?.photo && (
        <div className='relative w-full h-[200px] sm:h-[300px] rounded-lg'>
          <img
            className='rounded-lg w-full h-full object-cover'
            src={data.photo}
            alt=''
          />
        </div>
      )}

      {data.sharedPost && <SharedPost data={data.sharedPost} />}

      {/* render if original post have been deleted */}
      {data.sharedPostId && !data.sharedPost && (
        <p className='text-red-500'>Original Post have been deleted</p>
      )}
    </CardContent>
  );
};

export default Content;

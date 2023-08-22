import { CardContent } from '@components/ui/card';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { lazy, useEffect, useRef, useState } from 'react';
import usePostDialog from '@src/contextsHooks/usePostDialog';
import { AspectRatio } from '@ui/aspect-ratio';
import ImageUploader from '@components/ImageUploader';

const SharedPost = lazy(() => import('./SharedPost'));
interface ContentProps {
  data: PostAuthor;
  isEditable?: boolean;
}

const Content: React.FC<ContentProps> = ({ data, isEditable = false }) => {
  const { setDialogData, dialogState } = usePostDialog();

  const [localState, setLocalState] = useState({
    text: data.text ?? '',
    photo: data.photo ?? '',
  });

  const textRef = useRef<HTMLParagraphElement>(null);

  const handleChange = (e: ContentEditableEvent) => {
    const text = e.target.value;

    setLocalState((prev) => ({ ...prev, text: text }));
  };

  const handlePhotoChange = (value: string) => {
    setLocalState((prev) => ({ ...prev, photo: value }));
  };

  // updated local component state when state from parent change
  useEffect(() => {
    if (data) {
      setLocalState({ text: data?.text ?? '', photo: data?.photo ?? '' });
    }
  }, [data]);

  // bind the state changes to dialog state if post is editing
  useEffect(() => {
    if (data.id === dialogState?.id && isEditable) {
      setDialogData(localState);
    }
  }, [data.id, dialogState?.id, isEditable, localState, setDialogData]);

  return (
    <CardContent className='pb-3 px-3 sm:px-6'>
      <div className='relative'>
        <ContentEditable
          innerRef={textRef}
          disabled={!isEditable}
          className={`mb-2 focus-visible:outline-none bg-transparent break-all`}
          html={localState.text}
          onChange={handleChange}
          tagName='p'
        />

        {/* Placeholder for the ContentEditable */}
        {isEditable && !localState.text && (
          <p className='absolute top-0 text-gray-500 pointer-events-none'>
            Input your post content here.
          </p>
        )}
      </div>

      {/* Do not render Image uploader if the post is a shared post */}
      {isEditable && data.id === dialogState?.id && !data.sharedPostId ? (
        <ImageUploader
          value={localState.photo}
          changeHandler={handlePhotoChange}
        />
      ) : (
        data?.photo && (
          <AspectRatio ratio={16 / 9}>
            <img
              className='rounded-lg w-full h-full object-cover'
              src={data.photo}
              alt='Post Photo'
            />
          </AspectRatio>
        )
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

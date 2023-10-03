import { CardHeader } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

type HeaderProps = {
  data: PostAuthor;
};

export default function Header({ data }: HeaderProps) {
  const [postDate, setPostDate] = useState(
    formatDistanceToNow(new Date(data.createdAt), {
      addSuffix: true,
    })
  );

  const nameRenderer = useCallback((): string => {
    if (data.author.profile) {
      return `${data.author.profile.firstName} ${data.author.profile.middleName} ${data.author.profile.lastName}`;
    } else if (data.author.email) {
      return `${data?.author.email}`;
    } else return ``;
  }, [data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPostDate(
        formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [data.createdAt]);
  return (
    <CardHeader>
      <div className='relative flex align-middle items-center font-semibold'>
        <div className='bg-slate-300 p-[2px] rounded-full'>
          <Avatar className='text-sm h-[55px] w-[55px]'>
            <AvatarImage src={data.author.profile?.profilePhoto} />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
        </div>

        <div className='flex flex-col ml-2 '>
          <span>{nameRenderer()}</span>
          <span className='font-normal text-xs'>
            {`${data.postType} ${postDate}`}
          </span>
        </div>
      </div>
    </CardHeader>
  );
}

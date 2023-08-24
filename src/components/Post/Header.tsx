import { useState, useEffect, useCallback } from 'react';
import { CardHeader } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

type HeaderProps = {
  data: PostAuthor;
};

const Header: React.FC<HeaderProps> = ({ data }) => {
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
      <div className='flex align-middle items-center font-semibold'>
        <Avatar className='text-sm h-[55px] w-[55px]'>
          <AvatarImage src={data.author.profile?.profilePhoto} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>

        <div className='flex flex-col ml-2'>
          <Link to={'/user/' + data.authorId} className='hover:underline'>
            {nameRenderer()}
          </Link>
          <span className='font-normal text-xs'>
            {`${data.postType} ${postDate}`}
          </span>
        </div>
      </div>
    </CardHeader>
  );
};

export default Header;

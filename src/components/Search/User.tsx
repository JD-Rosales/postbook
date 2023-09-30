import { parseJwtId } from '@src/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

type UserProps = {
  data: UserProfileType;
};

function User({ data }: UserProps) {
  const nameRenderer = useCallback((): string => {
    if (data.profile) {
      return `${data.profile.firstName} ${data.profile.middleName} ${data.profile.lastName}`;
    } else if (data.email) {
      return `${data.email}`;
    } else return ``;
  }, [data]);

  return (
    <Link
      to={`/user/${data.id}`}
      className='flex py-[.3rem] px-1 rounded-lg hover:bg-slate-200 cursor-pointer transition-all duration-300 ease-out'
    >
      <div className='relative p-[.12rem] bg-slate-300 rounded-full w-fit'>
        <Avatar className='w-[40px] h-[40px]'>
          <AvatarImage src={data.profile?.profilePhoto} />
          <AvatarFallback className='text-xs'>DP</AvatarFallback>
        </Avatar>
      </div>

      <div className='flex flex-col ml-1 overflow-hidden'>
        <span className='truncate max-w-full'>{nameRenderer()}</span>
        {data.id === parseJwtId() ? (
          <span className='text-xs italic text-slate-500'>You</span>
        ) : (
          <span className='text-xs italic text-slate-500'>View Profile</span>
        )}
      </div>
    </Link>
  );
}

export default User;

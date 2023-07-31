// Libraries
import Cookies from 'cookies';
import Link from 'next/link'
import { GetServerSideProps } from "next";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUser, getAllUsers } from '@/lib/getData';

// Components
import UserQuestions from '@/components/UI/UserQuestions';
import DiscordAvatar from '@/components/UI/DiscordAvatar';
import { PageWrapper } from '@/components/UI/PageWrapper';

// Types
import type { IUser } from '@/utils/types';

interface IProps {
  user: IUser,
  users: any,
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
  }
}

// TODO: Implement pagination with styled chips for filtering and styled page selectors
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');
  const user = await getUser(token);
  const users = await getAllUsers(token, 1, 100);
  const pagination = users.meta.pagination;

  return {
    props: {
      user,
      users,
      pagination
    }
  }
}

export default function UserPanel({ user, users: allUsers, pagination }: IProps) {
  const router = useRouter();
  const [users, setUsers] = useState(allUsers.data);
  const [opened, setOpened] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(pagination.page);
  const [pageCount, setPageCount] = useState(pagination.pageCount);
  const [pageSize] = useState(pagination.pageSize);

  useEffect(() => {
    if (user === null) {
      router.push('/auth/logout');
    }
  }, [page])

  function handleOpen(index: number) {
    if (opened !== index) {
      setOpened(index);
    } else {
      setOpened(null);
    }
  }

  return (
    <PageWrapper user={user} title="World of Gaian - Admin Panel">
      <div>
        <div>
          <input
            className='border-2 border-slate-400 rounded-md w-full mb-2 p-2'
            placeholder='Search Users'
            onChange={(e) => {
              setSearch(e.target.value.trim());

              if (opened) {
                setOpened(null);
              }
            }}
          />
          {/* <button>New User</button>
          <button>Admin</button>
          <button>Authenticated User</button> */}
        </div>
        <div>
          {users
            .filter((user: IUser) => (user.username).toLowerCase().includes(search))
            .map((user: IUser, index: number) => {
              return (
                <div className='flex flex-col my-5 border-2 border-slate-400 rounded-lg hover:border-slate-700 hover:cursor-pointer' onClick={() => { handleOpen(index) }}>
                  <div className='flex'>
                    <DiscordAvatar
                      src={`${user.avatar}.png`}
                      width={64}
                      height={64}
                      classes={`mr-3 ${opened === index ? 'rounded-tl-md' : 'rounded-l-md'}`}
                      id={user.providerId}
                      key={user.providerId}
                    />
                    <div className='flex flex-col justify-center'>
                      <div className='flex items-center'>
                        <p className='text-lg pr-3'>{user.username}</p>
                        <p className='text-sm text-slate-600'>{user.role?.name}</p>
                      </div>
                      <p className='text-sm text-slate-600'>{user.availability?.timezone}</p>
                    </div>
                  </div>
                  <div className={`${opened === index ? 'block' : 'hidden'}`}>
                    <UserQuestions optional={user.optionalQuestions} readonly={true} />
                  </div>
                </div>
              )
            })}
        </div>
        {/* <div className='flex justify-center'>
          {page > 1 &&
            <span
              className='hover:cursor-pointer'
              onClick={() => { setPage(page - 1) }}>
              Prev
            </span>}
          <div>
            {Array.from({ length: pageCount }, (_, index) => (
              <Link href={``} className='mx-1' onClick={() => { setPage(index + 1) }}>{index + 1}</Link>
            ))}
          </div>
          {page < pageCount &&
            <span
              className='hover:cursor-pointer'
              onClick={() => { setPage(page + 1) }}>
              Next
            </span>}
        </div> */}
      </div>
    </PageWrapper>
  )
}
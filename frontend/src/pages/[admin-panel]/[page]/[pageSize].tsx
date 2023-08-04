// Libraries
import Cookies from 'cookies';
import Link from 'next/link';
import axios from 'axios';
import { GetServerSideProps } from "next";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import UserQuestions from '@/components/UI/UserQuestions';
import DiscordAvatar from '@/components/UI/DiscordAvatar';
import { PageWrapper } from '@/components/UI/PageWrapper';

// Utils
import { getUser, getAllUsers } from '@/lib/getData';

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
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const page = query.page ? parseInt(query['page'] as string) : 1;
  const pageSize = query.pageSize ? parseInt(query['pageSize'] as string) : 5;

  const cookies = new Cookies(req, res);
  const token = cookies.get('token');
  const user = await getUser(token);
  const users = await getAllUsers(token, page, pageSize);
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
  }, [])

  useEffect(() => {
    setUsers(allUsers.data);
    setPage(pagination.page);
    setPageCount(pagination.pageCount);
  }, [allUsers, pagination])

  useEffect(() => {
    handleSearch();
  }, [search])

  // TODO: When user clicks chip, filter all users by selected chips.
  // function chipReducer(state: any, action: any) {
  //   switch (action.type) {
      // ? Case Filter
      // ? Case Remove
      // ? Case Add New Filter - Maybe in the future.
  //   }
  // }

  async function handleSearch() {
    const response = await axios.get(`${process.env.REACT_APP_FRONTEND}/api/users`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      })

    if (opened !== null) {
      setOpened(null);
    }

    if (search === "") {
      const left = (page * pageSize) - pageSize;
      const right = page * pageSize;
      setUsers(response.slice(left, right));
    } else {
      const filteredUsers = response.filter(
        (user: IUser) => user.username.toLowerCase().includes(search)
      );
      setUsers(filteredUsers);
    }
  }

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
              setSearch(e.currentTarget.value);

              if (opened) {
                setOpened(null);
              }
            }}
          />
          {/* <div className='mt-2 mb-5'>
            <ChipFilter value={'New User'} />
            <ChipFilter value={'Admin'} />
            <ChipFilter value={'Authenticated'} />
          </div> */}
        </div>
        <div className='h-120 overflow-y-auto overflow-x-hidden'>
          {users.length > 0 ?
            users
              .map((user: IUser, index: number) => {
                return (
                  <div className='flex flex-col my-5 border-2 border-slate-400 rounded-lg overflow-x-hidden hover:border-slate-700 hover:cursor-pointer' onClick={() => { handleOpen(index) }}>
                    <div className='flex'>
                      <DiscordAvatar
                        src={`${user.avatar}.png`}
                        width={64}
                        height={64}
                        classes={`mr-3 ${opened === index ? 'rounded-tl-md' : 'rounded-l-md'}`}
                        id={user.providerId}
                        key={user.providerId}
                      />
                      <div className='flex flex-col justify-center h-16'>
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
              }) :
            <p className='text-center my-10 md:my-20'>No Users Were Found</p>
          }
        </div>
        {search === "" &&
          <div className='flex justify-center'>
            <p className='w-9'>
              {page > 1 &&
                <Link
                  href={`/admin-panel/${page - 1}/${pageSize}`}
                  className=''
                  onClick={() => { setPage(page - 1) }}>
                  Prev
                </Link>
              }
            </p>
            <div>
              {Array.from({ length: pageCount }, (_, index) => (
                <Link href={`/admin-panel/${index + 1}/${pageSize}`} className={`${page === index + 1 && 'border-b-2'} border-slate-400 hover:border-black mx-1`} onClick={() => { setPage(index + 1) }}>{index + 1}</Link>
              ))}
            </div>
            <p className='w-9'>
              {page < pageCount &&
                <Link
                  href={`/admin-panel/${page + 1}/${pageSize}`}
                  className=''
                  onClick={() => { setPage(page + 1) }}>
                  Next
                </Link>
              }
            </p>
          </div>
        }
      </div>
    </PageWrapper>
  )
}
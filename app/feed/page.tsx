'use client'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
const Feed = () => {
    const [users, setUsers] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef= useRef(isLoading);
    const [page, setPage] = useState(1);
    const fetchUsers = async () => {
        try {
                const response = await fetch(`https://dummyjson.com/users?limit=10&skip=${(page - 1) * 10}`);
                const data = await response.json();
                if(page==1){
                    setUsers(data.users);
                }
                else{
                    setUsers((prev:any) => [...prev, ...data.users]);
                }       
                setIsLoading(false);
                isLoadingRef.current = false;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


    const handleScroll=()=>{
        console.log('handling scroll');
        if(isLoadingRef.current){
            return;
        }
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 10){
            setPage(prevPage => prevPage + 1);
        }
    }

    const throttle = function (func: any, delay: number){
        let lastCall=0;
        let timer:any=null;
        return function(...args:any){
            const now= new Date().getTime();
            let remaining = delay - (now - lastCall);
            if(remaining <= 0){
                if(timer){
                    clearTimeout(timer);
                    timer=null;
                }
                func(...args);
                lastCall= new Date().getTime();
            }
            else if(!timer){
                timer=setTimeout(()=>{
                    console.log('coming here');
                    timer=null;
                    lastCall= new Date().getTime();
                    func(...args);
                },remaining);
            }
        }
    }

    useEffect(() => {
        setIsLoading(true);
        isLoadingRef.current = true;
        fetchUsers();
    }, [page])


    useEffect(()=>{
        console.log('feed mounted')
        window.addEventListener('scroll', throttle(handleScroll, 300));
        return()=>{
            console.log('Feed unmounted')
        }
    },[])

    if (isLoading && page === 1) {
        return(
        <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 align-center">Loading...</p>
        </div>)
    }

    return (
        <div className="mt-8">
            <div className='m-8'><Link href="/images">View Images</Link></div>
             
            <div className="flex justify-center items-center flex-col gap-4">
                <input type="text" placeholder="Search users..." className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="flex flex-col gap-4">
                    {
                        users?.map((user: any) => {
                            return (
                                <div key={user.id} className="border border-gray-300 rounded-md p-4 w-full max-w-md">
                                    <p>{user.firstName} {user.lastName}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {isLoading && page > 1 && (
                    <div className="flex justify-center items-center mt-4">
                        <p className="text-gray-500">Loading more...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Feed;
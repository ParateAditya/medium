export const FullBlogSkeleton = () => {
    return (
        <div className='flex flex-col items-center '>

            <div className="m-4  grid grid-cols-4  xl:w-3/5 w-3/4 justify-center">

                <div className='col-span-3 px-2'>
                    <div className='my-5'>
                        <div className="h-10 bg-slate-200 rounded-full mb-2"></div>
                        <div className="h-10 bg-slate-200 rounded-full mb-2"></div>
                    </div>
                    <div className="py-4 text-slate-600">
                        <div className="h-2 bg-slate-200 rounded-full w-24"></div>
                    </div>  
                    <div className="my-3">
                        <div className="space-y-4">
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>
                            <div className="h-2.5 bg-slate-200 rounded-full "></div>

                        </div>
                    </div>
                </div>
                <div className='col-span-1 px-2'>
                    <div className='my-5'>
                        <div className="h-1.5 bg-slate-200 rounded-full  w-20 mb-2">
                        </div>
                        <div className='flex items-center'>
                            <svg className="w-10 h-10 me-3 text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <div className='ml-4 font-semibold text-xl'>
                                <div className="h-2.5 bg-slate-200 rounded-full  w-20 "></div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
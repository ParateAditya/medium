export const BulkSkeleton = () => {
    return (
        <div>

            <div className="flex justify-center mb-10">
                <div className="flex flex-col  xl:w-3/5 w-3/4 text-lg border-b ">
                    <div className="flex items-center mt-2 m-1">
                        <svg className="w-10 h-10 me-3 text-slate-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div className="flex flex-col items-center pl-2">
                            <div className="h-3.5 bg-slate-200 rounded-full  w-48 "></div>
                        </div>
                        <div className="pl-2 flex ">
                            <div className="relative inline-flex items-center justify-center w-1 h-1 overflow-hidden bg-slate-200 rounded-full ">
                                <span className="text-xs text-slate-600 "></span>
                            </div>
                        </div>
                        <div className="flex items-center pl-2 text-slate-600">
                            <div className="h-3 bg-slate-200 rounded-full  w-10"></div>
                        </div>
                    </div>

                    <div className="mt-4 mb-8  capitalize">
                        <div className="h-4 bg-slate-200 rounded-full  w-full "></div>
                    </div>

                    <div className="h-3 bg-slate-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-3 bg-slate-200 rounded-full w-full mb-2.5"></div>
                    <div className="h-3 bg-slate-200 rounded-full w-full mb-2.5"></div>
                    <div className="mt-6 mb-10 text-slate-600">
                        <div className="h-3 bg-slate-200 rounded-full w-10 mb-2.5"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}
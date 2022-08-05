const SpinnerCol = () => {
  return (
    <div className='bg-white py-8 px-5 md:w-1/2 rounded-lg shadow-lg'>
        <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
            <div className="h-4  mb-10 bg-slate-400 rounded"></div>
            <div className="space-y-3">
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SpinnerCol;
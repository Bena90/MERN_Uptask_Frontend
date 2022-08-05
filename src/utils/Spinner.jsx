const Spinner = () => {
  return (
    <div className="shadow rounded-md bg-white p-4 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Spinner
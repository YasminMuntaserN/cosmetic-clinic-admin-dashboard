
export function PageNotFound() {
    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center overflow-hidden flex-col">
            <div className="w-1/4 h-1/4 flex justify-center items-center">
                <img src="/page-not-found.png" alt="Page 404"/>
            </div>
            <div className="text-center text-white animate-float">
                <h1 className="text-8xl font-bold m-0 bg-gradient-text bg-clip-text text-transparent drop-shadow-[2px_2px_20px_rgba(255,107,107,0.2)]">
                    404
                </h1>
                <p className="text-2xl my-5 text-gray-400">
                    Oops! Looks like you're lost in space
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-gradient-to-r from-[#FBD909] to-[#374151] text-white px-8 py-3 rounded-full font-medium 
                   transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(78,205,196,0.3)]"
                >
                    Return Home
                </button>
            </div>
        </div>
    );
}

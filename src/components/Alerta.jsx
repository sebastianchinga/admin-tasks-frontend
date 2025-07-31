const Alerta = ({ alerta }) => {
    const { msg, error } = alerta
    return (
        <div id="errorMessage" className={`${error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'} rounded-md p-4`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    {error ? (
                        <>
                            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </>
                    ) : (
                        <>
                            <svg
                                className="h-5 w-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </>
                    )}
                </div>
                <div className="ml-3">
                    <p className={`text-sm text-${error ? 'red' : 'green'}-800`} id="errorText">{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default Alerta
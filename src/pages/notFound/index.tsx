import "@/assets/css/404.css"

const NotFound: React.FC = () => {
    return (
        <>
            <div className='NotFound absolute z-0 max-h-[85vh] w-screen bg-slate-50 text-black dark:bg-[#0f0f0f] dark:text-white'>
                <div className='error'>
                    <div className='wrap'>
                        <div className='404'>
                            {/* <pre>
                                <code>
                                    <span className='green'>&lt;!</span>
                                    <span>DOCTYPE html</span>
                                    <span className='green'>&gt;</span>
                                    <span className='orange'>&lt;html&gt;</span>
                                    <span className='orange'>&lt;style&gt;</span>
                                    {"* { "}
                                    <span className='green'>everything</span>:
                                    <span className='blue'>awesome</span>;{"}"}
                                    <span className='orange'>&lt;/style&gt;</span>
                                    <span className='orange'>&lt;body&gt;</span>
                                    ERROR 404! FILE NOT FOUND!
                                    <span className='comment'>
                                        &lt;!--The file you are looking for, is not where you think
                                        it is.--&gt;
                                    </span>
                                    <span className='orange'></span>
                                </code>
                            </pre> */}
                        </div>
                        <code>
                            <br />
                            <span className='info'>
                                {/* <br />

                                <span className='orange'>&nbsp;&lt;/body&gt;</span>

                                <br />
                                <span className='orange'>&lt;/html&gt;</span> */}
                            </span>
                        </code>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound

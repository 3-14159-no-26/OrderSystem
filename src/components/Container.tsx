type ContainerProps = {
    children: React.ReactNode
}

const Container = (props: ContainerProps) => {
    return (
        <main className='mx-auto flex w-full max-w-5xl flex-col bg-slate-50 px-1 py-5 dark:bg-[#0f0f0f] md:flex-row md:px-4 md:py-10'>
            {props.children}
        </main>
    )
}

export default Container

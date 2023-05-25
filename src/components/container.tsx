type ContainerProps = {
    children: React.ReactNode
}

const Container = (props: ContainerProps) => {
    return (
        <main className='flex flex-col md:flex-row w-full px-1 py-5 md:px-4 md:py-10 mx-auto max-w-5xl'>
            {props.children}
        </main>
    )
}

export default Container

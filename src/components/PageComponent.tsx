interface pageComponent {
    title?: string;
    elements: number;
    children: any;
}

const PageComponent = ({elements, children}: pageComponent) => {
  return (
    <div className='p-5'>
        <div className='flex flex-col gap-2 mb-5'>
            {/* <h2 className='text-[#737373] font-bold text-lg'>{title}</h2> */}
            <span className='text-[#737373]'>{elements} {elements > 1 || elements == 0 ? "elementos" : "elemento"}</span>
        </div>

        {children}
    </div>
  )
}

export default PageComponent
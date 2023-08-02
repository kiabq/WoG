export default function ChipFilter({ value }: { value: string }) {    
    return (
        <div className='border-2 border-red-400 rounded-md inline p-1 mr-2 hover:bg-gray-50 hover:cursor-pointer'>
            {value}
        </div>
    )
}
export function Button({ ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={'bg-gray-600 p-2 rounded-sm hover:bg-gray-500 duration-300'} />
  )
}
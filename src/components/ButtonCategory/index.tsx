interface ButtonCategory extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  active: boolean
}

export function ButtonCategory({ active = false, ...rest }: ButtonCategory) {
  return (
    <button {...rest} className={`${active && 'bg-purple-200'} py-2 px-4 rounded-lg hover:bg-gray-500 duration-300 border-solid border-2 w-auto flex ${active ? 'border-purple-200 text-gray-100' : 'border-purple-100 text-purple-100'}`} />
  )
}
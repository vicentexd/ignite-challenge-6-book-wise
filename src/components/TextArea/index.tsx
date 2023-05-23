interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textLimit: number;
}

export function TextArea({ textLimit, value, ...rest }: Props) {
  return (
    <div className="flex">
      <div className="relative w-full">
        <textarea maxLength={textLimit} {...rest} className="h-32 resize-none outline-none py-3 px-5 bg-gray-800 border border-gray-500 text-gray-200 placeholder:text-gray-400 text-sm rounded-sm focus:ring-green-200 focus:border-green-200 block w-full" />
        <small className="absolute bottom-1 right-2 text-gray-400 text-xs">{`${value?.toString().length}/${textLimit}`}</small>
      </div>
    </div>
  )
}
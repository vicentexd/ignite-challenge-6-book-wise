interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textLimit: number;
}

export function TextArea({ textLimit, value, ...rest }: Props) {
  return (
    <div className="flex">
      <div className="relative w-full">
        <textarea value={value} maxLength={textLimit} {...rest} className="block w-full h-32 px-5 py-3 text-sm text-gray-200 bg-gray-800 border border-gray-500 rounded-sm outline-none resize-none placeholder:text-gray-400 focus:ring-green-200 focus:border-green-200" />
        <small className="absolute text-xs text-gray-400 bottom-1 right-2">{`${value?.toString().length}/${textLimit}`}</small>
      </div>
    </div>
  )
}
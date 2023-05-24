import Image from "next/image"

import googleLogo from '@/assets/google.png';
import gitHubLogo from '@/assets/github.png';
import visitorLogo from '@/assets/visitorRocket.png';

type Props = {
  type: 'google' | 'gitHub' | 'visitor',
  text: string;
  onClick: () => void
}
export function SignInButton({ onClick, type, text }: Props) {

  const getImageUrl = () => {
    if (type === 'google') {
      return googleLogo
    }

    if (type === 'gitHub') {
      return gitHubLogo
    }

    return visitorLogo
  }

  return (
    <button onClick={onClick} className="flex py-5 px-6 flex-1 gap-5 rounded-md items-center bg-gray-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
      <Image src={getImageUrl()} alt="logo signIn" />

      <h4 className="text-lg font-bold text-gray-200">
        {text}
      </h4>
    </button>
  )
}
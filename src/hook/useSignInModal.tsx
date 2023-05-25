import { SignInModal } from "@/components/SignInModal";
import React, { useContext, useMemo, useState } from "react";

interface ProviderProps {
  children: React.ReactNode
}

interface SignInModalContextProps {
  handleSignModal: () => void;
  modalVisible: boolean;
}

const SignInModalContext = React.createContext({} as SignInModalContextProps);

function SignInModalProvider({ children }: ProviderProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignModal = () => {
    setModalVisible(prev => !prev);
  }

  const values: SignInModalContextProps = useMemo(() => ({
    handleSignModal,
    modalVisible,
  }), [modalVisible])

  return (
    <SignInModalContext.Provider value={values}>
      <SignInModal visible={modalVisible} handleModal={handleSignModal} />
      {children}
    </SignInModalContext.Provider>
  )

}

function useSignInModal() {
  const context = useContext(SignInModalContext)

  return context;
}

export { useSignInModal, SignInModalProvider }
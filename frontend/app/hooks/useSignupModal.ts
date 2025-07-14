import {create} from "zustand";


interface SignupModalStore{
    isOpen: boolean;
    onOpen: () => void;
    close: () => void;
}

const useSignupModal = create<SignupModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))

export default useSignupModal;
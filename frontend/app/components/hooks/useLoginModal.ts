import {create} from "zustand";


interface LoginModalStore{
    isOpen: boolean;
    onOpen: () => void;
    close: () => void;
}

const userLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))

export default userLoginModal;
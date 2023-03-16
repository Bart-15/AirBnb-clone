import { FunctionComponent, useEffect } from "react";
import ReactDOM from 'react-dom';

export type IModalProps = {
    isShown: boolean;
    hide: () => void;
    modalContent: React.ReactNode;
    header: string;
  
}

const Modal: FunctionComponent<IModalProps> = ({
    isShown,
    hide,
    modalContent,
    header,
    }) => {

    const modal = (
        <div>
            <div className="fixed w-full h-full top-0 left-0 backdrop-blur-sm bg-black/10 z-20">
                <div className="grid place-items-center h-screen px-6">
                    <div className="z-10 rounded bg-white w-full max-w-4xl py-2">
                        <div className="flex justify-between px-4 py-2">
                            <h3 className="text-base md:text-xl font-semibold">{header}</h3>
                            <button className="bg-transparent text-primary" onClick={hide}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-4">
                            {modalContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
}
 
export default Modal;
import { useRef, useState, useEffect } from "react"
import { IoCloseCircleOutline } from "react-icons/io5"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

export default function ImagePreview({ sources, reset, files }) {
    const overlayRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [imageNumber, setImageNumber] = useState(0)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setVisible(false);
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    })
    const onOverlayClick = (e) => {
        e.stopPropagation();
        if (e.target === overlayRef.current) {
            setVisible(false);
        }
    }
    return <>
        <div className="flex justify-center items-center gap-2">
            {files.length > 1 && (<div className="text-gray-700 hover:text-white opacity-50 transition-all duration-200 ease rounded-full flex justify-center items-center circle hover:scale-90" style={{ width: "30px", height: "30px" }} onClick={() =>
                setImageNumber(imageNumber === files.length - 1 ? 0 : imageNumber + 1)
            }>
                <BsArrowLeft size={20} />
            </div>)}
            <div style={{ position: "relative" }}>

                <div style={{ margin: "10px 0", background: `url(${sources[imageNumber]})` }} className="onAnimation ImagePreview" onClick={() => setVisible(true)}>
                </div>
                <div className="getDanger" onClick={(e) => {
                    reset(false, imageNumber)
                    setImageNumber(0)
                }}>
                    <img src="https://img.icons8.com/material-outlined/15/ffffff/trash--v1.png" />
                </div>
            </div>
            {files.length > 1 && (<div className="text-gray-700 hover:text-white opacity-50 transition-all duration-200 ease rounded-full flex justify-center items-center circle hover:scale-90" style={{ width: "30px", height: "30px" }} onClick={() =>
                setImageNumber(imageNumber === 0 ? files.length - 1 : imageNumber - 1)
            }>
                <BsArrowRight size={20} />
            </div>)}
            {visible && (
                <div className="Overlay" ref={overlayRef} onClick={onOverlayClick}>
                    <img src={sources[imageNumber]} />
                    <div className="CloseIcon" onClick={() => setVisible(false)}>
                        <IoCloseCircleOutline size={70} />
                    </div>
                </div>
            )}
        </div>
    </>
}
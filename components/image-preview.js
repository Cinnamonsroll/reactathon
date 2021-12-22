import { useRef, useState, useEffect } from "react"
import { IoCloseCircleOutline } from "react-icons/io5"
export default function ImagePreview({ source, reset }) {
    const overlayRef = useRef(null);
    const [visible, setVisible] = useState(false);
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
        <div>
            <div style={{ position: "relative" }}>
                <div style={{ margin: "10px 0", background: `url(${source})` }} className="ImagePreview" onClick={() => setVisible(true)}>

                </div>
                <IoCloseCircleOutline
                    size={40}
                    onClick={(e) => reset()}
                    style={{
                        position: "absolute",
                        top: -15,
                        right: -15,
                        cursor: "pointer",
                        color: "#ff1919"
                    }}
                />
            </div>
            {visible && (
                <div className="Overlay" ref={overlayRef} onClick={onOverlayClick}>
                    <img src={source} width={1000} />
                    <div className="CloseIcon" onClick={() => setVisible(false)}>
                        <IoCloseCircleOutline size={70} />
                    </div>
                </div>
            )}
        </div>
    </>
}

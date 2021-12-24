import { useState, useRef, useEffect } from "react"
import ImagePreview from "./image-preview.js"
import { IoCloudUploadOutline, IoEllipseSharp } from "react-icons/io5"
import toast, { Toaster } from 'react-hot-toast';
import Router from 'next/router'
import axios from "axios"
export default function ImageUpload() {
    const [showBorder, setShowBorder] = useState(false);
    const [getFiles, setFiles] = useState([]);
    const [getSources, setSources] = useState([]);
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null);
    const imageUploadRef = useRef(null);
    const reset = (all, index) => {
        if (all) {
            setFiles([]);
            setSources([])
        } else {
            setFiles(getFiles.filter((file, i) => i !== index))
            setSources(getSources.filter((source, i) => i !== index))
        }
    }
    const isDisabled = () => loading || !getFiles.length
    const handleClick = (e) => {
        if (e.target === imageUploadRef.current) {
            fileInputRef.current?.click();
        }
    }
    const handleDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowBorder(true);
    }
    const handleDragLeave = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowBorder(false);
    }
    const handleFileChange = async (e) => {
        const { files } = e.target, sources = []
        if (files && files.length) {
            const fileToBase64 = async (file) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = () => resolve(reader.result)
                    reader.onerror = (e) => reject(e)
                })
            for (const file of files) {
                const source = await fileToBase64(file)
                sources.push(source)
            }
        }
        setFiles([...files, ...getFiles])
        setSources([...sources, ...getSources])
    }
    const uploadImage = async () => {
        if (getFiles.length > 5) {
            reset(true)
            return toast.error("Exceeded file limit", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (getFiles.reduce((acc, a) => acc += a.size / 1024 / 1024, 0) > 4) return toast.error("File too large", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setLoading(true)
        axios({
            method: "post",
            url: "/api/upload",
            data: {
                url: source,
                type: file.type,
                password: document.getElementById("passwordField").value
            }
        }).then((response) => {
            Router.push({
                pathname: `/i/${response.data.key}`,
            })
            setLoading(false)
        })
    }

    return <>
        <Toaster />
        <div className="Container">
            <div className={`ImageContainer ${showBorder ? "ShowBorder" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                ref={imageUploadRef}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowBorder(false);
                    const { files } = e.dataTransfer;
                    const file = files.item(0);
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const dataURL = reader.result;
                            setSource(dataURL)
                            setFile(file)
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            >
                <div>
                    <label htmlFor="file" className="Label" children="Upload image" onClick={(e) => e.preventDefault()}></label>
                    <p className="Text" children="Click to upload a file or drag the image here"></p>
                    <input multiple id="file" className="Input" type="file" accept="image/jpeg, image/gif, image/png, image/jpg" ref={fileInputRef} onChange={handleFileChange} onClick={(e) => e.target.value = null} />
                </div>
                {getSources.length > 0 && <ImagePreview files={getFiles} sources={getSources} reset={reset} />}
            </div>
            {!isDisabled() && <>
                <div style={{ marginTop: "10px" }} className="InputContainer">
                    <div className="flex">
                        <label className="InputLabel" children="Password" htmlFor="password" />
                    </div>
                    <input id="passwordField" className="PasswordField" type="password"></input>
                </div>
            </>}
            <button className="Button" disabled={isDisabled()} style={{ margin: "10px 0" }} onClick={uploadImage}>
                <div className="Flex">
                    <IoCloudUploadOutline size={35} />
                </div>
            </button>
        </div>
    </>
}

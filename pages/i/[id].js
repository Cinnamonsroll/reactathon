import { useState, useEffect } from "react"
import Router from 'next/router'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { IoCloudUploadOutline } from "react-icons/io5"
const View = ({ query }) => {
    const { id } = query, [image, setImage] = useState(), [canView, setCanView] = useState(false);
    useEffect(() => {
        axios.get(`/api/i/${id}`).then((res) => {
            if (res.data.error) return Router.push("/")
            setImage(res.data.imageData)
        })
    }, []);
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                if (image.password && document.getElementById("passwordField").value === image.password)
                    setCanView(true)
                else toast.error("Incorrect password", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    })
    return <>
        {image && (<>
            <Toaster />
            <div className="page">
                <div className="Container">
                    {!canView && image.password ? (<div className="InputContainer">
                        <div className="flex">
                            <label className="InputLabel" children="Password" htmlFor="password" />
                        </div>
                        <input id="passwordField" className="PasswordField" type="password"></input>
                    </div>) : <>
                        <div className="grid sm:grid-cols-3 gap-10 justify-center items-center lg:flex lg:justify-center lg:items-center md:items-center md:flex md:justify-center mb-20 mt-10 md:grid-cols-1 lg:grid-cols-1">
                            {image.files.map((file, i) => {
                                return <>
                                    <div className="rounded shadow-2xl flex justify-center items-center flex-col-reverse">
                                        <img className="" src={file.data}></img> 
                                    </div>
                                </>
                            })}
                        </div>
                        <button className="Button" style={{ margin: "10px 0" }} onClick={() => Router.push("/")}>
                            <div className="Flex">
                                <IoCloudUploadOutline size={35} />
                            </div>
                        </button>
                    </>}
                </div>
            </div>

        </>)}

    </>
}
View.getInitialProps = ({ query }) => {
    return { query }
}

export default View
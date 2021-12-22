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
        <Toaster />

        <div className="page">
            <div className="Container">
                {!image ? "Loading..." : image.password && !canView ? <>

                    <div className="InputContainer">
                        <div className="flex">
                            <label className="InputLabel" children="Password" htmlFor="password" />
                        </div>
                        <input id="passwordField" className="PasswordField" type="password"></input>
                    </div>

                </> : image.password && canView ? <img src={image.url} height={800} width={800} /> : <img src={image.url} height={800} width={800} />}
                <button className="Button" style={{ margin: "10px 0" }} onClick={() => Router.push("/")}>
                    <div className="Flex">
                        <IoCloudUploadOutline size={35} />
                    </div>
                </button>
            </div>
        </div>
    </>
}
View.getInitialProps = ({ query }) => {
    return { query }
}

export default View
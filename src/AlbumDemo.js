import { useEffect, useRef, useState } from "react";

const AlbumDemo = ({ selectedAlbum, screenX, screenY, setDisplaySelectedAlbumBox, updateAlbum }) => {

    const demo_rapper = useRef();
    const [id, setId] = useState(selectedAlbum.id);
    const [userId, setUserId] = useState(selectedAlbum.userId);
    const [title, setTitle] = useState(selectedAlbum.title);


    const resetAlbumDetails = () => {

        setId(selectedAlbum.id);
        setUserId(selectedAlbum.userId);
        setTitle(selectedAlbum.title);

    }

    const saveDetails = () => {

        let updatedAlbum =
        {
            "id": id,
            "userId": userId,
            "title": title,
        }

        updateAlbum(updatedAlbum)
    }



    useEffect(() => {

        demo_rapper.current.style.top = (screenY - 100)?.toString() + 'px';
        demo_rapper.current.style.left = screenX?.toString() + 'px';


    }, [screenX, screenY])




    return (
        <div ref={demo_rapper} className="album-display-wrapper" onMouseEnter={() => setDisplaySelectedAlbumBox(true)} onMouseLeave={() => setDisplaySelectedAlbumBox(false)}>

            <div className="container">


                <div className="row">
                    <div className="col">User id:</div>    <div className="col"> <input type='text' name='userId' value={userId} onChange={(e) => setUserId(e.target.value)} /> </div>
                </div>
                <div className="row">
                    <div className="col">Title:</div>    <div className="col"><input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} /> </div>
                </div>

            </div>

            <button className="save-button" onClick={saveDetails} >Save</button>
            <button className="save-button" onClick={resetAlbumDetails} >Cancel</button>

        </div>
    )
}
export default AlbumDemo;
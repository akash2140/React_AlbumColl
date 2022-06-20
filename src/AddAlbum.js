import axios from "axios";
import { useEffect, useRef, useState } from "react";
import './style/AddAlbum.css';

const AddAlbum = ({ data, setData, setDisplayAddAlbumBox }) => {

    const [album, setAlbum] = useState({});




    const saveDetails = () => {


        data.sort((a, b) => a.id - b.id)

        setAlbum({ id: data[data.length - 1].id, ...album })


        //create operation
        axios.post('https://jsonplaceholder.typicode.com/users', album)
            .then(res => {

                setData([...data, album])
                setDisplayAddAlbumBox(false)
            })
            .catch(e => console.log(e))
    }

    return (
        <div className="add-album-wrapper">

            <div className="container">
                <div className="row">
                    <div className="col">UserId:</div>       <div className="col"> <input type='text' name="name" onChange={(e) => setAlbum({ ...album, 'userId': e.target.value })} /> </div>
                </div>
                <div className="row">
                    <div className="col">Title:</div>    <div className="col"> <input type='text' name="username" onChange={(e) => setAlbum({ ...album, 'title': e.target.value })} /> </div>
                </div>

            </div>

            <button className="save-button" onClick={saveDetails} >Save</button>
            <button className="save-button" onClick={() => setDisplayAddAlbumBox(false)} >Cancel</button>

        </div>
    )
}
export default AddAlbum;
import axios from "axios";
import { useEffect, useState } from "react";
import './style/Album.css';
import AlbumDemo from "./AlbumDemo";
import AddAlbum from "./AddAlbum";
import deleteIcon from './assets/deleteIcon.png';

const Contacts = props => {
    const [data, setData] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [screenX, setScreenX] = useState();
    const [screenY, setScreenY] = useState();
    const [displaySelectedAlbumBox, setDisplaySelectedAlbumBox] = useState(false);
    const [displayAddAlbumBox, setDisplayAddAlbumBox] = useState(false);

    useEffect(() => {

        // read operation
        axios.get('https://jsonplaceholder.typicode.com/albums')
            .then(res => setData(res.data))
            .catch(e => console.log(e))


    }, [])

    useEffect(() => console.log('data  changed'), [data])


    const _onMouseMove = (e) => {
        if (!displaySelectedAlbumBox) {
            setScreenX(e.screenX);
            setScreenY(e.screenY);
        }
    }

    const removeAlbum = (id) => {
        console.log(id)

        //delete operation
        axios.delete('https://jsonplaceholder.typicode.com/users/' + id)
            .then(res => {

                setData(data.filter(ele => ele.id !== id))

            }).catch(e => console.log(e))
    }

    const updateAlbum = (updatedContact) => {

        //update operation
        axios.put('https://jsonplaceholder.typicode.com/users/' + updatedContact.id, { updatedContact })
            .then(res => {
                setData(data.map(ele => {

                    if (ele.id === updatedContact.id)
                        return updatedContact


                    return ele
                }))
            }).catch(e => console.log(e))

    }

    let timer = 0;

    return (
        <div className="album-wrapper">

            {displaySelectedAlbumBox && <AlbumDemo selectedAlbum={selectedAlbum} updateAlbum={updateAlbum} screenX={screenX} screenY={screenY} setDisplaySelectedAlbumBox={setDisplaySelectedAlbumBox} />}
            <div className="table-wrapper">

                <ul>

                    {
                        data?.map((ele, index) => {

                            return (
                                <li key={index}>
                                    <div className="list-div" onMouseMove={_onMouseMove}
                                        onMouseLeave={() => {
                                            clearTimeout(timer);
                                            setDisplaySelectedAlbumBox(false)
                                        }}
                                        onMouseEnter={() => {
                                            setSelectedAlbum(data[index]);
                                            timer = setTimeout(() => setDisplaySelectedAlbumBox(true), 1200)

                                        }}

                                    >
                                        {ele.title}

                                    </div>

                                    <img src={deleteIcon} onClick={() => removeAlbum(ele.id)} style={{ width: '25px', height: '25px' }} />

                                </li>
                            )

                        })
                    }

                </ul>

                <div>
                    {displayAddAlbumBox && <AddAlbum setDisplayAddAlbumBox={setDisplayAddAlbumBox} setData={setData} data={data} />}
                </div>
            </div>
            <div>


                <img src={require('./assets/addAlbum.png')} onClick={() => setDisplayAddAlbumBox(true)} width='20px' height='20px' />

            </div>

        </div>
    )


}

export default Contacts;
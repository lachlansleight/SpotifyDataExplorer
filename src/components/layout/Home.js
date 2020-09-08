import React, {useState, useMemo} from 'react'

import {useDropzone} from 'react-dropzone'

import DataExplorer from '../explorer/DataExplorer'

import './css/Home.css'

const activeStyle = {
    borderColor: '#2196f3',
    borderWidth: "5px",
    backgroundColor: "rgba(255,255,255,0.2)"
};

const acceptStyle = {
    borderColor: '#00e676',
    borderWidth: "5px"
};

const rejectStyle = {
    borderColor: '#ff1744',
    borderWidth: "5px"
};

const Home = () => {

    const [loadedData, setLoadedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const acceptDrop = async files => {
        const loadData = async files => {
            let finalJson = [];
            for(let i = 0; i < files.length; i++) {
                const text = await files[i].text();
                finalJson.push(JSON.parse(text));
            }
            return finalJson.reduce((acc, item) => {
                return acc.concat(item);
            }, [])
        }
        
        setLoading(true);
        const streamingHistory = files.filter(f => f.name.includes("StreamingHistory"));
        if(!streamingHistory || streamingHistory.length === 0) {
            setError("Streaming history not found in dropped files");
        } else {
            setError(false);
        }
        const loadedData = await loadData(streamingHistory);
        setLoadedData(loadedData);
        setLoading(false);
    }

    const rejectDrop = rejections => {
        setError(`Error: ${rejections[0].errors[0].message}`);
    }

    const {getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept} = useDropzone({
        multiple: true,
        noKeyboard: true,
        preventDropOnDocument: false,
        onDropAccepted: acceptDrop,
        onDropRejected: rejectDrop
    });
    
    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);

    return (
        <div className="main">
            <div className="container">
                { loading
                ? <p>Loading...</p>
                : (loadedData
                    ? <DataExplorer rawData={loadedData} />
                    : <div>
                            {error ? <p className="error">{error}</p> : null}
                            <div {...getRootProps({style, className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <p>Drag + drop your Spotify data folder here to begin</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home;
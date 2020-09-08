import React, {useState, useEffect} from 'react'

const ArtistOverview = ({artist}) => {
    const [expanded, setExpanded] = useState(false);
    const [trackList, setTrackList] = useState([]);
    useEffect(() => {
        if(!artist.tracks) return;

        setTrackList(artist.tracks.map((track, index) => {
            return <li key={`${artist.name}-track-${index}`}><span>{track.name}</span><span>{track.count}</span></li>
        }))
    }, [artist.tracks, artist.name])

    return !expanded ? (
        <div className="tile artist-tile">
            <div>
                <h2>{artist.name}</h2>
                <button onClick={() => setExpanded(!expanded)}>Expand</button>
            </div>
            <p>{artist.count} total plays</p>
            <p>{artist.tracks.length} total tracks</p>
        </div>
    ) : (
        <div className="artist-tile expanded">
            <div>
                <h2>{artist.name}</h2>
                <button onClick={() => setExpanded(!expanded)}>Contract</button>
            </div>
            <p>{artist.count} total plays</p>
            <p>{artist.tracks.length} total tracks</p>
            <ul>
                {trackList}
            </ul>
        </div>
    )
}

export default ArtistOverview;
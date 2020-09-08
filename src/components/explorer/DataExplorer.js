import React, {useState, useEffect} from 'react'

import ArtistOverview from './ArtistOverview'

import './css/Explorer.css'

const DataExplorer = ({rawData}) => {

    const [countData, setCountData] = useState([]);
    const [artistTiles, setArtistTiles] = useState([]);

    useEffect(() => {
        if(!rawData) return;

        const allArtists = rawData.reduce((acc, item) => {
            const artistIndex = acc.findIndex(a => a.name === item.artistName);
            if(artistIndex !== -1) {
                const trackIndex = acc[artistIndex].tracks.findIndex(t => t.name === item.trackName);
                if(trackIndex !== -1) {
                    //We just need to increment the relevant track
                    return acc.map((artist, aI) => {
                        return aI !== artistIndex
                            ? artist
                            : {...artist, tracks: artist.tracks.map((track, tI) => {
                                return tI !== trackIndex
                                    ? track
                                    : {...track, count: track.count + 1}
                            })}
                    })
                } else {
                    //We need to create a new track
                    return acc.map((artist, aI) => {
                        return aI !== artistIndex
                            ? artist
                            : {...artist, tracks: [...artist.tracks, {
                                name: item.trackName,
                                count: 1
                            }]}
                    })
                }
            } else {
                //We need to create a new artist
                return [...acc, {
                    name: item.artistName,
                    tracks: [{
                        name: item.trackName,
                        count: 1
                    }]
                }]
            }
        }, [])
        .map(artist => {
            return {
                count: artist.tracks.reduce((acc, track) => acc + track.count, 0),
                ...artist,
                tracks: artist.tracks.sort((a, b) => b.count - a.count)
            }
        }).sort((a, b) => b.count - a.count);

        setCountData({
            count: allArtists.reduce((acc, artist) => acc + artist.count, 0),
            artists: allArtists
        });
    }, [rawData])

    useEffect(() => {
        if(!countData || countData.length === 0) return;

        setArtistTiles(countData.artists.map((artist, index) => {
            return <ArtistOverview key={`artist-${index}`} artist={artist} />
        }))

    }, [countData])

    if(!countData || !countData.artists) {
        return null;
    }

    return (
        <div className="data-explorer">
            <h1>Overview</h1>
            <div className="overview-stats">
                <div className="tile">
                    <p>Total Plays</p>
                    <p>{countData.count}</p>
                </div>
                <div className="tile">
                    <p>Total Artists</p>
                    <p>{countData.artists.length}</p>
                </div>
            </div>
            <div className="artist-tile-container">
                {artistTiles}
            </div>
        </div>
    )
}

export default DataExplorer;
import React, {useState, useEffect} from 'react'

import streamingHistory0 from '../../data/LachlanData/StreamingHistory0.json'
import streamingHistory1 from '../../data/LachlanData/StreamingHistory1.json'

const Home = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const combined = streamingHistory0
            .concat(streamingHistory1);
        const allArtists = combined.reduce((acc, item) => {
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

        setData({
            count: allArtists.reduce((acc, artist) => acc + artist.count, 0),
            artists: allArtists
        });
    }, [])

    return (
        <div className="main">
            <div className="container">
                <h1>Lachlan's History</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    )
}

export default Home;
import {useState, useEffect, useRef} from 'react';
import './App.css';
import MuxPlayer from "@mux/mux-player-react";

const playbackId = 'i1BqaXIFfG677EnkqWOKZAa026y5SKOLdEU7wth1MZPw';
const src = `https://stream.mux.com/${playbackId}/capped-1080p.mp4`;

function App() {
    const [isOpenMp4, setOpenMp4] = useState(false);
    const [isOpenHLS, setOpenHLS] = useState(false);

    const togglePlayerMP4 = () => {
        performance.mark('mp4-open-start');
        setOpenMp4(!isOpenMp4);
    };

    const togglePlayerHLS = () => {
        performance.mark('hls-open-start');

        setOpenHLS(!isOpenHLS);
    };

    // useEffect(() => {
    //
    //     // Create a video element to preload the video
    //     const video = document.createElement('video');
    //     video.src = src;
    //     video.preload = 'metadata';
    //
    //     video.addEventListener('loadeddata', () => {
    //         console.log('MP4 video preloaded');
    //     });
    //
    //     video.load();
    //
    //     return () => {
    //         video.removeEventListener('loadeddata', () => {
    //             console.log('MP4 video preloaded');
    //         });
    //     };
    // }, []);


    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <button onClick={togglePlayerMP4}>{isOpenMp4 ? 'close' : 'open'} mp4</button>
                <button onClick={togglePlayerHLS}>{isOpenHLS ? 'close' : 'open'} hls</button>
            </div>
            <video src={src} preload="metadata" style={{display: 'none'}}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {isOpenMp4 ? (
                    <MuxPlayer
                        onPlaying={() => {
                            performance.mark('mp4-play')
                            const measure = performance.measure('mp4', 'mp4-open-start', 'mp4-play')
                            console.log('mp4: ',measure.duration)
                        }}
                        src={src}
                        autoPlay={true}
                        streamType="on-demand"
                        preload="metadata"
                        style={{width: '100vw', height: '100vh'}}
                        onLoadedData={() => performance.mark('mp4-open-end')}
                    />
                ) : (
                    <></>
                )}
                {isOpenHLS ? (
                    <MuxPlayer
                        playbackId={playbackId}
                        autoPlay={true}
                        style={{width: '100vw', height: '100vh'}}
                        onLoadedData={() => performance.mark('hls-open-end')}
                        onPlaying={() => {
                            performance.mark('hls-play')
                            const measure = performance.measure('hls', 'hls-open-start', 'hls-play')
                            console.log('hls: ', measure.duration)
                        }}
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default App;

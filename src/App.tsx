import { AudioManager } from "./components/AudioManager";
import Transcript from "./components/Transcript";
import { useTranscriber } from "./hooks/useTranscriber";
import { Button, Flex } from "antd";
import AudioWave from "./components/AudioWave";
import { useEffect } from "react";

function App() {
    const transcriber = useTranscriber();

    useEffect(() => {
        console.log("app");
    }, []);
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Flex vertical>
                <div className='container flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-center'>
                        Whisper Web
                    </h1>
                    <AudioManager transcriber={transcriber} />
                    <Transcript transcribedData={transcriber.output} />
                </div>
                <Button color='primary'>Button</Button>

                <AudioWave url='/example.wav' />
            </Flex>
        </div>
    );
}

export default App;

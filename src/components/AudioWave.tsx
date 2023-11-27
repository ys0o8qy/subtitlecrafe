import { useEffect, useRef, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline";
import Minimap from "wavesurfer.js/dist/plugins/minimap";

interface Props {
    url: string;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

export default function AudioWave(props: Props) {
    const waveformRef = useRef<HTMLDivElement>();

    useEffect(() => {
        let hasInit = false;
        console.log("mounted ");
        if (waveformRef.current && !hasInit) {
            console.log("current ", props.url);
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "rgb(200, 0, 200)",
                progressColor: "rgb(100, 0, 100)",
                url: props.url,
                minPxPerSec: 30,
            });
            wavesurfer.registerPlugin(TimelinePlugin.create() as any);
            wavesurfer.registerPlugin(
                Minimap.create({
                    height: 30,
                    waveColor: "#ddd",
                    progressColor: "#999",
                } as any) as any,
            );

            const wsRegions = wavesurfer.registerPlugin(
                RegionsPlugin.create() as any,
            ) as RegionsPlugin;

            wavesurfer.once("interaction", () => {
                wavesurfer.play();
            });

            wavesurfer.on("decode", () => {
                wsRegions.addRegion({
                    start: 0,
                    end: 1,
                    content: "Resize me",
                    color: randomColor(),
                    drag: true,
                    resize: true,
                });
            });
        }
        return () => {
            hasInit = true;
        };
    }, [props.url]);

    return <div ref={waveformRef} style={{ width: 500 }}></div>;
}

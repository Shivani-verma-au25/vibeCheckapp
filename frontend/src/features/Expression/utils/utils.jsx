// import {
//     FaceLandmarker,
//     FilesetResolver
// } from "@mediapipe/tasks-vision";


// export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
//     const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//     );

//     landmarkerRef.current = await FaceLandmarker.createFromOptions(
//         vision,
//         {
//             baseOptions: {
//                 modelAssetPath:
//                     "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
//             },
//             outputFaceBlendshapes: true,
//             runningMode: "VIDEO",
//             numFaces: 1
//         }
//     );

//     streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = streamRef.current;
//     await videoRef.current.play();
// };

// export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
//     if (!landmarkerRef.current || !videoRef.current) return;

//     const results = landmarkerRef.current.detectForVideo(
//         videoRef.current,
//         performance.now()
//     );

//     if (results.faceBlendshapes?.length > 0) {
//         const blendshapes = results.faceBlendshapes[ 0 ].categories;

//         const getScore = (name) =>
//             blendshapes.find((b) => b.categoryName === name)?.score || 0;

//         const smileLeft = getScore("mouthSmileLeft");
//         const smileRight = getScore("mouthSmileRight");
//         const jawOpen = getScore("jawOpen");
//         const browUp = getScore("browInnerUp");
//         const frownLeft = getScore("mouthFrownLeft");
//         const frownRight = getScore("mouthFrownRight");

//         console.log(getScore("mouthFrownLeft"))

//         let currentExpression = "Neutral";

//         if (smileLeft > 0.5 && smileRight > 0.5) {
//             currentExpression = "happy";
//         } else if (jawOpen > 0.2 && browUp > 0.2) {
//             currentExpression = "surprised";
//         } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
//             currentExpression = "sad";
//         }

//         setExpression(currentExpression);

//         return currentExpression
//     }
// };


// export const stopCamera = ({ videoRef, streamRef, landmarkerRef }) => {
//     // Stop camera tracks
//     if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => {
//             track.stop();
//         });

//         streamRef.current = null;
//     }

//     // Remove camera from video
//     if (videoRef.current) {
//         videoRef.current.pause();
//         videoRef.current.srcObject = null;
//     }

//     // Close MediaPipe
//     if (landmarkerRef.current) {
//         landmarkerRef.current.close();
//         landmarkerRef.current = null;
//     }
// };


// ---------------------------


import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1
            }
        );

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        streamRef.current = stream;

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
        }

    } catch (error) {
        console.error("Camera initialization failed:", error);
    }
};


export const stopCamera = ({ videoRef, streamRef, landmarkerRef }) => {

    // Stop camera tracks
    if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
            track.stop();
        });

        streamRef.current = null;
    }

    // Remove video stream
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
    }

    // Close MediaPipe
    if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
    }
};


export const detect = ({
    landmarkerRef,
    videoRef,
    setExpression
}) => {

    if (!landmarkerRef.current || !videoRef.current) {
        return null;
    }

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {

        const blendshapes =
            results.faceBlendshapes[0].categories;

        const getScore = (name) =>
            blendshapes.find(
                (b) => b.categoryName === name
            )?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        let currentExpression = "Neutral";

        if (
            smileLeft > 0.5 &&
            smileRight > 0.5
        ) {
            currentExpression = "happy";

        } else if (
            jawOpen > 0.2 &&
            browUp > 0.2
        ) {
            currentExpression = "surprised";

        } else if (
            frownLeft > 0.0001 &&
            frownRight > 0.0001
        ) {
            currentExpression = "sad";
        }

        setExpression(currentExpression);

        return currentExpression;
    }

    return null;
};
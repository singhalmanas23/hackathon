"use client";
import React, {useRef, useState, useEffect } from "react";
import { Pose } from "@mediapipe/pose";
import {
  drawConnectors,
  drawLandmarks,
  POSE_CONNECTIONS,
} from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Posture = () => {
  // <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils"></script>
  // const [isWarn,setIsWarn]=useState(false);
  // const audioRef=useRef<HTMLAudioElement>(null);

  // useEffect(()=>{
  //   const timer=setTimeout(()=>{
  //     setIsWarn(true);
  //   },3000);
  //   return ()=>clearTimeout(timer);
  // },[]);

  // useEffect(()=>{
  //   if(isWarn && audioRef.current){
  //     audioRef.current.play();
  //   }
  // },[isWarn]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasCtx = useRef(null);
  let beepSound=null;
  var exercise = 2;
  var sets = 4;
  var reps = 1;
  var count = 0;
  var state = "down";
  const showToast = (message, color) => {
    toast(message, {
      style: {
        backgroundColor: color,
        color: "#fff",
      },
    });
  };
  
  const [messageColor, setMessageColor] = useState("green"); 
  const [isBeepPlayed, setIsBeepPlayed] = useState(true);
  const partCoordinates = {
    NOSE: 0,
    LEFT_EYE_INNER: 1,
    LEFT_EYE: 2,
    LEFT_EYE_OUTER: 3,
    RIGHT_EYE_INNER: 4,
    RIGHT_EYE: 5,
    RIGHT_EYE_OUTER: 6,
    LEFT_EAR: 7,
    RIGHT_EAR: 8,
    MOUTH_LEFT: 9,
    MOUTH_RIGHT: 10,
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,
    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,
    LEFT_PINKY: 17,
    RIGHT_PINKY: 18,
    LEFT_INDEX: 19,
    RIGHT_INDEX: 20,
    LEFT_THUMB: 21,
    RIGHT_THUMB: 22,
    LEFT_HIP: 23,
    RIGHT_HIP: 24,
    LEFT_KNEE: 25,
    RIGHT_KNEE: 26,
    LEFT_ANKLE: 27,
    RIGHT_ANKLE: 28,
    LEFT_HEEL: 29,
    RIGHT_HEEL: 30,
    LEFT_FOOT_INDEX: 31,
    RIGHT_FOOT_INDEX: 32,
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      beepSound = new Audio("/beep.mp3");
    }
  }, []); 
  useEffect(() => {
    if (!isBeepPlayed) {
      showToast("Beep sound failed to play", "yellow");
    }
  }, [isBeepPlayed]);
  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    const initPoseDetection = async () => {
      const pose = new Pose({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.2,
        minTrackingConfidence: 0.4,
        selfieMode: false,
      });

      pose.onResults(onResults);

      await setupCamera();
      videoRef.current.play();

      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        // width: 700,
        // height: 500,
      });
      camera.start();
    };

    const angleCal = (A, B, C) => {
      const BA = { x: A.x - B.x, y: A.y - B.y };
      const BC = { x: C.x - B.x, y: C.y - B.y };

      // Calculate the dot product of BA and BC
      const dotProduct = BA.x * BC.x + BA.y * BC.y;

      // Calculate the magnitudes (length) of BA and BC
      const magnitudeBA = Math.sqrt(BA.x * BA.x + BA.y * BA.y);
      const magnitudeBC = Math.sqrt(BC.x * BC.x + BC.y * BC.y);

      // Check for zero-length vectors to avoid division by zero
      if (magnitudeBA === 0 || magnitudeBC === 0) {
        return 0; // Or handle it as needed
      }

      // Calculate the cosine of the angle
      const cosineAngle = dotProduct / (magnitudeBA * magnitudeBC);

      // Clamp the cosine value to the range [-1, 1] to avoid NaN from acos
      const clampedCosine = Math.max(-1, Math.min(1, cosineAngle));

      // Calculate the angle in radians, then convert to degrees
      const angleRadians = Math.acos(clampedCosine);
      let angleDegrees = angleRadians * (180 / Math.PI);

      // Ensure angle is in the range [0, 180]
      if (angleDegrees > 180) {
        angleDegrees = 360 - angleDegrees; // This may be unnecessary depending on use case
      }

      return angleDegrees; // Return the angle in degrees
    };

    const handleStatement = (str) => {
      canvasCtx.current.font = "24px Arial";
      canvasCtx.fillStyle = "black";
      canvasCtx.current.fillText("Count:" + String(str), 60, 50);
    };
    const handleStatement2 = (str) => {
      canvasCtx.current.font = "24px Arial";
      canvasCtx.fillStyle = "black";
      canvasCtx.current.fillText("Reps:" + String(str), 60, 100);
    };

    const onResults = (results) => {
      // var count=0;
      if (canvasRef.current && results.poseLandmarks) {
        canvasCtx.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        canvasCtx.current.drawImage(
          results.image,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        drawConnectors(
          canvasCtx.current,
          results.poseLandmarks,
          POSE_CONNECTIONS,
          { color: "#FF0000", lineWidth: 2 }
        );
        drawLandmarks(canvasCtx.current, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 1,
        });
        //BICEP CURL
        if (exercise == 1) {
          let rightWrist =
            results.poseLandmarks[partCoordinates["RIGHT_WRIST"]];
          let rightElbow =
            results.poseLandmarks[partCoordinates["RIGHT_ELBOW"]];
          let rightShoulder =
            results.poseLandmarks[partCoordinates["RIGHT_SHOULDER"]];
          let leftWrist = results.poseLandmarks[partCoordinates["LEFT_WRIST"]];
          let leftElbow = results.poseLandmarks[partCoordinates["LEFT_ELBOW"]];
          let leftShoulder =
            results.poseLandmarks[partCoordinates["LEFT_SHOULDER"]];

          let angle = angleCal(rightWrist, rightElbow, rightShoulder);
          let leftAngle = angleCal(leftWrist, leftElbow, leftShoulder);
          if (Math.abs(angle - leftAngle) >= 80) {
            const text = "Make Sure Both the hands are alligned same.";
            showToast(text);
            beepSound.play();
            canvasCtx.current.fillStyle = "black";
            canvasCtx.current.fillText(text, 150, 400);
          } else {
            if (angle <= 30 && state == "down") {
              count = count + 1;
              state = "up";
              if (count >= sets) {
                if (reps == 1) {
                  handleStatement("Exercise Completed");
                }
                count = 1;
                reps = reps - 1;
              }
            } else if (angle >= 160 && state == "up") {
              state = "down";
            }
          }
          canvasCtx.current.font = "24px Arial";

          // canvasCtx.current.fillText(String(angle),rightElbow.x*500,rightElbow.y*580);

          handleStatement(count);
          handleStatement2(reps);
        }
        //OVERHEAD PRESS 
        else if (exercise === 2) {
            let rightWrist = results.poseLandmarks[partCoordinates["RIGHT_WRIST"]];
            let rightElbow = results.poseLandmarks[partCoordinates["RIGHT_ELBOW"]];
            let rightShoulder = results.poseLandmarks[partCoordinates["RIGHT_SHOULDER"]];
            let leftWrist = results.poseLandmarks[partCoordinates["LEFT_WRIST"]];
            let leftElbow = results.poseLandmarks[partCoordinates["LEFT_ELBOW"]];
            let leftShoulder = results.poseLandmarks[partCoordinates["LEFT_SHOULDER"]];
          
            let rightWristangle = angleCal(rightWrist, rightElbow, rightShoulder);
            let leftWristangle = angleCal(leftWrist, leftElbow, leftShoulder);
          
            let leftArm = angleCal(leftElbow, leftShoulder, rightShoulder);
            let rightArm = angleCal(rightElbow, rightShoulder, leftShoulder);
          
            // Check if the angles are not balanced
            if (Math.abs(rightWristangle - leftWristangle) >= 40) {
              canvasCtx.current.font = "24px Arial";
              setMessageColor("red"); // Set the warning color to red
          
              const text = "Match elbow angles for symmetrical movement and balance.";
              showToast(text, "red"); // Show a red warning toast
          
              try {
                beepSound.play();
                setIsBeepPlayed(true); // Beep sound played successfully
              } catch (error) {
                setIsBeepPlayed(false); // Beep sound failed
                showToast("Beep sound failed to play", "yellow");
              }
          
              canvasCtx.current.fillStyle = messageColor;
              canvasCtx.current.fillText(text, 20, 400);
            } 
            // Success condition (Balanced wrist angles)
            else {
              setMessageColor("green"); // Set the success color to green
              showToast("Exercise movement is correct!", "green");
          
              if (leftWristangle >= 140 && state === "down") {
                state = "up";
                count = count + 1;
                if (count >= sets) {
                  if (reps === 1) {
                    handleStatement("Exercise Completed");
                  }
                  count = 1;
                  reps = reps - 1;
                }
              } else if (leftWristangle <= 110 && state === "up") {
                state = "down";
              }
            }
          
            handleStatement(count);
            handleStatement2(reps);
          }
          
        //SQUADS
         else if (exercise == 3) {
          let rightAnkle =
            results.poseLandmarks[partCoordinates["RIGHT_ANKLE"]];
          let rightKnee = results.poseLandmarks[partCoordinates["RIGHT_KNEE"]];
          let rightHips = results.poseLandmarks[partCoordinates["RIGHT_HIP"]];
          let rightShoulder =
            results.poseLandmarks[partCoordinates["RIGHT_SHOULDER"]];

          let leftAnkle = results.poseLandmarks[partCoordinates["LEFT_ANKLE"]];
          let leftKnee = results.poseLandmarks[partCoordinates["LEFT_KNEE"]];
          let leftHips = results.poseLandmarks[partCoordinates["LEFT_HIP"]];
          let leftShoulder =
            results.poseLandmarks[partCoordinates["LEFT_SHOULDER"]];

          let rightKneeAngle = angleCal(rightAnkle, rightKnee, rightHips);
          let leftKneeAngle = angleCal(leftAnkle, leftKnee, leftHips);

          let leftHipAngle = angleCal(leftShoulder, leftHips, leftKnee);
          let rightHipAngle = angleCal(rightShoulder, rightHips, rightKnee);

          if (state == "down" && leftHipAngle >= 160) {
            state = "up";
            count = count + 1;
            if (count >= sets) {
              if (reps == 1) {
                handleStatement("Exercise Completed");
              }
              count = 1;
              reps = reps - 1;
            }
          } else if (state == "up") {
            if (leftKneeAngle > 120 || rightKneeAngle > 120) {
              canvasCtx.current.font = "24px Arial";
              const text = "Lower your Hips a little";
            //   beepSound.play();
              canvasCtx.current.fillStyle = "black";
              canvasCtx.current.fillText(text, 20, 400);
            } else if (leftHipAngle <= 50 || rightHipAngle <= 50) {
              canvasCtx.current.font = "24px Arial";
              const text =
                "Open up your hips more to increase the hip angle and improve squat depth.";
                // beepSound.play();
              canvasCtx.current.fillStyle = "black";
              canvasCtx.current.fillText(text, 20, 400);
            } else {
              state = "down";
            }
          }

          handleStatement(count);
          handleStatement2(reps);
        }
        //PLANK
        else if (exercise == 4) {
          let leftHips = results.poseLandmarks[partCoordinates["LEFT_HIP"]];
          let leftShoulder =
            results.poseLandmarks[partCoordinates["LEFT_SHOULDER"]];
          let leftKnee = results.poseLandmarks[partCoordinates["LEFT_KNEE"]];
          let leftAnkle = results.poseLandmarks[partCoordinates["LEFT_ANKLE"]];

          let rightHips = results.poseLandmarks[partCoordinates["RIGHT_HIP"]];
          let rightShoulder =
            results.poseLandmarks[partCoordinates["RIGHT_SHOULDER"]];
          let rightKnee = results.poseLandmarks[partCoordinates["RIGHT_KNEE"]];
          let rightAnkle =
            results.poseLandmarks[partCoordinates["RIGHT_ANKLE"]];

          let rightElbow =
            results.poseLandmarks[partCoordinates["RIGHT_ELBOW"]];
          let leftElbow = results.poseLandmarks[partCoordinates["LEFT_ELBOW"]];

          let rightWrist =
            results.poseLandmarks[partCoordinates["RIGHT_WRIST"]];
          let leftWrist = results.poseLandmarks[partCoordinates["LEFT_WRIST"]];

          let leftElbowAngle = angleCal(leftWrist, leftElbow, leftShoulder);
          let rightElbowAngle = angleCal(rightWrist, rightElbow, rightShoulder);

          let leftShoulderAngle = angleCal(leftElbow, leftShoulder, leftHips);
          let rightShoulderAngle = angleCal(
            rightElbow,
            rightShoulder,
            rightHips
          );

          let leftHipsAngle = angleCal(leftShoulder, leftHips, leftAnkle);
          let rightHipsAngle = angleCal(rightShoulder, rightHips, rightAnkle);

          if (leftElbowAngle <= 60 || rightElbowAngle <= 60) {
            canvasCtx.current.font = "24px Arial";
            const text = "Make sure your Elbow angles are 90deg";
            canvasCtx.current.fillStyle = "black";
            canvasCtx.current.fillText(text, 20, 400);
          } else if (leftShoulderAngle >= 110 || rightShoulderAngle >= 110) {
            canvasCtx.current.font = "24px Arial";
            const text = "Make your shoulder angle around 90deg";
            // beepSound.play();
            canvasCtx.current.fillStyle = "black";
            canvasCtx.current.fillText(text, 20, 400);
          } else if (leftHips < 150 || rightHips < 150) {
            canvasCtx.current.font = "24px Arial";
            const text = "Lower your Hips";
            beepSound.play();
            canvasCtx.current.fillStyle = "black";
            canvasCtx.current.fillText(text, 20, 400);
          }
        }
        //TRICEP DIPS
        else if (exercise == 5) {
          let rightWrist =
            results.poseLandmarks[partCoordinates["RIGHT_WRIST"]];
          let rightElbow =
            results.poseLandmarks[partCoordinates["RIGHT_ELBOW"]];
          let rightShoulder =
            results.poseLandmarks[partCoordinates["RIGHT_SHOULDER"]];
          let leftWrist = results.poseLandmarks[partCoordinates["LEFT_WRIST"]];
          let leftElbow = results.poseLandmarks[partCoordinates["LEFT_ELBOW"]];
          let leftShoulder =
            results.poseLandmarks[partCoordinates["LEFT_SHOULDER"]];

          let rightHips = results.poseLandmarks[partCoordinates["RIGHT_HIP"]];
          let leftHips = results.poseLandmarks[partCoordinates["RIGHT_HIP"]];
          let rightKnee = results.poseLandmarks[partCoordinates["RIGHT_KNEE"]];
          let leftKnee = results.poseLandmarks[partCoordinates["LEFT_KNEE"]];

          let leftHipAngle = angleCal(leftShoulder, leftHips, leftKnee);
          let rightHipAngle = angleCal(rightShoulder, rightHips, rightKnee);

          let angle = angleCal(rightWrist, rightElbow, rightShoulder);
          let leftAngle = angleCal(leftWrist, leftElbow, leftShoulder);

          if (
            (leftHipAngle >= 50 && leftHipAngle <= 140) ||
            (leftHipAngle >= 50 && leftHipAngle <= 140)
          )
            if ((leftAngle <= 140 || angle <= 140) && state == "up") {
              count = count + 1;
              state = "down";
              if (count >= sets) {
                if (reps == 1) {
                  handleStatement("Exercise Completed");
                }
                count = 1;
                reps = reps - 1;
              }
            } else if ((leftAngle >= 170 || angle >= 170) && state == "down") {
              state = "up";
            }
          handleStatement(count);
          handleStatement2(reps);
        }
        //PUSHUPS
        else if (exercise == 6) {
          let leftHip = results.poseLandmarks[partCoordinates["LEFT_HIP"]];
          let rightHip = results.poseLandmarks[partCoordinates["RIGHT_HIP"]];
          let leftShoulder =
            results.poseLandmarks[partCoordinates["LEFT_SHOULDER"]];
          let rightShoulder =
            results.poseLandmarks[partCoordinates["RIGHT_SHOULDER"]];
          let leftKnee = results.poseLandmarks[partCoordinates["LEFT_KNEE"]];
          let rightKnee = results.poseLandmarks[partCoordinates["RIGHT_KNEE"]];
          let leftWrist = results.poseLandmarks[partCoordinates["LEFT_WRIST"]];
          let rightWrist =
            results.poseLandmarks[partCoordinates["RIGHT_WRIST"]];
          let leftElbow = results.poseLandmarks[partCoordinates["LEFT_ELBOW"]];
          let rightElbow =
            results.poseLandmarks[partCoordinates["RIGHT_ELBOW"]];

          let leftHipAngle = angleCal(leftShoulder, leftHip, leftKnee);
          let rightHipAngle = angleCal(rightShoulder, rightHip, rightKnee);

          let leftElbowAngle = angleCal(leftWrist, leftElbow, leftShoulder);
          let rightElbowAngle = angleCal(rightWrist, rightElbow, rightShoulder);

          if (leftHipAngle <= 160 || rightHipAngle <= 160) {
            canvasCtx.current.font = "24px Arial";
            const text = "Lower Your back";
            canvasCtx.current.fillStyle = "black";
            canvasCtx.current.fillText(text, 20, 400);
          } else {
            if (
              (leftElbowAngle >= 160 || rightElbowAngle >= 160) &&
              state == "down"
            ) {
              state = "up";
              count = count + 1;
              if (count >= sets) {
                if (reps == 1) {
                  handleStatement("Exercise Completed");
                }
                count = 1;
                reps = reps - 1;
              }
            } else if (
              (leftElbowAngle <= 70 || rightElbowAngle <= 70) &&
              state == "up"
            ) {
              state = "down";
            }
          }
          handleStatement(count);
          handleStatement2(reps);
        }
      }
    };

    const initialize = async () => {
      canvasCtx.current = canvasRef.current.getContext("2d");
      await initPoseDetection();
    };

    initialize();
  }, []);

  return (
    <div className="w-full flex justify-center items-center p-10">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className=""
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        width={800}
        className="lg:w-[1200px] lg:h-[800px] w-[500px] h-[500px]"
        height={520}
      />
    </div>
  );
};

export default Posture;

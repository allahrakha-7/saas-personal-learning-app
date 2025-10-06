"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED",
}

const CompanionComponent = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };
    const onCallEnd = () => {
      setCallStatus(CallStatus.ENDED);
    };
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };
    const onSpeechStart = () => {
      setIsSpeaking(true);
    };
    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };
    const onError = (error: Error) => {
      console.log("Call error:", error?.message || error || "Unknown error");
    };
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    try {
      await new Promise((res) => setTimeout(res, 300)); // wait for WASM init
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      vapi.start(configureAssistant(voice, style), assistantOverrides);
    } catch (err) {
      console.error("Error starting call:", err);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    if (callStatus === CallStatus.ENDED || callStatus === CallStatus.INACTIVE)
      return;
    setCallStatus(CallStatus.ENDED);
    try {
      vapi.stop();
    } catch (err) {
      console.warn("Tried to stop an already-ended session:", err);
    }
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="border-2 border-black p-4 w-2/3 max-sm:w-full flex flex-col gap-4 justify-center items-center rounded-lg">
          <div
            className="size-[300px] flex items-center justify-center rounded-lg max-sm:size-[180px] mt-4"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ENDED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:fit max-sm:mt-4 max-sm:w-[120px] max-sm:h-[120px]"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="size-[300px] max-sm:size-[100px]"
              />
            </div>
          </div>
          <p className="font-bold text-2xl mt-2 max-sm:mt-2">{name}</p>
        </div>

        <div className="flex flex-col gap-4 w-1/3 justify-evenly max-sm:w-full max-sm:flex-row">
          <div className="border-2 border-black flex flex-col gap-4 items-center rounded-lg py-8 max-sm:hidden">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-lg">{userName}</p>
          </div>
          <button
            className="border-2 border-black rounded-lg flex flex-col gap-2 items-center py-8 max-sm:py-2 cursor-pointer w-full"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn ON Microphone" : "Turn OFF Microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-600" : "bg-black",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Session"}
          </button>
        </div>
      </section>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <section className="relative flex flex-col gap-4 w-full items-center pt-10 flex-grow overflow-hidden">
        <div className="overflow-y-auto w-full flex flex-col gap-4 max-sm:gap-2 pr-2 h-full text-2xl no-scrollbar">
          {messages.map((message, index) =>
            message.role === "assistant" ? (
              <p key={index} className="max-sm:text-sm">
                {name.split(" ")[0].replace(/[.,]/g, "")}: {message.content}
              </p>
            ) : (
              <p key={index} className="text-black max-sm:text-sm">
                {userName}: {message.content}
              </p>
            )
          )}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 max-sm:h-20 bg-gradient-to-t from-background via-background/90 to-transparent z-10" />
      </section>
    </section>
  );
};

export default CompanionComponent;

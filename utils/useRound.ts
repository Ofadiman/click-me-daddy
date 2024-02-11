import { Emote, Round } from "@/types";
import { useRef } from "react";

export const useRound = () => {
  const roundRef = useRef<Round>({
    time: 0,
    clicks: [],
    missclicks: 0,
    timestamp: new Date().toISOString(),
  });

  const recordEmotePress = (emote: Emote) => {
    roundRef.current.clicks.push(emote);
  };

  const incrementTime = () => {
    roundRef.current.time++;
  };

  const state = () => {
    return roundRef.current;
  };

  return {
    new: () => {
      roundRef.current = {
        time: 0,
        clicks: [],
        missclicks: 0,
        timestamp: new Date().toISOString(),
      };
    },
    state,
    recordEmotePress,
    incrementTime,
  };
};

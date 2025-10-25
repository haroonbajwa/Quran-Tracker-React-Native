import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QURAN_DATA, RukuData } from "../../data/quranData";

const TOTAL_RUKUS = QURAN_DATA.length;

interface ProgressData {
  currentIndex: number;
  todayCount: number;
  streak: number;
  lastReadDate: string;
  lastSavedIndex: number; // To handle undo edge cases
}

export default function useTracker() {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lastReadDate, setLastReadDate] = useState<string>("");
  const [lastSavedIndex, setLastSavedIndex] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("quranProgress");
        const today = new Date().toISOString().split("T")[0];

        if (saved) {
          const parsed: ProgressData = JSON.parse(saved);

          // If it's a new day, reset daily count
          if (parsed.lastReadDate !== today) parsed.todayCount = 0;

          setCurrentIndex(parsed.currentIndex || 1);
          setTodayCount(parsed.todayCount || 0);
          setStreak(parsed.streak || 0);
          setLastReadDate(parsed.lastReadDate || today);
          setLastSavedIndex(parsed.lastSavedIndex || parsed.currentIndex || 1);
        } else {
          // initialize default data if no record found
          await AsyncStorage.setItem(
            "quranProgress",
            JSON.stringify({
              currentIndex: 1,
              todayCount: 0,
              streak: 0,
              lastReadDate: today,
              lastSavedIndex: 1,
            })
          );
        }
      } catch (e) {
        console.error("Error loading saved progress:", e);
      }
    })();
  }, []);

  const saveProgress = async (data: ProgressData) => {
    try {
      await AsyncStorage.setItem("quranProgress", JSON.stringify(data));
    } catch (e) {
      console.error("Error saving progress:", e);
    }
  };

  const increment = async () => {
    if (currentIndex < TOTAL_RUKUS) {
      const next = currentIndex + 1;
      const today = new Date().toISOString().split("T")[0];
      let nextTodayCount = todayCount;
      let nextStreak = streak;

      if (lastReadDate === today) {
        // Same day
        if (next > lastSavedIndex) nextTodayCount += 1;
      } else {
        // New day
        nextTodayCount = 1;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yDate = yesterday.toISOString().split("T")[0];
        nextStreak = lastReadDate === yDate ? streak + 1 : 1;
      }

      const updated: ProgressData = {
        currentIndex: next,
        todayCount: nextTodayCount,
        streak: nextStreak,
        lastReadDate: today,
        lastSavedIndex: next,
      };

      setCurrentIndex(next);
      setTodayCount(nextTodayCount);
      setStreak(nextStreak);
      setLastReadDate(today);
      setLastSavedIndex(next);

      await saveProgress(updated);
    }
  };

  const decrement = async () => {
    if (currentIndex > 1) {
      const next = currentIndex - 1;
      let nextTodayCount = todayCount;
      const today = new Date().toISOString().split("T")[0];

      // Only allow undo for today’s readings
      if (
        lastReadDate === today &&
        currentIndex <= lastSavedIndex &&
        todayCount > 0
      ) {
        nextTodayCount -= 1;
      }

      const updated: ProgressData = {
        currentIndex: next,
        todayCount: nextTodayCount,
        streak,
        lastReadDate,
        lastSavedIndex: Math.max(next, 1),
      };

      setCurrentIndex(next);
      setTodayCount(nextTodayCount);
      setLastSavedIndex(next);

      await saveProgress(updated);
    }
  };

  const currentRuku: RukuData | undefined = QURAN_DATA.find(
    (r) => r.rukuIndex === currentIndex
  );

  const progress = (currentIndex / TOTAL_RUKUS) * 100;

  return {
    currentRuku,
    increment,
    decrement,
    progress,
    currentIndex,
    todayCount,
    streak,
  };
}

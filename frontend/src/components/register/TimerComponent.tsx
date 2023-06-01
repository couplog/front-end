import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

interface TimerProps {
  onComplete: () => void;
}

const TimerComponent = ({ onComplete }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(180); // 3분을 초로 변환
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    let id: number;

    const decrementTime = () => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          onComplete(); // 타이머 완료 시 콜백 함수 호출
          return 0;
        }
        return prevTime - 1; // 1초씩 감소
      });
    };

    if (timerId == null) {
      id = setInterval(decrementTime, 1000);
      setTimerId(id);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [onComplete, timerId]);

  // 타이머 형식을 분 : 초로 나타내기 위한 포맷팅
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <Text style={styles.timer}>{formatTime(remainingTime)}</Text>;
};

export default TimerComponent;

const styles = StyleSheet.create({
  timer: {
    color: '#000AFF',
    fontFamily: 'Pretendard-Medium',
    fontWeight: '400',
    fontSize: 12,
  },
});

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TimerProps } from '../../types/components/timerType';

const TimerComponent = ({
  handleComplete,
  resetTimer,
  onReset,
}: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(180); // 3분을 초로 변환
  const [timerCompleted, setTimerCompleted] = useState(false); // 타이머 완료시 완료 기능을 한번만 실행하기 위한 state 설정
  const [timerId, setTimerId] = useState<number | null>(null);

  const handleCompleteCallback = useCallback(() => {
    handleComplete(); // 타이머 완료 시 콜백 함수 호출
  }, [handleComplete]);

  useEffect(() => {
    if (timerCompleted) {
      handleCompleteCallback(); // 생성된 콜백 함수 호출
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerCompleted]);

  useEffect(() => {
    let id: number;

    const decrementTime = () => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          if (!timerCompleted) {
            setTimerCompleted(true); // 타이머 완료 시 완료 여부 상태 변경
          }
          return 0;
        }
        return prevTime - 1; // 1초씩 감소
      });
    };

    // 타이머 리셋
    if (resetTimer) {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      setRemainingTime(180); // resetTimer 상태가 변경되면 타이머 초기화
      setTimerCompleted(false); // complete 초기화
      onReset(); // 초기화 완료 시 콜백 함수 호출
    } else if (timerId === null) {
      id = setInterval(decrementTime, 1000);
      setTimerId(id);
    }

    // 페이지 언마운트시 timerId clear
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTimer, timerId, timerCompleted]);

  // 타이머 형식을 (분 : 초)로 나타내기 위한 포맷팅
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

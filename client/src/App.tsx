import { AppShell, Container, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../styles/classes.css";
import Header from "./Header.tsx";
import TimerCard from "./TimerCard.tsx";
import TaskSection from "./TaskSection.tsx";
import { useState } from "react";
import { TimerEnum } from "./enums.tsx";

function App() {
  const userData = getUserData();
  const [timerType, setTimerType] = useState(TimerEnum.Pomodoro);

  function getAppVariant() {
    switch (timerType) {
      case TimerEnum.ShortBreak:
        return "timer-control-break-short";
      case TimerEnum.LongBreak:
        return "timer-control-break-long";
      default:
        return "timer-control-pomodoro";
    }
  }

  return (
    <MantineProvider>
      <AppShell variant={getAppVariant()}>
        <Header></Header>

        <Container>
          <TimerCard
            timerPomodoro={userData.timerPomodoro}
            timerShortBreak={userData.timerShortBreak}
            timerLongBreak={userData.timerLongBreak}
            autoStartBreaks={userData.autoStartBreaks}
            autoStartPomodoros={userData.autoStartPomodoros}
            timerType={timerType}
            setTimerType={setTimerType}
          ></TimerCard>
        </Container>

        <Container size="xs">
          <TaskSection
            _tasks={userData.tasks}
            timerPomodoro={userData.timerPomodoro}
            timerShortBreak={userData.timerShortBreak}
            timerLongBreak={userData.timerLongBreak}
            longBreakInterval={userData.longBreakInterval}
            timerType={timerType}
          ></TaskSection>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

function getUserData() {
  return {
    timerPomodoro: 25,
    timerShortBreak: 5,
    timerLongBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    longBreakInterval: 4,
    tasks: [
      {
        id: "0",
        title: "Linear Algebra I - Assignment 2",
        numCompleted: 1,
        numToComplete: 3,
      },
      {
        id: "1",
        title: "Chemistry II - Finish homework 1",
        numCompleted: 0,
        numToComplete: 2,
      },
      {
        id: "2",
        title: "Home - Go annoy Maria",
        numCompleted: 3,
        numToComplete: 5,
      },
    ],
  };
}

export default App;

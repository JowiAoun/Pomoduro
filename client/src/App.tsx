import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Header from "./Header.tsx";
import TimerCard from "./TimerCard.tsx";
import TaskSection from "./TaskSection.tsx";

function App() {
  const userData = getUserData();

  return (
    <MantineProvider>
      <Header></Header>
      <TimerCard
        timerPomodoro={userData.timerPomodoro}
        timerShortBreak={userData.timerShortBreak}
        timerLongBreak={userData.timerLongBreak}
        autoStartBreaks={userData.autoStartBreaks}
        autoStartPomodoros={userData.autoStartPomodoros}
      ></TimerCard>
      <TaskSection
        tasks={userData.tasks}
        timerPomodoro={userData.timerPomodoro}
        timerShortBreak={userData.timerShortBreak}
        timerLongBreak={userData.timerLongBreak}
        longBreakInterval={userData.longBreakInterval}
      ></TaskSection>
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
        title: "Linear Algebra I - Assignment 2",
        numCompleted: 1,
        numToComplete: 3,
      },
      {
        title: "Chemistry II - Finish homework 1",
        numCompleted: 0,
        numToComplete: 2,
      },
      {
        title: "Physics - Dynamics homework",
        numCompleted: 3,
        numToComplete: 5,
      },
    ],
  };
}

export default App;

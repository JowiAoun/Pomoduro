import { AppShell, Container, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import "../styles/classes.css";
import Header from "./Header.tsx";
import TimerCard from "./TimerCard.tsx";
import TaskSection from "./TaskSection.tsx";
import { useEffect, useState } from "react";
import { TimerEnum } from "./enums.tsx";
import { SettingsType, TaskType } from "./types.tsx";
import { DEFAULT_SETTINGS } from "./constants.ts";

const USER_ID: string = "2";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [timerType, setTimerType] = useState(TimerEnum.Pomodoro);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsResponse = await LOCALfetchSettings();
        setSettings(settingsResponse);

        const tasksResponse = await LOCALfetchTasks();
        setTasks(tasksResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 0);
      }
    };

    fetchData();
  }, []);

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

  async function fetchSettings(): Promise<SettingsType> {
    const response = await fetch("http://localhost:8080/api/settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userId: USER_ID,
      },
    });

    if (!response.ok) {
      throw new Error("ERROR: Could not fetch tasks");
    }

    return response.json();
  }

  async function fetchTasks(): Promise<TaskType[]> {
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userId: USER_ID,
      },
    });

    if (!response.ok) {
      throw new Error("ERROR: Could not fetch tasks");
    }

    return response.json();
  }

  function LOCALfetchSettings(): SettingsType {
    return {
      userId: "2",
      timerPomodoro: 25,
      timerShortBreak: 5,
      timerLongBreak: 15,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      longBreakInterval: 4,
    };
  }

  function LOCALfetchTasks(): TaskType[] {
    return [
      {
        id: "2",
        userId: "2",
        title: "Task 1 for User 2",
        note: "This is task 1 for user 2",
        projectName: "Project 2",
        done: false,
        numCompleted: 0,
        numToComplete: 3,
        created: new Date().toISOString(),
      },
      {
        id: "3",
        userId: "2",
        title: "Task 2 for User 2",
        note: "This is task 2 for user 2",
        projectName: "Project 2",
        done: false,
        numCompleted: 0,
        numToComplete: 4,
        created: new Date().toISOString(),
      },
    ];
  }

  return isLoading ? (
    <MantineProvider>
      <AppShell variant="timer-control-pomodoro">
        <Container variant="loading" w="100%" h="100%">
          <Text>Loading...</Text>
        </Container>
      </AppShell>
    </MantineProvider>
  ) : (
    <MantineProvider>
      <AppShell variant={getAppVariant()}>
        <Header></Header>

        <Container>
          <TimerCard
            settings={settings}
            timerType={timerType}
            setTimerType={setTimerType}
          ></TimerCard>
        </Container>

        <Container size="xs">
          <TaskSection
            _tasks={tasks}
            settings={settings}
            timerType={timerType}
          ></TaskSection>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

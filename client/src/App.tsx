import { AppShell, Container, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import "../styles/classes.css";
import Header from "./Header.tsx";
import TimerCard from "./TimerCard.tsx";
import TaskSection from "./TaskSection.tsx";
import { useEffect, useState } from "react";
import { TimerEnum } from "./helpers/enums.ts";
import { UserType } from "./types.ts";
import { DEFAULT_USER } from "./constants.ts";
import { login } from "./helpers/users.ts";

function App() {
  const [user, setUser] = useState<UserType>(DEFAULT_USER);
  const [timerType, setTimerType] = useState(TimerEnum.Pomodoro);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await login();

        if (!fetchedUser) {
          //TODO: Logout/Delete cookie & send client to login page
          console.log("Could not fetch user");
        }

        setUser(fetchedUser);
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
            settings={user.settings}
            timerType={timerType}
            setTimerType={setTimerType}
          ></TimerCard>
        </Container>

        <Container size="xs">
          <TaskSection
            _tasks={user.tasks}
            settings={user.settings}
            timerType={timerType}
          ></TaskSection>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

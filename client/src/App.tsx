import { AppShell, Container, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import "../styles/classes.scss";
import Header from "./pages/home/header/Header.tsx";
import TimerCard from "./pages/home/timer/TimerCard.tsx";
import TaskSection from "./pages/home/tasks/TaskSection.tsx";
import { useEffect, useState } from "react";
import { TimerEnum } from "./utils/enums.ts";
import { UserType } from "./utils/types.ts";
import { DEFAULT_USER } from "./utils/constants.ts";
import { login } from "./utils/users.ts";
import { getAppVariant } from "./utils/helpers.ts";

function App() {
  const [user, setUser] = useState<UserType>(DEFAULT_USER);
  const [timerType, setTimerType] = useState<TimerEnum>(TimerEnum.Pomodoro);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <AppShell variant={getAppVariant(timerType)}>
        <Header></Header>

        <Container>
          <TimerCard
            setting={user.setting}
            timerType={timerType}
            setTimerType={setTimerType}
          ></TimerCard>
        </Container>

        <Container size="xs">
          <TaskSection
            _tasks={user.tasks}
            setting={user.setting}
            timerType={timerType}
          ></TaskSection>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;

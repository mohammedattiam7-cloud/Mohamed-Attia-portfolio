import { Column, Text, Heading } from "@once-ui-system/core";
import styles from "./FinalDesigns.module.scss";

const screens = [
  { src: "/images/projects/vacay-track/cover-01.jpg", caption: "Home" },
  { src: "/images/projects/vacay-track/cover-02.jpg", caption: "Leave Balance" },
  { src: "/images/projects/vacay-track/cover-03.jpg", caption: "Request Leave" },
  { src: "/images/projects/vacay-track/cover-04.jpg", caption: "Leave Type Picker" },
  { src: "/images/projects/vacay-track/cover-01.jpg", caption: "Date Selection" },
  { src: "/images/projects/vacay-track/cover-02.jpg", caption: "Confirmation Summary" },
  { src: "/images/projects/vacay-track/cover-03.jpg", caption: "Request History" },
  { src: "/images/projects/vacay-track/cover-04.jpg", caption: "Attendance" },
  { src: "/images/projects/vacay-track/cover-01.jpg", caption: "Task List" },
  { src: "/images/projects/vacay-track/cover-05.jpg", caption: "Profile" },
];

export function FinalDesigns() {
  return (
  <Column fillWidth gap="32">
    <Column gap="8">
      <Heading as="h2" variant="heading-strong-xl">Final Designs</Heading>
      <Text variant="body-default-l" onBackground="neutral-weak">
        Ten screens across the core flows — Home, Leave, Attendance, Requests, and Tasks.
      </Text>
    </Column>

    <div className={styles.track}>
      {screens.map((screen) => (
        <div key={screen.caption} className={styles.frame}>
          <div className={styles.phoneShell}>
            <img
              src={screen.src}
              alt={screen.caption}
              className={styles.screenshot}
            />
          </div>
          <Text
            variant="label-default-s"
            onBackground="neutral-weak"
            align="center"
          >
            {screen.caption}
          </Text>
        </div>
      ))}
    </div>
  </Column>
  );
}

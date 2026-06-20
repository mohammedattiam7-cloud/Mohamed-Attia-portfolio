import { Column, Heading, Text } from "@once-ui-system/core";
import styles from "./KeyInsights.module.scss";

const insights = [
  {
    title: "No visibility of leave balance",
    body: "Employees didn't know how many days they had left, so they had to ask HR every time before requesting — creating dependence and delay.",
  },
  {
    title: "Opaque request status",
    body: "After submitting, employees got no clear update on whether their request was pending, approved, or rejected — which made them anxious.",
  },
  {
    title: "Fragmented tools",
    body: "Employees juggled multiple apps to track tasks, attendance, and leave, with no single source of truth.",
  },
  {
    title: "Friction in the basics",
    body: "Slow approvals and reliability issues (e.g. being logged out mid-submission) eroded trust in existing systems.",
  },
];

const rotations = [-8, -3, 3, 8];

export const KeyInsights: React.FC = () => (
  <Column fillWidth gap="xl" marginTop="8" marginBottom="8">
    <Column gap="8">
      <Heading as="h2" variant="heading-strong-xl">
        Key Insights
      </Heading>
      <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
        Synthesis pointed to four insights that shaped every design decision that followed
      </Text>
    </Column>
    <div className={styles.fanContainer}>
      {insights.map((insight, i) => (
        <div
          key={i}
          className={styles.card}
          style={{ "--rotation": `${rotations[i]}deg` } as React.CSSProperties}
        >
          <Column
            fillWidth
            fillHeight
            padding="l"
            radius="l"
            border="neutral-alpha-weak"
            gap="12"
            className={styles.cardInner}
          >
            <Text variant="heading-strong-xs" onBackground="neutral-strong">
              {insight.title}
            </Text>
            <Text variant="body-default-s" onBackground="neutral-medium">
              {insight.body}
            </Text>
          </Column>
        </div>
      ))}
    </div>
  </Column>
);

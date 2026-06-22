import { Column, Row, Grid, Text, Heading, Tag, Line } from "@once-ui-system/core";

type Stat = { value: string; label: string };

type Props = {
  eyebrow: string;
  heading: string;
  delivered: Stat[];
  impact: { tag: string; statement: string };
  validateNext: string[];
  refine: string[];
};

const defaults: Props = {
  eyebrow: "Outcome & Reflection",
  heading: "What shipped and what I'd do next",
  delivered: [
    { value: "75+",            label: "screens" },
    { value: "20+",            label: "core flows" },
    { value: "Design system", label: "tokens · components · states" },
    { value: "Light + dark",  label: "handoff-ready" },
  ],
  impact: {
    tag: "INTENDED · BY DESIGN",
    statement:
      "Removes the need to email HR just to check a leave balance — routine requests move into a self-service flow.",
  },
  validateNext: [
    "Usability test on the prototype",
    "Task completion rate + time on the leave-request flow",
  ],
  refine: [
    "Standardize metadata order on task cards (date · time · priority)",
    "Correct attachment file-size limit to a realistic value",
    "Non-color status indicator on attendance calendar for accessibility",
  ],
};

function BulletList({ items }: { items: string[] }) {
  return (
    <Column gap="8">
      {items.map((item) => (
        <Row key={item} gap="8" vertical="start">
          <Text variant="body-default-m" onBackground="neutral-weak">—</Text>
          <Text variant="body-default-m" onBackground="neutral-medium">{item}</Text>
        </Row>
      ))}
    </Column>
  );
}

function ReflectionCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Column
      fillWidth
      padding="l"
      radius="l"
      border="neutral-alpha-weak"
      className="static-card"
      gap="m"
    >
      <Text variant="heading-strong-s" onBackground="neutral-strong">{title}</Text>
      <BulletList items={items} />
    </Column>
  );
}

export function OutcomeReflection(props: Partial<Props> = {}) {
  const { eyebrow, heading, delivered, impact, validateNext, refine } = {
    ...defaults,
    ...props,
  };

  return (
    <Column fillWidth gap="xl">

      {/* Header */}
      <Column gap="8">
        <Text variant="label-default-s" onBackground="neutral-weak">{eyebrow}</Text>
        <Heading as="h2" variant="heading-strong-xl">{heading}</Heading>
      </Column>

      {/* Block 1 — Delivered */}
      <Grid columns="4" s={{ columns: 2 }} fillWidth gap="m">
        {delivered.map((stat) => (
          <Column
            key={stat.label}
            fillWidth
            padding="l"
            radius="l"
            border="neutral-alpha-weak"
            className="static-card"
            gap="8"
          >
            <Text variant="display-strong-xs" onBackground="neutral-strong">
              {stat.value}
            </Text>
            <Text variant="label-default-s" onBackground="neutral-weak">
              {stat.label}
            </Text>
          </Column>
        ))}
      </Grid>

      {/* Block 2 — Impact statement */}
      <Column
        fillWidth
        padding="l"
        radius="l"
        border="neutral-alpha-weak"
        className="static-card"
        gap="m"
      >
        <Tag size="l">{impact.tag}</Tag>
        <Text variant="body-default-l" onBackground="neutral-medium">
          {impact.statement}
        </Text>
      </Column>

      {/* Divider with micro-label */}
      <Column fillWidth gap="12" horizontal="center">
        <Line />
        <Text variant="label-default-s" onBackground="neutral-weak">↓ Reflection</Text>
      </Column>

      {/* Block 3 — Reflection */}
      <Grid columns="2" s={{ columns: 1 }} fillWidth gap="m">
        <ReflectionCard title="Validate next" items={validateNext} />
        <ReflectionCard title="Refine"        items={refine} />
      </Grid>

    </Column>
  );
}

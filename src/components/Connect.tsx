"use client";

import { mailchimp } from "@/resources";
import {
  Background,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Row,
  Text,
} from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";
import { useState } from "react";

type Action = { label: string; href: string; external?: boolean };
type ContactRow = { icon: string; display: string; copyValue: string; actions: Action[] };

const contactRows: ContactRow[] = [
  {
    icon: "phone",
    display: "+20 100 203 7811",
    copyValue: "+201002037811",
    actions: [
      { label: "Call Me", href: "tel:+201002037811" },
      { label: "Send Hi", href: "https://wa.me/201002037811", external: true },
    ],
  },
  {
    icon: "email",
    display: "mohammed.attia.m7@gmail.com",
    copyValue: "mohammed.attia.m7@gmail.com",
    actions: [{ label: "Send a mail", href: "mailto:mohammed.attia.m7@gmail.com" }],
  },
  {
    icon: "linkedin",
    display: "linkedIn/mohamed-atia1",
    copyValue: "https://www.linkedin.com/in/mohamed-atia1/",
    actions: [
      { label: "Let's Connect", href: "https://www.linkedin.com/in/mohamed-atia1/", external: true },
    ],
  },
];

export const Connect: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        left="0"
        fillWidth
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      <Row fillWidth gap="xl" s={{ direction: "column" }}>
        <Column flex={1} gap="l">
          <Heading variant="display-strong-xs">
            Let's design products people actually love to use
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            From product ideas to design challenges — I turn complex problems into clear, usable experiences. Let's talk.
          </Text>
        </Column>
        <Column flex={1} gap="s">
          {contactRows.map((row) => (
            <Row
              key={row.copyValue}
              fillWidth
              paddingX="m"
              paddingY="s"
              radius="m"
              background="overlay"
              border="neutral-alpha-weak"
              gap="m"
              vertical="center"
              horizontal="between"
              s={{ direction: "column", align: "start", gap: "s" }}
            >
              <Row gap="12" vertical="center">
                <Icon name={row.icon as any} size="s" onBackground="neutral-weak" />
                <Text variant="body-default-s">{row.display}</Text>
              </Row>
              <Row gap="8">
                {row.actions.map((action) => (
                  <Button
                    key={action.label}
                    href={action.href}
                    variant="secondary"
                    size="s"
                    aria-label={action.label}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {action.label}
                  </Button>
                ))}
              </Row>
            </Row>
          ))}
        </Column>
      </Row>
    </Column>
  );
};

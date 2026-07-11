import {
  Heading,
  Text,
  Button,
  IconButton,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL, social } from "@/resources";
import { Connect, StatsRow } from "@/components";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

const HERO_SOCIALS = ["LinkedIn", "Behance", "Dribbble", "Instagram"];

export default function Home() {
  const heroSocials = social
    .filter((item) => HERO_SOCIALS.includes(item.name))
    .sort((a, b) => HERO_SOCIALS.indexOf(a.name) - HERO_SOCIALS.indexOf(b.name));

  return (
    <Column fillWidth maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero — two column */}
      <Row fillWidth gap="64" vertical="center" s={{ direction: "column", gap: "xl" }}>

        {/* ── Left: text content ── */}
        <Column flex={1} gap="l" align="start">

          {home.featured.display && (
            <RevealFx fillWidth paddingTop="16">
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          <RevealFx translateY="4" delay={0.1} fillWidth>
            <Heading wrap="balance" variant="display-strong-l" className="hero-heading">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth>
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="body-default-l"
              className="hero-subline"
            >
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx translateY="8" delay={0.3} fillWidth>
            <Row gap="12" s={{ direction: "column" }}>
              <Button
                data-border="rounded"
                href="/work"
                variant="primary"
                size="m"
                weight="default"
              >
                View My Work
              </Button>
              <Button
                data-border="rounded"
                href="https://drive.google.com/file/d/1knNU1509qNZO7qu2meNxM4wKYO8evhcN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="m"
                weight="default"
                suffixIcon="arrowRight"
              >
                View Resume
              </Button>
            </Row>
          </RevealFx>

          <RevealFx delay={0.4} fillWidth>
            <Row gap="4">
              {heroSocials.map((item) => (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  variant="ghost"
                  size="m"
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ))}
            </Row>
          </RevealFx>

        </Column>

        {/* ── Right: profile photo ── */}
        <Column horizontal="center" vertical="center">
          <RevealFx translateY="8" delay={0.2}>
            <div className="hero-photo-wrapper">
              <div className="hero-photo-ring">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="hero-photo-img"
                />
              </div>
              <div className="hero-role-badge">
                <Badge
                  background="neutral-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                >
                  <Row gap="8" vertical="center" paddingY="2">
                    <span className="role-dot" />
                    <Text variant="label-default-s" onBackground="neutral-strong">
                      {person.role}
                    </Text>
                  </Row>
                </Badge>
              </div>
            </div>
          </RevealFx>
        </Column>

      </Row>

      {/* Stats row */}
      <RevealFx translateY="8" delay={0.5} fillWidth>
        <StatsRow />
      </RevealFx>

      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      <Projects range={[2]} />
      <Connect id="connect" />
    </Column>
  );
}

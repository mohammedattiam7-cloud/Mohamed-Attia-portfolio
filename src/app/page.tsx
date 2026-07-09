import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
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



export default function Home() {
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
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
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
        </Column>
        <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
          <Heading wrap="balance" variant="display-strong-l" align="center">
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl" align="center">
            {home.subline}
          </Text>
        </RevealFx>
        <RevealFx translateY="8" delay={0.4} fillWidth horizontal="center">
          <Row gap="12" horizontal="center" s={{ direction: "column", align: "center" }}>
            <Button
              data-border="rounded"
              href="#connect"
              variant="secondary"
              size="m"
              weight="default"
            >
              Contact me
            </Button>
            <Button
              data-border="rounded"
              href="https://drive.google.com/file/d/1knNU1509qNZO7qu2meNxM4wKYO8evhcN/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="m"
              weight="default"
            >
              View Resume
            </Button>
          </Row>
        </RevealFx>
        <RevealFx translateY="8" delay={0.6} fillWidth horizontal="center" paddingTop="32">
          <StatsRow />
        </RevealFx>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      <Projects range={[2]} />
      <Connect id="connect" />
    </Column>
  );
}

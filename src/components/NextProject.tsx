import { getPosts } from "@/utils/utils";
import { Column, Heading, Text, Media, SmartLink, Line } from "@once-ui-system/core";

interface NextProjectProps {
  slug: string;
}

export async function NextProject({ slug }: NextProjectProps) {
  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  const { title, tag, images } = post.metadata;
  const cover = images?.[0];
  const href = `/work/${slug}`;

  return (
    <Column fillWidth gap="l" marginTop="8">
      <Line />

      <SmartLink href={href} style={{ display: "block", width: "100%", textDecoration: "none" }}>
        <Column
          fillWidth
          radius="l"
          border="neutral-alpha-weak"
          className="static-card next-project-card"
          style={{ overflow: "hidden" }}
        >
          {cover && (
            <Media
              fillWidth
              aspectRatio="16 / 9"
              src={cover}
              alt={title}
              sizes="(max-width: 960px) 100vw, 960px"
            />
          )}
          <Column padding="l" gap="8">
            {tag && (
              <Text variant="label-default-s" onBackground="neutral-weak">{tag}</Text>
            )}
            <Heading as="h3" variant="heading-strong-xl" wrap="balance">
              {title}
            </Heading>
            <Text variant="body-default-s" onBackground="brand-medium" marginTop="8">
              Next case study →
            </Text>
          </Column>
        </Column>
      </SmartLink>
    </Column>
  );
}

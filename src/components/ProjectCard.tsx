"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  comingSoon?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  comingSoon,
}) => {
  return (
    <Column fillWidth gap="m">
      <Carousel
        className="carousel-brand"
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="16"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title.includes(" | ")
                ? title.split(" | ").map((part, i, arr) => (
                    <span key={i}>{part}{i < arr.length - 1 && <br />}</span>
                  ))
                : title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-m" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {comingSoon ? (
                <Tag prefixIcon="clock" paddingX="8" paddingY="8" radius="full" background="neutral-medium">Publishing soon</Tag>
              ) : (
                <>
                  {content?.trim() && (
                    <SmartLink
                      suffixIcon="arrowRight"
                      style={{ margin: "0", width: "fit-content" }}
                      href={href}
                    >
                      <Text variant="body-default-s">Read case study</Text>
                    </SmartLink>
                  )}
                  {link && (
                    <SmartLink
                      suffixIcon="arrowUpRightFromSquare"
                      style={{ margin: "0", width: "fit-content" }}
                      href={link}
                    >
                      <Text variant="body-default-s">View project</Text>
                    </SmartLink>
                  )}
                </>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};

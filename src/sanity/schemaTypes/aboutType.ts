import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main heading for the hero section",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility",
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
    },
  },
});

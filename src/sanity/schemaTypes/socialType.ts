import { defineField, defineType } from "sanity";

export const socialType = defineType({
  name: "social",
  title: "Social Media Links",
  type: "document",
  fields: [
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform Name",
              type: "string",
              description: "e.g., Facebook, Twitter, Instagram, LinkedIn",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "Full URL to your social media profile",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https"],
                }),
            }),
            defineField({
              name: "icon",
              title: "Icon/Logo",
              type: "image",
              description: "Upload an SVG or PNG icon for the social platform",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                  description: "Describe the icon (e.g., 'Facebook icon')",
                  validation: (Rule) => Rule.required(),
                },
              ],
            }),
            defineField({
              name: "order",
              title: "Display Order",
              type: "number",
              description: "Lower numbers appear first",
              initialValue: 0,
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
              media: "icon",
            },
          },
        },
      ],
      description: "Add your social media links with custom icons",
    }),
  ],
});

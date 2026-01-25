import { defineArrayMember, defineField, defineType } from "sanity";

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
    defineField({
      name: "benefitsTitle",
      title: "Benefits Title",
      type: "string",
      initialValue: "BENEFITS",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "galleryTitle",
      title: "Gallery Title",
      type: "string",
      initialValue: "Design, Upload, Publish",
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonialTitle",
      title: "Testimonial Title",
      type: "string",
      initialValue: "What My Clients Say",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) => Rule.min(1).max(5),
            }),
            defineField({
              name: "content",
              title: "Quote",
              type: "blockContent",
            }),
            defineField({
              name: "company",
              title: "Company / Author Name",
              type: "string",
            }),
            defineField({
              name: "address",
              title: "Address / Role / Description",
              type: "string",
            }),
            defineField({
              name: "name",
              title: "Legacy Name (Optional)",
              type: "string",
              hidden: true,
            }),
            defineField({
              name: "role",
              title: "Legacy Role (Optional)",
              type: "string",
              hidden: true,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contactTitle",
      title: "Contact Title",
      type: "string",
      initialValue: "CONTACT ME",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
    },
  },
});

import { defineField, defineType } from "sanity";

export const featurePage = defineType({
  name: "featurePage",
  title: "Feature Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "atarOutcome",
      title: "ATAR Outcome",
      type: "text",
    }),
    defineField({
      name: "howItWorks",
      title: "How It Works",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "stateAlignment",
      title: "State Alignment",
      type: "string",
    }),
  ],
});

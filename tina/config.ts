import { defineConfig } from "tinacms";
import { SERVICE_CATEGORY_OPTIONS } from "@/lib/constants";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}/preview`,
        },
      },
      {
        name: "promoBanner",
        label: "Promo Banner",
        path: "content/promo-banner",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
          },
          {
            type: "rich-text",
            name: "message",
            label: "Message",
            isBody: true,
          },
        ],
      },
      {
        name: "service",
        label: "Services",
        path: "content/services",
        ui: {
          router: ({ document }) => `/services/${document._sys.filename}/preview`,
        },
        fields: [
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [...SERVICE_CATEGORY_OPTIONS],
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
            description: "Displayed service name",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "href",
            label: "Booking URL",
            required: true,
          },
          {
            type: "string",
            name: "duration",
            label: "Duration",
            required: true,
          },
          {
            type: "string",
            name: "price",
            label: "Price",
            required: true,
          },
          {
            type: "string",
            name: "regularPrice",
            label: "Regular Price",
            description:
              "Optional. Shown as strikethrough next to price to signal value (e.g. for packages).",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            description: 'Optional labels like "Most Popular" or "High Seller".',
          },
          {
            type: "number",
            name: "order",
            label: "Order",
            description: "Display order within section (lower first)",
          },
          {
            type: "string",
            name: "typesLabel",
            label: "Types label",
            description: "e.g. Choose Your Extension Type",
          },
          {
            type: "object",
            name: "types",
            label: "Sub-options",
            list: true,
            description: "Optional variants (e.g. Classic, Volume, Wispy)",
            ui: {
              itemProps: (item) => ({
                label: item?.name || "New sub-option",
              }),
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "description", label: "Description", required: true, ui: { component: "textarea" } },
              { type: "string", name: "duration", label: "Duration", required: true },
              { type: "string", name: "price", label: "Price", required: true },
              {
                type: "string",
                name: "regularPrice",
                label: "Regular Price",
                description:
                  "Optional. Shown as strikethrough next to price to signal value.",
              },
              {
                type: "string",
                name: "tags",
                label: "Tags",
                list: true,
                description:
                  'Optional labels like "Most Popular" or "High Seller".',
              },
              { type: "string", name: "href", label: "Booking URL" },
            ],
          },
        ],
      },
    ],
  },
});

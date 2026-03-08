import { type SchemaTypeDefinition } from "sanity";
import { featurePage } from "./featurePage";
import { faq } from "./faq";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [featurePage, faq],
};

import type { Configuration } from "@happykit/flags/config";

// You can replace this with your exact flag types
export type AppFlags = { [key: string]: boolean | number | string | null };

export const config: Configuration<AppFlags> = {
  // Replace this with your own,
  envKey: "flags_pub_development_317896002361099840",
};

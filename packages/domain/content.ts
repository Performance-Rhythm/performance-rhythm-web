export type ContentType =
  | "content"
  | "content_category"
  | "course"
  | "training"
  | "breathwork_session"
  | "meditation_session"
  | "collection"
  | "assignment";

export type ContentVisibility = "global" | "company" | "group" | "user";

export type FutureContentEntity = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  type: ContentType;
  visibility: ContentVisibility;
};

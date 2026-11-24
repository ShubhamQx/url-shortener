import { linkTable } from "../db/schema/link.schema";

export const linkFields = {
  id: linkTable.id,
  code: linkTable.code,
  fullLink: linkTable.fullLink,
  clickCount: linkTable.clickCount,
  createdAt: linkTable.createdAt,
};

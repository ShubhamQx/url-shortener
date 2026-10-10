import type { ApiResponse } from "@/types/api";
import api from "./axios";
import type { Link } from "@/types/link";

const createLink = async (fullLink: string) => {
  return await api.post<ApiResponse<Link>>("/links", { fullLink });
};

const getLinks = async () => {
  return await api.get<ApiResponse<Link[]>>("/links");
};

const getLink = async () => {
  return await api.get<ApiResponse<Link>>("/links/:code");
};

const deleteLink = async () => {
  return await api.delete<ApiResponse<null>>("/links/:code");
};

export { createLink, getLinks, getLink, deleteLink };

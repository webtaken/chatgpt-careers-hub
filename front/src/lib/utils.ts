import { authOptions } from "@/auth";
import { OpenAPI } from "@/client";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function setCredentialsToAPI() {
  const session = await getServerSession(authOptions);
  if (!session) throw Error("set credentials failed");
  // eslint-disable-next-line
  // @ts-ignore
  OpenAPI.TOKEN = session.access_token;
  OpenAPI.BASE = process.env.BASE_PATH_API!;
}

export function setBasePathToAPI() {
  OpenAPI.BASE = process.env.BASE_PATH_API!;
}

export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${randomStr}`;
}

export function prettyPrintUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString();
}

export function isNumeric(str: string) {
  return Number.isFinite(Number(str));
}

export function handlePaginationParams(searchParams: PagesParams) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = parseInt(searchParams.pageSize || "50");
  return { page, pageSize };
}

export function parseNumbersList(list: string | undefined | null) {
  return list
    ?.split(",")
    .filter((id) => isNumeric(id))
    .map((id) => +id);
}

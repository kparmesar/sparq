import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export const { GET, POST } = getAuth().handler();

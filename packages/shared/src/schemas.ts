// Placeholders for zod/yup schemas (kept minimal to avoid extra deps)
export type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

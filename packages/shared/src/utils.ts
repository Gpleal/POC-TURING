import type { WorkflowSpec, WorkflowContext } from "./types";

export function createWorkflow<TIn, TOut>(steps: ((a: any) => Promise<any>)[]): WorkflowSpec<TIn, TOut> {
  return {
    steps,
    async run(input: TIn, ctx?: Partial<WorkflowContext>): Promise<TOut> {
      let acc: any = input;
      const envObj: Record<string, string | undefined> = (globalThis as any)?.process?.env ?? {};
      const context: WorkflowContext = {
        now: new Date(),
        env: envObj,
        ...ctx,
      } as any;
      for (const step of steps) {
        acc = await step({ input: acc, ctx: context });
      }
      return acc as TOut;
    },
  };
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

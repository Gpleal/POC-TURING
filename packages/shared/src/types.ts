export type AgentKind =
  | "agendamento"
  | "lembretes"
  | "cobranca"
  | "nf"
  | "classificador-emails"
  | "resposta-automatica"
  | "triagem-cvs"
  | "estoque"
  | "envio-documentos"
  | "relatorios-financeiros"
  | "conferencia-pagamentos";

export interface AgentDefinition<TInput = any, TOutput = any> {
  id: string;
  name: string;
  kind: AgentKind;
  description?: string;
  inputsSchema?: unknown;
  outputSchema?: unknown;
  workflow: WorkflowSpec<TInput, TOutput>;
}

export interface WorkflowContext {
  now: Date;
  env: Record<string, string | undefined>;
}

export type WorkflowStep<TIn, TOut> = (args: {
  input: TIn;
  ctx: WorkflowContext;
}) => Promise<TOut>;

export interface WorkflowSpec<TIn, TOut> {
  steps: WorkflowStep<any, any>[];
  run(input: TIn, ctx?: Partial<WorkflowContext>): Promise<TOut>;
}

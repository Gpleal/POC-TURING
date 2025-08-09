Engine mínima de workflow baseada em passos assíncronos. Cada workflow é um array de funções que recebem `{ input, ctx }` e retornam o próximo estado. Use `createWorkflow` de `@shared/utils`.

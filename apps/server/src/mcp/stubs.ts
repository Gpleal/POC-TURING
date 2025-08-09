// MCP stubs: REST/GraphQL/Webhooks and popular connectors
export type Connector = 'notion'|'gmail'|'whatsapp'|'google-calendar'|'pipedrive'|'salesforce'|'totvs'|'bling'

export async function callConnector(connector: Connector, action: string, payload: any){
  // Apenas log de demonstração
  return { connector, action, payload, ok: true }
}

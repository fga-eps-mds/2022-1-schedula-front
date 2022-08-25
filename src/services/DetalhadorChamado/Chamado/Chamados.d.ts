interface Chamado {
  id: number
  solicitante: string
  contatoSolicitante: string
  postoDeTrabalho: Workstation | string
  descricao: string
  tipoServico: string
  prioridade: string
  categoriaProblema?: IProblemCategory
  tipoProblema?: ProblemType
}

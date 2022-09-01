export enum ChamadoStatus {
  "pending" = "Pendente",
  "in_progress" = "Em andamento",
  "not_solved" = "Não resolvido",
  "outsourced" = "Terceirizado",
  "solved" = "Resolvido"
}

export enum ChamadoPriority {
  "low" = "Baixa",
  "normal" = "Normal",
  "high" = "Alta",
  "urgent" = "Urgente"
}

export const statusColor = (status: keyof typeof ChamadoStatus) => {
  switch (status) {
    case "pending":
      return "yellow.300"

    case "in_progress":
      return "blue.400"

    case "not_solved":
      return "gray.400"

    case "solved":
      return "green.400"

    case "outsourced":
      return "purple.300"

    default:
      return "red"
  }
}

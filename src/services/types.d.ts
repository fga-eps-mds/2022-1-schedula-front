type Service = "usuarios" | "chamados" | "localidades"

type ApiResponse<Data> = { data: Data; error: null | string; message: string }

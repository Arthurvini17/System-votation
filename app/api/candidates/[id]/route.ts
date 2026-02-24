import { candidateController } from "@/controllers/candidateController";

// GET - buscar candidato por ID
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const { id } = params;
  return candidateController.getById(Number(id));
}

// DELETE - deletar candidato por ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const { id } = params;
  return candidateController.delete(Number(id));
}

// PUT - atualizar candidato por ID
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const { id } = params;
  return candidateController.update(Number(id), req);
}

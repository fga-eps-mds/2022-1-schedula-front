import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/page-header';

export function RegistrarChamado() {
  const navigate = useNavigate();

  // const onSubmit = useCallback(async (data: ChamadoFormValues) => {
  //   console.log('data', data);

  //   const newData: ChamadoFormValues = { ...data, problems: [] };

  //   // For each entry in the problem_id array, create a new object with only one problem_id.
  //   // NOTE: This is a workaround for the API not accepting multiple problem_id in the same problem object.
  //   data.problems.forEach((problem) => {
  //     if (Array.isArray(problem.problem_id)) {
  //       problem.problem_id.forEach((problem_id) => {
  //         // Create a new object with only one problem_id
  //         newData.problems.push({ ...problem, problem_id: [problem_id] });
  //       });
  //     } else newData.problems.push(problem);
  //   });

  //   const payload = formValuesToPayload(newData);
  //   console.log('payload', payload);

  //   const response = await request<Chamado>(createChamado(payload));

  //   if (response.type === 'error') {
  //     toast.error(response.error.message);

  //     return Promise.reject(response.error.message);
  //   }

  //   toast.success(response.value.message);
  // }, []);

  return (
    <>
      <PageHeader title="Novo Chamado">
        <Button variant="primary" onClick={() => navigate('/chamados')}>
          Ver Chamados
        </Button>
      </PageHeader>

      <p>Em progresso! Será entregue nas próximas interações..</p>

      {/* <ChamadoForm onSubmit={onSubmit} /> */}
    </>
  );
}

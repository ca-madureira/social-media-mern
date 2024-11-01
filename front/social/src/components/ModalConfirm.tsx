import React from 'react';

interface ModalConfirmProps {
  deleteUser: () => void;
  setOpenModalConfirm: (value: boolean) => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  deleteUser,
  setOpenModalConfirm,
}) => {
  const handleConfirm = async () => {
    deleteUser();
    setOpenModalConfirm(false);
  };

  const handleNotConfirm = () => {
    setOpenModalConfirm(false);
  };

  return (
    <dialog
      open
      className="flex items-center justify-center fixed bg-purple-300 bg-opacity-65 z-40 w-screen h-screen top-0"
    >
      <article className="border w-[650px] p-4 rounded-md bg-white relative shadow-purple-600 shadow-md">
        <header>
          <h2 className="text-lg mb-4">Confirmação</h2>
        </header>
        <p className="mb-4">Tem certeza que deseja excluir sua conta?</p>
        <footer className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={handleConfirm}
          >
            Sim
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-md"
            onClick={handleNotConfirm}
          >
            Não
          </button>
        </footer>
      </article>
    </dialog>
  );
};

export default ModalConfirm;

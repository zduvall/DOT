// import component
import NewUrl from './NewUrl';

// import context
import { Modal } from '../../../context/Modal';

export default function ModalNewUrl({
  showModal,
  setShowModal,
  client,
  newUrl,
  test,
}) {
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewUrl newUrl={newUrl} client={client} test={test} />
        </Modal>
      )}
    </>
  );
}
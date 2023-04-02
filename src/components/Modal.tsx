import { Modal } from '@mantine/core';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  opened: boolean;
  close: () => void;
}

// const useStyle = createStyles((theme) => ({
//   ".mantine-Modal-title": {
//     fontWeight: "bold"
//   }
// }));
const ModalView = ({ children, opened, close, title }: ModalProps) => {
  // const { classes } = useStyle();
  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        {children}
      </Modal>
    </>
  );
}
export default ModalView
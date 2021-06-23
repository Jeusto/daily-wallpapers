import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
} from '@chakra-ui/react';

export default function ModalWallpaper({ isOpen, onClose, title, image }) {
  return (
    <Modal
      scrollBehavior={'inside'}
      isOpen={isOpen}
      onClose={onClose}
      size={'full'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" paddingRight="3rem">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image margin="auto" maxH="89vh" src={image} alt="" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

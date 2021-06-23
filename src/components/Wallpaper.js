import React from 'react';
import { FiCopy, FiDownload, FiMaximize } from 'react-icons/fi';
import { IconButton, Box, Grid, Image } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  AspectRatio,
} from '@chakra-ui/react';

export default function Wallpaper({
  onMouseEnter,
  onMouseLeave,
  display,
  title,
  score,
  image,
  size,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Box m="2rem" w="40rem">
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

      <AspectRatio ratio={16 / 9}>
        <Box
          pos="relative"
          w="100%"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          overflow="hidden"
          borderRadius="0.75rem"
          boxShadow="lg"
        >
          <Image src={image} alt="" />
          <Grid pos="absolute" right="1rem" top="1rem">
            {' '}
            <IconButton
              onClick={onOpen}
              borderRadius="0.25rem"
              aria-label="Download wallpaper"
              icon={<FiMaximize></FiMaximize>}
            />
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(image);
                toast({
                  title: `Copied image link`,
                  status: 'info',
                  duration: 1500,
                  isClosable: true,
                });
              }}
              mt="0.5rem"
              borderRadius="0.25rem"
              aria-label="Copy wallpaper image link"
              icon={<FiCopy></FiCopy>}
            />
            <IconButton
              onClick={() => {
                toast({
                  title: `Downloading image...`,
                  status: 'info',
                  duration: 1500,
                  isClosable: true,
                });
              }}
              mt="0.5rem"
              borderRadius="0.25rem"
              aria-label="Open wallpaper in fullscreen"
              icon={<FiDownload></FiDownload>}
            />
            <a href="https://i.redd.it/6mz589jjgr671.png" download>
              Download test
            </a>
          </Grid>
        </Box>
      </AspectRatio>
    </Box>
  );
}

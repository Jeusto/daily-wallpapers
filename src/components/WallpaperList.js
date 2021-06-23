import { FiCopy, FiMaximize, FiExternalLink } from 'react-icons/fi';
import { IconButton, Box, Grid, Image } from '@chakra-ui/react';
import { useToast, useDisclosure, AspectRatio, Link } from '@chakra-ui/react';
import ModalWallpaper from './ModalWallpaper';

export default function Wallpaper({ title, score, image, size }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Box m="2rem" w="40rem">
      <ModalWallpaper
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        image={image}
      ></ModalWallpaper>
      <AspectRatio ratio={16 / 9}>
        <Box
          pos="relative"
          w="100%"
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
            <Link href={image} isExternal>
              <IconButton
                mt="0.5rem"
                borderRadius="0.25rem"
                aria-label="Open wallpaper in fullscreen"
                icon={<FiExternalLink></FiExternalLink>}
              />
            </Link>
          </Grid>
        </Box>
      </AspectRatio>
    </Box>
  );
}

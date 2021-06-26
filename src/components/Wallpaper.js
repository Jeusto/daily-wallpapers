import { FiCopy, FiMaximize, FiExternalLink } from 'react-icons/fi';
import {
  useColorMode,
  useToast,
  useDisclosure,
  IconButton,
  Box,
  Grid,
  Image,
  Tag,
  AspectRatio,
  Link,
} from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';
import ModalWallpaper from './ModalWallpaper';
import './wallpaper.css';

export default function Wallpaper({ title, image, width, height }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode } = useColorMode();

  return (
    <Fade triggerOnce>
      <Box className="wallpaper" m="2rem" w={['18rem', '25rem', '40rem']}>
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
            <Tag
              bg={
                colorMode === 'dark'
                  ? 'rgba(40, 44, 52, 0.3)'
                  : 'rgba(171, 178, 191, 0.6)'
              }
              color={colorMode === 'dark' ? '#dbdbdb' : 'black'}
              pos="absolute"
              left="1rem"
              top="1rem"
            >{`${width} x ${height}`}</Tag>
            <Grid pos="absolute" right="1rem" top="1rem">
              <IconButton
                bg={
                  colorMode === 'dark'
                    ? 'rgba(40, 44, 52, 0.3)'
                    : 'rgba(171, 178, 191, 0.6)'
                }
                color={colorMode === 'dark' ? '#dbdbdb' : 'black'}
                onClick={onOpen}
                borderRadius="0.5rem"
                aria-label="Download wallpaper"
                icon={<FiMaximize></FiMaximize>}
              />
              <IconButton
                bg={
                  colorMode === 'dark'
                    ? 'rgba(40, 44, 52, 0.3)'
                    : 'rgba(171, 178, 191, 0.6)'
                }
                color={colorMode === 'dark' ? '#dbdbdb' : 'black'}
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
                borderRadius="0.5rem"
                aria-label="Copy wallpaper image link"
                icon={<FiCopy></FiCopy>}
              />
              <Link href={image} isExternal>
                <IconButton
                  bg={
                    colorMode === 'dark'
                      ? 'rgba(40, 44, 52, 0.3)'
                      : 'rgba(171, 178, 191, 0.6)'
                  }
                  color={colorMode === 'dark' ? '#dbdbdb' : 'black'}
                  mt="0.5rem"
                  borderRadius="0.5rem"
                  aria-label="Open wallpaper in fullscreen"
                  icon={<FiExternalLink></FiExternalLink>}
                />
              </Link>
            </Grid>
          </Box>
        </AspectRatio>
      </Box>
    </Fade>
  );
}

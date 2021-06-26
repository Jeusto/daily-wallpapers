import { React } from 'react';
import { ThemeSwitch } from './components/ThemeSwitch';
import { ChakraProvider, Flex, Text, Image } from '@chakra-ui/react';
import WallpaperList from './components/WallpaperList';
import theme from './theme';
import logo from './logo.svg';

export default function App() {
  return (
    <ChakraProvider width="1rem" theme={theme}>
      <ThemeSwitch
        position="absolute"
        right="2rem"
        top="1rem"
        borderRadius="0.5rem"
      />
      <Flex pt="2rem" justifyContent="center" alignItems="center">
        <Image src={logo} width="3rem"></Image>
        <Text
          marginLeft="1rem"
          bgGradient="linear(to-r, #3dc5db,  #50E6FF)"
          bgClip="text"
          fontSize={{ base: '1.4rem', md: '2rem' }}
          fontWeight="700"
        >
          Daily wallpapers
        </Text>
      </Flex>
      <WallpaperList></WallpaperList>
    </ChakraProvider>
  );
}

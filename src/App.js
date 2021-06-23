import { React } from 'react';
import { ThemeSwitch } from './components/ThemeSwitch';
import { ChakraProvider, Flex, Text, Image } from '@chakra-ui/react';
import WallpaperList from './components/WallpaperList';
import theme from './theme';
import logo from './logo.svg';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeSwitch
        position="absolute"
        right="5"
        top="5"
        borderRadius="0.5rem"
      />
      <Flex pt="2rem" justifyContent="center" alignItems="center">
        <Image src={logo} width="3rem"></Image>
        <Text
          marginLeft="1rem"
          bgGradient="linear(to-r, #0F8DDC, #50E6FF)"
          bgClip="text"
          fontSize="2rem"
          fontWeight="700"
        >
          Daily wallpapers
        </Text>
      </Flex>
      <WallpaperList></WallpaperList>
    </ChakraProvider>
  );
}

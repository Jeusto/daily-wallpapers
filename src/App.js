import { React, useState, useEffect } from 'react';
import { ThemeSwitch } from './components/ThemeSwitch';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import WallpaperList from './components/WallpaperList';
import theme from './theme';

export default function App() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loadMore, setLoadMore] = useState(
    'https://www.reddit.com/r/wallpaper/top/.json?t=day'
  );

  // When dom loads
  useEffect(() => {
    const getWallpapers = async () => {
      const wallpapersFromApi = await fetchWallpapers();

      wallpapersFromApi.data.children.forEach((el, i) => {
        let currentWallpaper = {
          id: el.data.id,
          title: el.data.title,
          score: el.data.score,
          image: el.data.url,
          width: `temp`,
          height: `temp2`,
        };
        setWallpapers(currentList => [...currentList, currentWallpaper]);
      });
    };
    getWallpapers();
  }, []);

  // Fetch wallpapers from api
  const fetchWallpapers = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    return data;
  };

  const [displayButtons, setDisplayButtons] = useState('block');
  const showButtons = e => {
    e.preventDefault();
    setDisplayButtons('block');
  };

  const hideButtons = e => {
    e.preventDefault();
    setDisplayButtons('none');
  };

  return (
    <ChakraProvider theme={theme}>
      <ThemeSwitch
        position="absolute"
        right="5"
        top="5"
        borderRadius="0.5rem"
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        pt="3rem"
      >
        {' '}
        {wallpapers.map(el => (
          <WallpaperList
            onMouseEnter={e => showButtons(e)}
            onMouseLeave={e => hideButtons(e)}
            display={displayButtons}
            key={el.id}
            title={el.title}
            score={el.score}
            image={el.image}
            width={el.width}
            height={el.height}
          ></WallpaperList>
        ))}{' '}
      </Flex>
    </ChakraProvider>
  );
}

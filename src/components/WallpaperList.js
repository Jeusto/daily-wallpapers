import { React, useEffect, useState } from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import Wallpaper from './Wallpaper';

export default function WallpaperList() {
  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);

  // When dom loads
  useEffect(() => {
    const getWallpapers = async () => {
      const wallpapersFromApi = await fetchWallpapers(
        'https://www.reddit.com/r/wallpaper/top/.json?t=day'
      );

      wallpapersFromApi.data.children.forEach((el, i) => {
        if (!el.data.is_gallery) {
          let currentWallpaper = {
            id: el.data.created,
            title: el.data.title,
            score: el.data.score,
            image: el.data.url,
            width: el.data.preview.images[0].source.width,
            height: el.data.preview.images[0].source.height,
          };
          setWallpapers(currentList => [...currentList, currentWallpaper]);
        }
      });

      const wallpapersFromApi2 = await fetchWallpapers(
        'https://www.reddit.com/r/wallpapers/top/.json?t=day'
      );

      wallpapersFromApi2.data.children.forEach((el, i) => {
        if (!el.data.is_gallery) {
          let currentWallpaper = {
            id: el.data.created,
            title: el.data.title,
            score: el.data.score,
            image: el.data.url,
            width: el.data.preview.images[0].source.width,
            height: el.data.preview.images[0].source.height,
          };
          setWallpapers(currentList => [...currentList, currentWallpaper]);
        }
      });
    };

    setLoading(true);
    getWallpapers();
  }, []);

  // Fetch wallpapers from api
  const fetchWallpapers = async url => {
    const res = await fetch(url);
    const data = await res.json();
    setLoading(false);

    return data;
  };

  return (
    <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        wallpapers.map(el => (
          <Wallpaper
            key={el.id}
            title={el.title}
            image={el.image}
            width={el.width}
            height={el.height}
          ></Wallpaper>
        ))
      )}
      {!loading ? (
        <Text mb="2rem" width="100%" textAlign="center" fontSize="2xl">
          Come back tomorrow for more :)
        </Text>
      ) : (
        ''
      )}
    </Flex>
  );
}

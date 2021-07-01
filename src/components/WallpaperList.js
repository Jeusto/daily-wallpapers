import { React, useEffect, useState } from 'react';
import {
  Flex,
  Spinner,
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import Wallpaper from './Wallpaper';

export default function WallpaperList() {
  const [loading, setLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);
  const [category, setCategory] = useState('top/.json?t=day');

  // When category changes, load new wallpapers
  useEffect(() => {
    displayWallpapers();
  }, [category]);

  // Change category
  function changeCategory(arg) {
    setCategory(arg);
  }

  // Display wallpapers
  function displayWallpapers() {
    // Reset wallpapers list
    setWallpapers([]);

    // Get wallpapers from first subreddit
    const getWallpapers = async () => {
      const wallpapersFromApi = await fetchWallpapers(
        `https://www.reddit.com/r/wallpaper/${category}`
      );
      // Add to list
      wallpapersFromApi.data.children.forEach(el => {
        if (
          el.data.is_gallery ||
          el.data.crosspost_parent_list !== undefined ||
          el.data.domain === 'imgur.com'
        ) {
          return;
        } else {
          let currentWallpaper = {
            key: Math.floor(Math.random() * 1000000),
            title: el.data.title,
            image: el.data.url,
            width: el.data.preview.images[0].source.width,
            height: el.data.preview.images[0].source.height,
          };
          setWallpapers(currentList => [...currentList, currentWallpaper]);
        }
      });

      // Get wallpapers from second subreddit
      const wallpapersFromApi2 = await fetchWallpapers(
        `https://www.reddit.com/r/wallpapers/${category}`
      );
      // Add to list
      wallpapersFromApi2.data.children.forEach(el => {
        if (
          el.data.is_gallery ||
          el.data.crosspost_parent_list !== undefined ||
          el.data.preview === undefined
        ) {
          return;
        } else {
          let currentWallpaper = {
            key: Math.floor(Math.random() * 1000000),
            title: el.data.title,
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
  }

  // Fetch wallpapers from api
  const fetchWallpapers = async url => {
    const res = await fetch(url);
    const data = await res.json();

    setLoading(false);
    return data;
  };

  return (
    <>
      <Flex
        w={['100%', '25rem']}
        margin="auto"
        marginTop="1rem"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon marginTop="0.3rem" />}
          >
            Top wallpapers
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => changeCategory('.json?t=hour')}>
              Hour
            </MenuItem>
            <MenuItem onClick={() => changeCategory('top/.json?t=day')}>
              Today
            </MenuItem>
            <MenuItem onClick={() => changeCategory('top/.json?t=week')}>
              This week
            </MenuItem>
            <MenuItem onClick={() => changeCategory('top/.json?t=month')}>
              This month
            </MenuItem>
            <MenuItem onClick={() => changeCategory('top/.json?t=year')}>
              This year
            </MenuItem>
            <MenuItem onClick={() => changeCategory('top/.json?t=all')}>
              Top of all time
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            marginTop={['1rem', '0rem']}
            as={Button}
            rightIcon={<ChevronDownIcon marginTop="0.3rem" />}
          >
            Other categories
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => changeCategory('hot.json')}>Hot</MenuItem>
            <MenuItem onClick={() => changeCategory('new.json')}>New</MenuItem>
            <MenuItem onClick={() => changeCategory('rising.json')}>
              Rising
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        {loading ? (
          <Box width="100vw" height="100vh" display="grid" placeItems="center">
            <Spinner size="xl" />
          </Box>
        ) : (
          wallpapers.map(el => (
            <Wallpaper
              key={el.key}
              title={el.title}
              image={el.image}
              width={el.width}
              height={el.height}
            ></Wallpaper>
          ))
        )}
      </Flex>
      <Flex>
        {loading ? (
          ''
        ) : (
          <IconButton
            size="md"
            fontSize="2xl"
            position="fixed"
            right="5"
            bottom="5"
            margin="auto"
            borderRadius="0.5rem"
            aria-label={`Scroll to top`}
            variant="ghost"
            icon={<ArrowUpIcon />}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          ></IconButton>
        )}
      </Flex>
    </>
  );
}

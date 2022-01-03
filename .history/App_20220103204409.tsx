import React, {FC, useState} from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';

// https://www.creative-flyers.com

interface Poster {
  title: string;
  location: string;
  date: string;
  poster: string;
}

const DATA: Array<Poster> = [
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = Dimensions.get('screen').width * 0.8;
const ITEM_HEIGHT = Dimensions.get('screen').width * 1.5;

const OverflowItems: FC<{data: Array<Poster>}> = ({data}) => {
  return (
    <View style={styles.overflowContainer}>
      <Animated.View>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{marginRight: 5}}
                  />
                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const App = () => {
  const [data, setData] = useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <SafeAreaView style={styles.container}>
      <OverflowItems data={DATA} />
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        horizontal
        inverted
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          padding: SPACING * 2,
        }}
        scrollEnabled={false}
        removeClippedSubviews={false}
        CellRendererComponent={({item, index, childern, style, ...props}) => {
          const newStyle = [style, {zIndex: data.length - index}];
          return <View style={newStyle} key={index} {...props} />;
        }}
        renderItem={({item, index}) => {
          const inputRange = [index - 1, index, index + 1];
          const translateX = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [50, 0, -100],
          });

          const scale = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0.8, 1, -1.3],
          });

          return (
            <Animated.View
              style={{
                position: 'absolute',
                left: -ITEM_WIDTH / 2,
                transform: [{translateX}, {scale}],
              }}>
              <Image
                source={{uri: item.poster}}
                style={{width: ITEM_WIDTH, height: ITEM_HEIGHT}}
              />
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});

export default App;

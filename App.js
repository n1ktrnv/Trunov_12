import {StyleSheet, Text, View, Image, Platform, ScrollView, Button} from 'react-native';
import { getSingleGif } from './GifManagement';
import React from 'react';

const gifIds = [
    'HRxm0ukjaAauCGLDtC',
    'cZ7rmKfFYOvYI',
    '11BCDu2iUc8Nvhryl7',
    'YsTs5ltWtEhnq',
    'piQOnU6uZKjnOCFNxF'
];

function UnsupportedPlatform() {
  return (
      <View style={styles.container}>
        <Text style={styles.header}>
          FileSystem doesn&#39;t support web. Run this on Android or iOS
        </Text>
      </View>
  );
}

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gifUris: null};
    }

    async componentDidMount() {
        await this.loadImages()
    }

    async loadImages() {
        const gifUris = [];
        for (const id of gifIds) {
            gifUris.push(await getSingleGif(id))
        }
        this.setState({ gifUris: gifUris})
    }

    render() {
        let content = <Text>Loading...</Text>
        if (this.state.gifUris != null) {
            content = this.state.gifUris.map((uri, index) => (
                <Image key={index} style={{ width:'100%', height: 400 }} source={{ uri: uri }} />
            ))
        }

        return (
            <View style={styles.container}>
                <Text style={styles.header}>You have {this.state.gifUris == null ? 0 :
                    this.state.gifUris.length} GIF on your device</Text>
                <ScrollView style={{width: '100%'}}>
                    { content }
                </ScrollView>
            </View>
        );
    }
}

export default function App() {
    return Platform.OS === 'android' || Platform.OS === 'ios' ?
        <MainApp /> : <UnsupportedPlatform />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
     fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold'
  }
});

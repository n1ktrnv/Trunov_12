import * as FileSystem from 'expo-file-system';

const gifDir = FileSystem.cacheDirectory + 'giphy/';
const gifUrl = (id) => `https://media1.giphy.com/media/${id}/200.gif`;
const gifFileUri = (id) => gifDir + `gif_${id}_200.gif`;

async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(gifDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
    }
}

export async function getSingleGif(id) {
    await ensureDirExists();
    const fileUri = gifFileUri(id);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
        await FileSystem.downloadAsync(gifUrl(id), fileUri);
    }
    return fileUri;
}